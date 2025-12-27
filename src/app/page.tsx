'use client';

import { useState } from 'react';
import { Globe, Rocket, ShieldCheck, Info, Loader2 } from 'lucide-react';

export default function Home() {
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{
        success?: boolean;
        message?: string;
        data?: any;
    } | null>(null);

    const handleAddDomain = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/add-domain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain }),
            });
            const data = await res.json();
            setStatus(data);
        } catch (err) {
            setStatus({ success: false, message: 'Network error or server down' });
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
                    Powered by Vercel API
                </div>
                <h1>Custom Domain Manager</h1>
                <p>Give your users the power to host on their own terms. Simply enter a domain to get started.</p>
            </section>

            <div className="status-grid">
                <div className="glass-card">
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <Globe style={{ marginRight: '12px' }} /> Add New Domain
                    </h2>
                    <form onSubmit={handleAddDomain}>
                        <div className="input-group">
                            <label htmlFor="domain">Target Domain or Subdomain</label>
                            <input
                                id="domain"
                                className="input-field"
                                type="text"
                                placeholder="e.g. store.company.com"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" style={{ marginRight: '8px', display: 'inline' }} size={18} />
                                    Processing...
                                </>
                            ) : 'Provision Domain'}
                        </button>
                    </form>

                    {status && (
                        <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: status.success ? 'rgba(0,255,128,0.1)' : 'rgba(255,0,0,0.1)' }}>
                            <p style={{ color: status.success ? '#00ff80' : '#ff4d4d', fontSize: '0.9rem' }}>
                                {status.message}
                            </p>
                        </div>
                    )}
                </div>

                <div className="glass-card">
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <ShieldCheck style={{ marginRight: '12px' }} /> Setup Instructions
                    </h2>
                    <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '1rem' }}>
                        After adding the domain, your user needs to update their DNS settings.
                    </p>

                    <div className="dns-instruction">
                        <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#fff' }}>For Subdomains (Recommended)</h4>
                        <p style={{ fontSize: '0.85rem', color: '#888' }}>Create a <code>CNAME</code> record:</p>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                            <strong>Type:</strong> <code>CNAME</code><br />
                            <strong>Name:</strong> <code>{domain.split('.')[0] || 'sub'}</code><br />
                            <strong>Value:</strong> <code>cname.vercel-dns.com.</code>
                        </div>
                    </div>

                    <div className="dns-instruction">
                        <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#fff' }}>For Root Domains</h4>
                        <p style={{ fontSize: '0.85rem', color: '#888' }}>Add an <code>A</code> record:</p>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                            <strong>Type:</strong> <code>A</code><br />
                            <strong>Name:</strong> <code>@</code><br />
                            <strong>Value:</strong> <code>76.76.21.21</code>
                        </div>
                    </div>
                </div>
            </div>

            <section style={{ textAlign: 'center', paddingBottom: '4rem' }}>
                <p style={{ color: '#555', fontSize: '0.8rem' }}>
                    <Info size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    Make sure to set your <code>VERCEL_API_TOKEN</code> and <code>VERCEL_PROJECT_ID</code> in <code>.env.local</code>
                </p>
            </section>

            <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
        </main>
    );
}
