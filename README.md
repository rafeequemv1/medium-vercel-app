# 🌐 BioDomain: The Multi-tenant Bio Link Builder

A premium SaaS platform built with Next.js 14 and Vercel API that allows users to create professional bio-link pages and host them on their own **custom domains**.

## ✨ Features
- **Split-Screen Editor**: Edit your profile and see changes in real-time on a mobile mockup.
- **Custom Domain Provisioning**: Directly connects to the Vercel API to add `CNAME` or `A` records for your users.
- **Multi-tenant Routing**: Uses Next.js Middleware to serve unique bio pages based on the request hostname.
- **Modern Aesthetics**: Dark mode, glassmorphism, and smooth animations.

## 🛠️ How it Works
1. **User Dashboard**: Users create their profile (Name, Bio, Links).
2. **Domain Connection**: Users enter their custom domain.
3. **Vercel API**: The app uses your `VERCEL_API_TOKEN` to register the domain to your deployment.
4. **Middleware**: When someone visits the custom domain, the app detects the hostname and displays that user's specific bio page.

## 🚀 Setup
1. **Clone & Install**: `npm install`
2. **Environment Variables**: Add these to `.env.local` and your Vercel Dashboard:
   ```env
   VERCEL_API_TOKEN=...
   VERCEL_PROJECT_ID=...
   NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000 # Your main app domain
   ```
3. **Run**: `npm run dev`

## 📖 Deployment Tips
To make subdomains work locally, you can use a tool like **Localtunnel** or **Ngrok**, or modify your `hosts` file to point `user.localhost` to `127.0.0.1`.
