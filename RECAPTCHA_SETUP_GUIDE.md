# 🔐 Google reCAPTCHA Setup Guide for NAPHTALI VENTURES

## 🚀 Quick Setup Steps

### Step 1: Get Your reCAPTCHA Keys
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "+" to create a new site
3. Fill in the details:
   - **Label**: NAPHTALI VENTURES Contact Form
   - **reCAPTCHA type**: reCAPTCHA v2 → "I'm not a robot" Checkbox
   - **Domains**: Add your website domains:
     - `localhost` (for testing)
     - `your-domain.com` (your actual website)
     - `your-domain.vercel.app` (if using Vercel)
4. Accept the terms and click "Submit"

### Step 2: Get Your Keys
After creating the site, you'll get:
- **Site Key** (public) - Used in your website code
- **Secret Key** (private) - Used for server-side verification

### Step 3: Update the Code
Replace the placeholder site key in the code:

**Current placeholder:**
\`\`\`javascript
sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
\`\`\`

**Replace with your actual site key:**
\`\`\`javascript
sitekey="YOUR_ACTUAL_SITE_KEY_HERE"
\`\`\`

### Step 4: Install the Package
Run this command in your project:
\`\`\`bash
npm install react-google-recaptcha
\`\`\`

### Step 5: Test the Integration
1. Update the site key in the code
2. Test the form on your website
3. You should see the "I'm not a robot" checkbox
4. Complete the verification and submit the form

## 🔧 Configuration Options

### Theme Options
\`\`\`javascript
theme="light"  // or "dark"
\`\`\`

### Size Options
\`\`\`javascript
size="normal"   // Standard size
size="compact"  // Smaller size
size="invisible" // Invisible reCAPTCHA (advanced)
\`\`\`

### Language Support
\`\`\`javascript
hl="en"  // English (default)
hl="fr"  // French
// Add more languages as needed
\`\`\`

## 🧪 Testing

### Test Keys (for development only)
Google provides test keys that always pass:
- **Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- **Secret Key**: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

⚠️ **Important**: Replace test keys with real keys before going live!

### What to Test
1. ✅ reCAPTCHA appears on the form
2. ✅ Form won't submit without completing reCAPTCHA
3. ✅ Error message shows if reCAPTCHA not completed
4. ✅ Form submits successfully after verification
5. ✅ reCAPTCHA resets after successful submission

## 🛡️ Security Benefits

### Spam Protection
- Blocks automated bot submissions
- Reduces fake form submissions
- Protects your email from spam

### User Experience
- Simple "I'm not a robot" checkbox
- Quick verification process
- Doesn't interfere with legitimate users

### Analytics
- View reCAPTCHA statistics in Google Admin Console
- Monitor blocked attempts
- Track verification success rates

## 🔍 Troubleshooting

### Common Issues

**reCAPTCHA not showing:**
- Check if site key is correct
- Verify domain is added to reCAPTCHA settings
- Check browser console for errors

**"Invalid site key" error:**
- Double-check the site key
- Ensure domain matches reCAPTCHA settings
- Try using test keys first

**Form still submits without reCAPTCHA:**
- Check validation logic
- Ensure reCAPTCHA state is properly managed
- Verify error handling

## 📊 Current Integration Features

✅ **Form Validation**: Won't submit without reCAPTCHA  
✅ **Error Handling**: Clear error messages  
✅ **Auto-Reset**: Clears after successful submission  
✅ **Expiration Handling**: Prompts re-verification if expired  
✅ **User-Friendly**: Integrates seamlessly with existing form  

## 🚀 Next Steps

1. **Get your reCAPTCHA keys** from Google
2. **Replace the test site key** in the code
3. **Install the package**: `npm install react-google-recaptcha`
4. **Test thoroughly** before going live
5. **Monitor** reCAPTCHA admin console for analytics

Your contact form will now be protected against spam and automated submissions! 🛡️
