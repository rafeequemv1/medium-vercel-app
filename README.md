# Vercel Custom Domain Manager

A modern, one-page SaaS application that allows you to programmatically add custom domains to your Vercel project using the Vercel REST API.

## 🚀 Features

- **Premium UI**: Modern glassmorphism design with responsive layout.
- **Vercel Integration**: Direct communication with Vercel API to provision domains.
- **DNS Guidance**: In-app instructions for users to configure CNAME and A records.
- **Next.js 14**: Built with the latest App Router and TypeScript.

## 🛠️ Setup

1. **Vercel API Token**: Generate a token at [vercel.com/account/tokens](https://vercel.com/account/tokens).
2. **Project ID**: Find your Project ID in the Vercel Dashboard under **Project Settings -> General**.
3. **Environment Variables**: Create or edit `.env.local` and add your credentials:
   ```env
   VERCEL_API_TOKEN=your_token_here
   VERCEL_PROJECT_ID=your_project_id_here
   VERCEL_TEAM_ID= # Optional: Only if your project is in a Team
   ```

## 📦 Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 How it works

1. **User Input**: User enters their custom domain (e.g., `app.userdomain.com`).
2. **API Call**: The app calls the internal `/api/add-domain` route.
3. **Vercel Provisioning**: The backend sends a POST request to `api.vercel.com/v10/projects/.../domains`.
4. **DNS Setup**: The user is instructed to point their DNS to Vercel's edge network.
