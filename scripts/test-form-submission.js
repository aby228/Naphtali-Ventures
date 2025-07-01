// Test script to verify your Google Sheets integration works
// Run this in your browser console after setting up

async function testFormSubmission() {
  console.log("🧪 Testing NAPHTALI VENTURES form submission...")

  const testData = {
    firstName: "John",
    lastName: "Test",
    email: "john.test@example.com",
    phone: "+233 24 123 4567",
    service: "residential",
    description: "This is a test submission to verify the form integration works correctly.",
    timestamp: new Date().toISOString(),
    source: "Website Contact Form - TEST",
    userAgent: navigator.userAgent,
    referrer: document.referrer || "Direct",
  }

  try {
    // Replace with your actual Google Apps Script URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    console.log("✅ Test submission sent!")
    console.log("📊 Check your Google Sheet for the test data:")
    console.log("- Name: John Test")
    console.log("- Email: john.test@example.com")
    console.log("- Service: Residential")

    alert("✅ Test completed! Check your Google Sheet for the test submission.")
  } catch (error) {
    console.error("❌ Test failed:", error)
    alert("❌ Test failed. Check the console for details.")
  }
}

// Run the test
testFormSubmission()
