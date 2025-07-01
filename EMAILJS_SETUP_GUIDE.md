# 📧 EmailJS Setup Guide for youngeabraham49@gmail.com

## 🎯 Quick Setup Steps

Since you already have an EmailJS account, you just need to get your credentials and update the code.

### Step 1: Get Your Service ID
1. Go to [dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Click on "Email Services" in the left menu
3. You should see your Gmail service listed
4. Copy the **Service ID** (looks like `service_xxxxxxx`)

### Step 2: Create/Find Your Template ID
1. Go to "Email Templates" in the left menu
2. If you don't have a template, click "Create New Template"
3. Use this template content:

**Subject:** New Quote Request - {{service_type}}

**Body:**
\`\`\`
Hello NAPHTALI VENTURES Team,

You have received a new quote request from your website:

CUSTOMER DETAILS:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

PROJECT DETAILS:
- Service Type: {{service_type}}
- Description: {{project_description}}

SUBMISSION INFO:
- Date: {{submission_date}}
- Source: Website Contact Form

Please respond to the customer within 24 hours.

Best regards,
NAPHTALI VENTURES Website System
\`\`\`

4. Set "To Email" to: `naphtaliotoo@gmail.com`
5. Set "Reply To" to: `{{reply_to}}`
6. Save and copy the **Template ID** (looks like `template_xxxxxxx`)

### Step 3: Get Your Public Key
1. Go to "Account" → "General" in the left menu
2. Copy your **Public Key** (looks like `user_xxxxxxx`)

### Step 4: Update the Code
Replace these three lines in the code:

\`\`\`javascript
const SERVICE_ID = "YOUR_SERVICE_ID" // Replace with your actual Service ID
const TEMPLATE_ID = "YOUR_TEMPLATE_ID" // Replace with your actual Template ID  
const PUBLIC_KEY = "YOUR_PUBLIC_KEY" // Replace with your actual Public Key
\`\`\`

With your actual credentials:

\`\`\`javascript
const SERVICE_ID = "service_xxxxxxx" // Your actual Service ID
const TEMPLATE_ID = "template_xxxxxxx" // Your actual Template ID  
const PUBLIC_KEY = "user_xxxxxxx" // Your actual Public Key
\`\`\`

## 🧪 Testing
1. Update the code with your real credentials
2. Submit a test form on your website
3. Check your email (naphtaliotoo@gmail.com) for the notification
4. Check the browser console for any error messages

## ✅ What Will Happen
Once configured correctly:
- ✅ Form submissions will be saved to Google Sheets
- ✅ Email notifications will be sent to naphtaliotoo@gmail.com
- ✅ Users will see success messages
- ✅ You can respond to customers quickly

## 🔧 Current Status
- **Form**: ✅ Working with validation
- **Google Sheets**: ⚠️ Needs setup
- **EmailJS**: ⚠️ Needs credentials update
- **User Experience**: ✅ Professional and smooth

The form will work perfectly once you update those three credential values!
