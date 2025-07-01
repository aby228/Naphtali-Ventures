// Alternative: Simple email notification using a different service
// This can be used instead of EmailJS if you prefer

async function sendSimpleEmail(formData) {
  try {
    // Using a simple email service like Formspree or Netlify Forms
    // Replace with your preferred email service endpoint

    const emailData = {
      to: "youngeabraham49@gmail.com",
      subject: `New Quote Request - ${formData.service}`,
      html: `
        <h2>New Quote Request from NAPHTALI VENTURES Website</h2>
        
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
        </ul>
        
        <h3>Project Details:</h3>
        <ul>
          <li><strong>Service Type:</strong> ${formData.service}</li>
          <li><strong>Description:</strong> ${formData.description}</li>
        </ul>
        
        <h3>Submission Info:</h3>
        <ul>
          <li><strong>Date:</strong> ${new Date().toLocaleString("en-GH", { timeZone: "Africa/Accra" })}</li>
          <li><strong>Source:</strong> Website Contact Form</li>
        </ul>
        
        <p><strong>Please respond within 24 hours.</strong></p>
      `,
    }

    // Example using Formspree (free email service)
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    if (response.ok) {
      return { success: true }
    } else {
      throw new Error("Email service unavailable")
    }
  } catch (error) {
    console.error("Simple email error:", error)
    return { success: false, error: error.message }
  }
}

// Usage: Replace the EmailJS function with this simpler alternative
