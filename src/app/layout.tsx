import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Vercel Multi-tenant App",
    description: "Dynamically add custom domains to your Vercel projects",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
