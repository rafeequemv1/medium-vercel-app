import { NextResponse } from 'next/server';
import axios from 'axios';

const VERCEL_API = 'https://api.vercel.com';
const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

export async function POST(request: Request) {
    try {
        const { domain } = await request.json();

        if (!domain) {
            return NextResponse.json(
                { success: false, message: 'Domain is required' },
                { status: 400 }
            );
        }

        if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
            console.error('Missing VERCEL_API_TOKEN or VERCEL_PROJECT_ID');
            return NextResponse.json(
                { success: false, message: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Call Vercel API to add domain
        const response = await axios.post(
            `${VERCEL_API}/v10/projects/${VERCEL_PROJECT_ID}/domains${process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ''}`,
            { name: domain },
            {
                headers: {
                    Authorization: `Bearer ${VERCEL_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json({
            success: true,
            message: `Successfully connected ${domain}! Now point your DNS to Vercel.`,
            data: response.data,
        });
    } catch (err: any) {
        console.error('Vercel API Error:', err.response?.data || err.message);
        return NextResponse.json(
            {
                success: false,
                message: err.response?.data?.error?.message || 'Failed to add domain',
            },
            { status: err.response?.status || 400 }
        );
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
        return NextResponse.json({ success: false, message: 'Domain is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(
            `${VERCEL_API}/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}?teamId=${process.env.VERCEL_TEAM_ID || ''}`,
            {
                headers: {
                    Authorization: `Bearer ${VERCEL_TOKEN}`,
                },
            }
        );
        return NextResponse.json({ success: true, data: response.data });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.response?.data?.error?.message || 'Failed to check status' },
            { status: err.response?.status || 400 }
        );
    }
}
