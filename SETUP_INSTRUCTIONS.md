# NAPHTALI VENTURES - Form Integration Setup Guide

## 📋 Step-by-Step Setup Instructions

### STEP 1: Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create new sheet
3. Rename it to "NAPHTALI VENTURES - Contact Submissions"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   Example: `https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit`
   Sheet ID = `1ABC123XYZ456`

### STEP 2: Set Up Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the provided script
4. Replace `YOUR_GOOGLE_SHEET_ID` with your actual Sheet ID
5. Save the project (name it "NAPHTALI Form Handler")

### STEP 3: Deploy the Script
1. Click "Deploy" → "New Deployment"
2. Choose "Web app" as type
3. Set Execute as: "Me"
4. Set Access: "Anyone"
5. Click "Deploy"
6. Copy the Web App URL (this is your `GOOGLE_SCRIPT_URL`)

### STEP 4: Update Website Code
Replace `YOUR_SCRIPT_ID` in the website code with your Web App URL

### STEP 5: Set Up EmailJS (Optional but Recommended)
1. Go to [emailjs.com](https://emailjs.com)
2. Create free account
3. Add email service (Gmail recommended)
4. Create email template
5. Get your Service ID, Template ID, and Public Key
6. Replace placeholders in website code

## 📊 What You'll See in Your Sheet

Your Google Sheet will automatically create these columns:
- **Timestamp** - When form was submitted
- **First Name** - Customer's first name
- **Last Name** - Customer's last name  
- **Full Name** - Combined name
- **Email** - Customer's email
- **Phone** - Customer's phone number
- **Service** - Type of electrical service needed
- **Description** - Project details
- **Source** - Always "Website Contact Form"
- **User Agent** - Browser information
- **Referrer** - How they found your site

## 🔗 Quick Access Links

After setup, bookmark these:
- **Your Google Sheet**: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
- **Google Apps Script**: `https://script.google.com`
- **EmailJS Dashboard**: `https://dashboard.emailjs.com`

## 📱 Mobile Access

You can also view submissions on mobile:
- Download "Google Sheets" app
- Sign in with your Google account
- Find your "NAPHTALI VENTURES" sheet

## 🔔 Get Notifications

To get notified of new submissions:
1. Open your Google Sheet
2. Go to Tools → Notification Rules
3. Set up email notifications for "Any changes are made"
4. You'll get emails whenever someone submits the form

## 🛠️ Testing

To test if everything works:
1. Fill out your contact form on the website
2. Check your Google Sheet - new row should appear
3. Check your email for EmailJS notification (if set up)

## 📞 Support

If you need help with setup:
- Google Sheets Help: [support.google.com/docs](https://support.google.com/docs)
- EmailJS Documentation: [emailjs.com/docs](https://www.emailjs.com/docs/)
