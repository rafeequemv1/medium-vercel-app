'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface DNSRecord {
    type: string;
    name: string;
    value: string;
    ttl?: string;
}

interface DNSTableProps {
    records: DNSRecord[];
}

export function DNSTable({ records }: DNSTableProps) {
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedValue(text);
        setTimeout(() => setCopiedValue(null), 2000);
    };

    return (
        <div className="dns-table-container">
            <table className="dns-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, i) => (
                        <tr key={i}>
                            <td>
                                <span className="record-type-badge">{record.type}</span>
                            </td>
                            <td>
                                <div className="copyable-cell">
                                    <code>{record.name}</code>
                                    <button onClick={() => copyToClipboard(record.name)} className="copy-btn">
                                        {copiedValue === record.name ? <Check size={12} /> : <Copy size={12} />}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="copyable-cell">
                                    <code>{record.value}</code>
                                    <button onClick={() => copyToClipboard(record.value)} className="copy-btn">
                                        {copiedValue === record.value ? <Check size={12} /> : <Copy size={12} />}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
        .dns-table-container {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 1rem;
        }
        .dns-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          text-align: left;
        }
        .dns-table th {
          background: rgba(255, 255, 255, 0.03);
          padding: 0.75rem 1rem;
          color: #888;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .dns-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #eee;
        }
        .record-type-badge {
          background: rgba(0, 112, 243, 0.1);
          color: #0070f3;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.7rem;
        }
        .copyable-cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .copyable-cell code {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          color: #fff;
        }
        .copy-btn {
          background: transparent;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }
        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
      `}</style>
        </div>
    );
}
