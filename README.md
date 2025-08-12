## Naphtali Ventures — Landing Page

Modern, responsive landing page for a professional electrical services company in Ghana.

### [Live Demo](https://naph-ventures.vercel.app/)

### Highlights
- **Lead capture**: Secure contact form sends data to Google Sheets and triggers EmailJS notifications/auto-replies.
- **Spam protection**: Google reCAPTCHA integration.
- **Fast and responsive**: Next.js Image optimization, mobile-first layout, accessible components.
- **SEO-ready**: Descriptive metadata, keyword targeting, clean semantics.

### Tech Stack
- **Next.js 14 (App Router)**, **React 18**, **TypeScript**
- **Tailwind CSS**, **Radix UI**, **shadcn/ui**, **lucide-react**
- **EmailJS**, **Google Apps Script (Web App)** for Sheets

### What I did
- Designed and built the UI with Tailwind and shadcn/ui components
- Implemented form validation, reCAPTCHA, Google Sheets submission, and EmailJS automation
- Tuned accessibility, SEO, and image performance
- Deployed and monitored on Vercel

### Run locally
Prereqs: Node.js 18+

1) Create `.env.local` with your keys:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_script_web_app_url
```

2) Install and start:
```bash
npm install
npm run dev
```

—

Questions or feedback? Connect on [LinkedIn](https://linkedin.com/in/abraham-yarba) or see more on [GitHub](https://github.com/aby228).
