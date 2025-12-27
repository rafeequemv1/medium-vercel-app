'use client';

import { useState, useEffect } from 'react';
import { Globe, Rocket, Plus, Trash2, ExternalLink, Loader2, Smartphone, Save } from 'lucide-react';

interface LinkItem {
    id: string;
    title: string;
    url: string;
}

export default function BioLinkEditor() {
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('Digital Creator & Designer');
    const [links, setLinks] = useState<LinkItem[]>([
        { id: '1', title: 'My Portfolio', url: 'https://portfolio.com' },
        { id: '2', title: 'Twitter', url: 'https://twitter.com/johndoe' }
    ]);
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

    // Sync with local storage
    useEffect(() => {
        const saved = localStorage.getItem('bio-data');
        if (saved) {
            const parsed = JSON.parse(saved);
            setName(parsed.name);
            setBio(parsed.bio);
            setLinks(parsed.links);
        }
    }, []);

    const saveToLocal = () => {
        localStorage.setItem('bio-data', JSON.stringify({ name, bio, links }));
        alert('Changes saved locally! Now connect a domain to publish.');
    };

    const addLink = () => {
        setLinks([...links, { id: Date.now().toString(), title: '', url: '' }]);
    };

    const updateLink = (id: string, field: keyof LinkItem, value: string) => {
        setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
    };

    const removeLink = (id: string) => {
        setLinks(links.filter(l => l.id !== id));
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/add-domain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain, bioData: { name, bio, links } }),
            });
            const data = await res.json();
            setStatus(data);
        } catch (err) {
            setStatus({ success: false, message: 'Network error or configuration missing.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="main-container">
            <div className="background-glow">
                <div className="glow-1"></div>
                <div className="glow-2"></div>
            </div>

            <section className="hero">
                <div className="badge badge-success">
                    <Rocket size={12} style={{ marginRight: '6px' }} />
                    Multi-tenant Bio Builder
                </div>
                <h1>Your Bio, Your Domain</h1>
                <p>Build your professional profile and host it on your own custom subdomain or domain.</p>
            </section>

            <div className="editor-layout">
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>Edit Your Profile</h2>
                        <button onClick={saveToLocal} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Save size={16} /> Save Local
                        </button>
                    </div>

                    <div className="input-group">
                        <label>Full Name</label>
                        <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Rivera" />
                    </div>

                    <div className="input-group">
                        <label>Short Bio</label>
                        <input className="input-field" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell the world what you do" />
                    </div>

                    <div style={{ marginTop: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem' }}>Links</h3>
                            <button onClick={addLink} className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Plus size={14} /> Add Link
                            </button>
                        </div>

                        {links.map((link) => (
                            <div key={link.id} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <input
                                        className="input-field"
                                        style={{ padding: '0.6rem' }}
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                        placeholder="Link Title"
                                    />
                                    <input
                                        className="input-field"
                                        style={{ padding: '0.6rem', fontSize: '0.8rem', color: '#888' }}
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                        placeholder="URL (https://...)"
                                    />
                                </div>
                                <button
                                    onClick={() => removeLink(link.id)}
                                    className="btn-outline"
                                    style={{ padding: '0.6rem', color: '#ff4d4d', borderColor: 'rgba(255,77,77,0.2)' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <hr style={{ margin: '3rem 0', borderColor: 'rgba(255,255,255,0.05)' }} />

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={18} /> Connect Domain
                    </h3>
                    <form onSubmit={handlePublish}>
                        <div className="input-group">
                            <label>Domain or Subdomain</label>
                            <input
                                className="input-field"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="e.g. bio.yourname.com"
                                required
                            />
                        </div>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Publish to Domain'}
                        </button>
                    </form>

                    {status && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '12px', background: status.success ? 'rgba(0,255,128,0.1)' : 'rgba(255,77,77,0.1)' }}>
                            <p style={{ color: status.success ? '#00ff80' : '#ff4d4d', fontSize: '0.9rem' }}>
                                {status.message}
                            </p>
                            {status.success && (
                                <div style={{ marginTop: '1rem', padding: '1rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.8rem' }}>
                                    <strong>DNS Step:</strong> Point <code>CNAME</code> to <code>cname.vercel-dns.com.</code>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="preview-pane">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', justifyContent: 'center', color: '#888' }}>
                        <Smartphone size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Preview</span>
                    </div>

                    <div className="bio-preview-container">
                        <div className="bio-avatar">{name.charAt(0)}</div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{name}</h2>
                        <p style={{ color: '#888', textAlign: 'center', fontSize: '0.95rem' }}>{bio}</p>

                        <div style={{ width: '100%', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {links.map((link) => (
                                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bio-link-card">
                                    {link.title || 'Untitled Link'}
                                    <ExternalLink size={12} style={{ marginLeft: '8px', opacity: 0.5 }} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
        </main>
    );
}
