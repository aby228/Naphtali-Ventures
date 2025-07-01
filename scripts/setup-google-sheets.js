// Google Apps Script code to handle form submissions
// This needs to be deployed as a Google Apps Script Web App

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents)

    // Get the active spreadsheet (create one first and get its ID)
    const SHEET_ID = "YOUR_GOOGLE_SHEET_ID" // Replace with your actual sheet ID
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()

    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.firstName || "",
      data.lastName || "",
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.service || "",
      data.description || "",
      data.source || "Website Contact Form",
      data.userAgent || "",
      data.referrer || "",
    ]

    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp",
        "First Name",
        "Last Name",
        "Full Name",
        "Email",
        "Phone",
        "Service",
        "Description",
        "Source",
        "User Agent",
        "Referrer",
      ]
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])

      // Format headers
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#4285f4").setFontColor("white")
    }

    // Append the new row
    sheet.appendRow(rowData)

    // Auto-resize columns
    sheet.autoResizeColumns(1, sheet.getLastColumn())

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data saved successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

// Test function to verify the script works
function testFunction() {
  const testData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "+233 24 123 4567",
    service: "residential",
    description: "This is a test submission",
    timestamp: new Date().toISOString(),
  }

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  }

  return doPost(mockEvent)
}
