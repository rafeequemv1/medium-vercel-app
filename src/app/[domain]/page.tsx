import { ExternalLink, Globe } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock data fetcher - In a real app, you'd fetch this from Supabase or Prisma
async function getBioData(domain: string) {
    // Simulating a database lookup
    // For the demo, we'll return a dynamic profile based on the domain name
    // To make it look "real", we can decode bits from the domain
    const name = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);

    return {
        name: name,
        bio: `Welcome to the official bio link for ${domain}`,
        links: [
            { id: '1', title: 'Visit Website', url: `https://${domain}` },
            { id: '2', title: 'Contact Me', url: '#' },
            { id: '3', title: 'Twitter / X', url: 'https://twitter.com' }
        ]
    };
}

export default async function PublicBioPage({ params }: { params: { domain: string } }) {
    const domain = params.domain;
    const data = await getBioData(domain);

    if (!data) return notFound();

    return (
        <main className="public-bio-wrapper">
            <div className="background-glow">
                <div className="glow-1"></div>
                <div className="glow-2"></div>
            </div>

            <div className="public-bio-content">
                <div className="bio-avatar">{data.name.charAt(0)}</div>
                <h1 className="bio-name">{data.name}</h1>
                <p className="bio-description">{data.bio}</p>

                <div className="bio-links-list">
                    {data.links.map((link) => (
                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bio-link-card">
                            {link.title}
                            <ExternalLink size={14} style={{ opacity: 0.5 }} />
                        </a>
                    ))}
                </div>

                <div className="footer-brand">
                    <Globe size={14} />
                    <span>Hosted on {domain}</span>
                </div>
            </div>

            <style jsx>{`
        .public-bio-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #000;
          color: #fff;
          padding: 2rem;
        }
        .public-bio-content {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
        }
        .bio-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(45deg, #7928ca, #ff0080);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(121, 40, 202, 0.4);
        }
        .bio-name {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .bio-description {
          color: #888;
          text-align: center;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        .bio-links-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-brand {
          margin-top: 4rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #444;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>
        </main>
    );
}
