# 🏢 Naphtali Ventures - Professional Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-1.0-161618?style=for-the-badge)](https://www.radix-ui.com/)

> **A modern, responsive business landing page built with cutting-edge technologies and best practices**

## 🚀 Live Demo

**[View Live Site](https://naph-ventures.vercel.app/)** 

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎯 Project Overview](#-project-overview)
- [📱 Screenshots](#-screenshots)
- [⚡ Performance](#-performance)
- [🔧 Installation & Setup](#-installation--setup)
- [🚀 Deployment](#-deployment)
- [📊 Key Features Breakdown](#-key-features-breakdown)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Mode**: Theme switching with system preference detection
- **Smooth Animations**: CSS transitions and micro-interactions
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation

### 🔒 **Security & Validation**
- **Google reCAPTCHA v3**: Advanced bot protection
- **Form Validation**: Client-side validation with real-time feedback
- **EmailJS Integration**: Secure email handling without backend
- **Google Sheets Integration**: Automated lead capture and management

### 📱 **Performance Optimized**
- **Next.js 14**: App Router with server-side rendering
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for optimal bundle size
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

### 🛠️ **Developer Experience**
- **TypeScript**: Full type safety and better IDE support
- **ESLint & Prettier**: Code quality and formatting
- **Component Library**: Reusable UI components with Radix UI
- **Custom Hooks**: Modular and maintainable code structure

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 14** - React framework with App Router
- **React 18** - Latest React features and concurrent rendering
- **TypeScript 5** - Type-safe development

### **Styling & UI**
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations

### **Form Handling & Validation**
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **React Google reCAPTCHA** - Bot protection

### **Email & Data Management**
- **EmailJS** - Client-side email service
- **Google Apps Script** - Automated data processing
- **Google Sheets API** - Lead management system

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎯 Project Overview

This is a professional landing page for **Naphtali Ventures**, a business services company. The project demonstrates:

- **Full-Stack Capabilities**: Frontend development with backend integration
- **Modern Web Standards**: Latest React patterns and best practices
- **Business Logic**: Lead generation, form handling, and data management
- **Production Ready**: Security, performance, and accessibility considerations

### **Key Business Features**
- **Lead Capture System**: Automated form submission to Google Sheets
- **Email Automation**: Instant notifications and auto-replies
- **Service Showcase**: Dynamic service presentation
- **Contact Management**: Multiple contact methods and locations
- **Emergency Services**: 24/7 emergency contact system


## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for user experience
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: Sub-2 second initial load time

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Google account (for reCAPTCHA and Sheets)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# Google Apps Script
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_script_url
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📊 Key Features Breakdown

### 1. **Advanced Form Handling**
```typescript
// Real-time validation with TypeScript
const validateForm = (): FormErrors => {
  const errors: FormErrors = {}
  
  // Comprehensive validation logic
  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required"
  }
  
  return errors
}
```

### 2. **Security Implementation**
```typescript
// Dynamic reCAPTCHA loading
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => <LoadingComponent />
})
```

### 3. **Responsive Design**
```css
/* Mobile-first approach */
.container {
  @apply px-4 md:px-8 lg:px-16;
}
```

### 4. **Performance Optimization**
```typescript
// Dynamic imports for code splitting
const EmergencyModal = dynamic(() => import('./EmergencyModal'), {
  loading: () => <Skeleton />
})
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain accessibility standards
- Write meaningful commit messages
- Test on multiple devices and browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


*Connect with me: [LinkedIn](https://linkedin.com/in/abraham-yarba) | [GitHub](https://github.com/aby228)*
