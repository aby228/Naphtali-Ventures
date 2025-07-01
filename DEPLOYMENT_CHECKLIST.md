# 🚀 NAPHTALI VENTURES - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 📦 Dependencies
- [x] All required packages listed in package.json
- [x] react-google-recaptcha installed
- [x] @emailjs/browser installed
- [x] All shadcn/ui components available

### 🔐 Security & API Keys
- [ ] **reCAPTCHA Site Key**: Replace test key with production key
  - Current: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` (TEST KEY)
  - Update in: `app/page.tsx` line with `sitekey=`
  - Get from: [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)

- [ ] **EmailJS Credentials**: Update with real credentials
  - Service ID: Currently `service_6tk2y4g`
  - Template ID: Currently `template_ihqu49t`
  - Public Key: Currently `x0EUGH-BwfsY3CURC`
  - Get from: [EmailJS Dashboard](https://dashboard.emailjs.com/admin)

- [ ] **Google Sheets Script**: Update with deployed script URL
  - Current: `AKfycbyDhQ0bCgvlng-5_rIMKKcZD9zEmhppAEHkO69JpHZuoz1CNg_1YEGh-cm0cciGtG52-g/exec`
  - Deploy script from: `scripts/setup-google-sheets.js`

### 🖼️ Assets & Images
- [x] All images present in public/images/
- [x] Logo files properly referenced
- [x] Background images optimized
- [x] All image paths correct

### 🔗 External Links
- [x] Google Form link working
- [x] Phone number links formatted correctly
- [x] Email links working
- [x] Social media links (placeholder - update as needed)

### 📱 Responsive Design
- [x] Mobile responsive
- [x] Tablet responsive
- [x] Desktop responsive
- [x] All breakpoints tested

### 🧪 Functionality Testing
- [x] Form validation working
- [x] reCAPTCHA integration ready
- [x] Error handling implemented
- [x] Success messages working
- [x] Emergency modal working

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically
4. Update API keys in production

### Option 2: Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Update API keys in production

### Option 3: Traditional Hosting
1. Build the project: `npm run build`
2. Upload build files to hosting provider
3. Configure server for Next.js
4. Update API keys in production

## ⚠️ Important Notes

### Current Status
- **Form**: ✅ Fully functional with validation
- **reCAPTCHA**: ⚠️ Using test keys (works but shows test badge)
- **EmailJS**: ⚠️ Using placeholder credentials
- **Google Sheets**: ⚠️ Using placeholder script URL
- **Images**: ✅ All optimized and ready
- **Responsive**: ✅ Fully responsive design

### What Works Now
- Complete form validation
- Professional design and animations
- Mobile-responsive layout
- Emergency contact modal
- All navigation and links
- Image optimization

### What Needs Production Setup
- Real reCAPTCHA keys for spam protection
- EmailJS credentials for email notifications
- Google Sheets script for data storage

## 🔧 Post-Deployment Tasks

1. **Test the live site thoroughly**
2. **Submit a test form to verify all integrations**
3. **Check Google Analytics (if added)**
4. **Monitor form submissions**
5. **Set up email notifications from Google Sheets**

## 📞 Support Contacts

- **Technical Issues**: Check console logs
- **EmailJS Issues**: [EmailJS Documentation](https://www.emailjs.com/docs/)
- **reCAPTCHA Issues**: [Google reCAPTCHA Help](https://developers.google.com/recaptcha)
- **Google Sheets Issues**: [Apps Script Documentation](https://developers.google.com/apps-script)

---

**✅ The landing page is ready for deployment!**

The code is production-ready with proper error handling, fallbacks, and professional design. Update the API keys after deployment for full functionality.
