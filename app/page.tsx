"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Shield,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Users,
  Wrench,
  Home,
  Building,
  Sun,
  Menu,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  AlertTriangle,
  Zap,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import dynamic from "next/dynamic"

// Add type definitions
interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  service: string
  description: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  service?: string
  description?: string
  recaptcha?: string
}

interface SubmitStatus {
  type: "success" | "error"
  message: string
}

// Dynamic import for ReCAPTCHA to avoid SSR issues
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => (
    <div className="h-[78px] bg-gray-100 rounded animate-pulse flex items-center justify-center">
      <div className="text-gray-500 text-sm">Loading security verification...</div>
    </div>
  ),
}) as any

export default function NaphtaliVenturesLanding() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    description: "",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null)
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const recaptchaRef = useRef<any>(null)

  // Add mobile menu state after other useState declarations
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {}

    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters"
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters"
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address"
    }

    // Service validation
    if (!formData.service) {
      errors.service = "Please select a service"
    }

    // Description validation
    if (!formData.description.trim()) {
      errors.description = "Project description is required"
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters"
    }

    // reCAPTCHA validation
    if (!recaptchaValue) {
      errors.recaptcha = "Please complete the reCAPTCHA verification"
    }

    return errors
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value)

    // Clear reCAPTCHA error when user completes it
    if (formErrors.recaptcha && value) {
      setFormErrors((prev) => ({ ...prev, recaptcha: "" }))
    }

    // Clear submit status when user interacts with reCAPTCHA
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const resetRecaptcha = () => {
    setRecaptchaValue(null)
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }

  const sendToGoogleSheets = async (data: FormData & { fullName: string; submittedAt: string; userAgent: string; referrer: string; recaptchaToken: string | null }) => {
    try {
      console.log("🔍 Starting Google Sheets submission...")
      
      // Google Apps Script Web App URL (replace with your actual URL)
              const GOOGLE_SCRIPT_URL =
          "https://script.google.com/macros/s/AKfycbwOree87UrsUvH_3vXkFRusFtHYs0Jc-zO3PTwB4wP3aLcxf6Uo_-eQfV1UbPe08KBY/exec" // Replace with your new Web App URL

      console.log("🔍 Google Script URL:", GOOGLE_SCRIPT_URL)

      // Prepare data in a structured format for Google Sheets
      const sheetsData = {
        // Basic customer information
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        
        // Project details
        service: data.service,
        description: data.description,
        
        // Submission metadata
        timestamp: new Date().toISOString(),
        submissionDate: new Date().toLocaleString("en-GH", {
          timeZone: "Africa/Accra",
          dateStyle: "full",
          timeStyle: "short",
        }),
        source: "Website Contact Form",
        
        // Security and tracking
        recaptchaVerified: true,
        recaptchaToken: data.recaptchaToken,
        userAgent: data.userAgent,
        referrer: data.referrer,
        
        // Additional fields for better organization
        customerPhone: data.phone, // Duplicate for compatibility
        customerEmail: data.email, // Duplicate for compatibility
        serviceType: data.service, // Duplicate for compatibility
        projectDescription: data.description, // Duplicate for compatibility
      }

      console.log("📊 Prepared data for Google Sheets:", sheetsData)
      console.log("📊 JSON stringified data:", JSON.stringify(sheetsData))

      console.log("🔍 Sending fetch request...")
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetsData),
      })

      console.log("✅ Google Sheets response received")
      console.log("🔍 Response type:", response.type)
      console.log("🔍 Response status:", response.status)
      console.log("🔍 Response ok:", response.ok)
      
      // Since mode is "no-cors", we can't read the response, but we can check if the request was sent
      if (response.type === "opaque") {
        console.log("✅ Google Sheets request sent successfully (no-cors mode)")
        return { success: true }
      } else {
        console.log("⚠️ Google Sheets response type:", response.type)
        return { success: true } // Still consider it successful as the request was sent
      }
    } catch (error) {
      console.error("❌ Google Sheets error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      console.error("❌ Error details:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: errorMessage,
        stack: error instanceof Error ? error.stack : "No stack trace"
      })
      return { success: false, error: errorMessage }
    }
  }

  const sendNotificationEmail = async (data: FormData & { fullName: string; submittedAt: string; userAgent: string; referrer: string; recaptchaToken: string | null }) => {
    try {
      // ⚠️ REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS ⚠️
      // Get these from: https://dashboard.emailjs.com/admin
      const SERVICE_ID = "service_6tk2y4g" // Replace with your Service ID
      const TEMPLATE_ID = "template_h2fzkex" // Replace with your Template ID (notification to you)
      const PUBLIC_KEY = "x0EUGH-BwfsY3CURC" // Replace with your Public Key

      // Check if credentials are properly configured
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.log("⚠️ EmailJS credentials missing - skipping notification email")
        return {
          success: false,
          error: "EmailJS credentials not configured",
        }
      }

      // Dynamic import of EmailJS with better error handling
      let emailjs
      try {
        const emailjsModule = await import("@emailjs/browser")
        emailjs = emailjsModule.default
      } catch (importError) {
        console.error("Failed to load EmailJS:", importError)
        return {
          success: false,
          error: "EmailJS library not available",
        }
      }

      // Initialize EmailJS with your public key
      emailjs.init(PUBLIC_KEY)

      // Template parameters for notification email to you
      const templateParams = {
        // Basic recipient info
        to_name: "The NAPHTALI VENTURES Team",
        to_email: "youngeabraham49@gmail.com",
        user_email: "youngeabraham49@gmail.com", // Add this for EmailJS
        user_name: "The NAPHTALI VENTURES Team", // Add this for EmailJS

        // Customer information
        customer_name: `${data.firstName} ${data.lastName}`,
        customer_email: data.email,
        customer_phone: data.phone,

        // Project details
        service_type: data.service,
        project_description: data.description,

        // Additional info
        submission_date: new Date().toLocaleString("en-GH", {
          timeZone: "Africa/Accra",
          dateStyle: "full",
          timeStyle: "short",
        }),

        // Security info
        recaptcha_verified: "✅ Verified",

        // For auto-reply
        reply_to: data.email,
      }

      console.log("📧 Sending notification email via EmailJS...")
      console.log("Service ID:", SERVICE_ID)
      console.log("Template ID:", TEMPLATE_ID)

      // Send notification email using EmailJS
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      console.log("✅ Notification email sent successfully:", response)
      return { success: true, response }
    } catch (error) {
      console.error("❌ Notification email error details:", error)

      // Return specific error information
      let errorMessage = "Notification email sending failed"

      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as any).status
        if (status === 404) {
          errorMessage = "EmailJS service not found - check your Service ID"
        } else if (status === 400) {
          errorMessage = "EmailJS template not found - check your Template ID"
        } else if (status === 422) {
          errorMessage = "Email template variables mismatch"
        }
      }
      
      if (error && typeof error === 'object' && 'text' in error) {
        errorMessage = (error as any).text
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      return { success: false, error: errorMessage }
    }
  }

  const sendAutoReplyEmail = async (data: FormData & { fullName: string; submittedAt: string; userAgent: string; referrer: string; recaptchaToken: string | null }) => {
    try {
      // ⚠️ REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS ⚠️
      // Get these from: https://dashboard.emailjs.com/admin
      const SERVICE_ID = "service_6tk2y4g" // Replace with your Service ID
      const TEMPLATE_ID = "template_vodsjrr" // Replace with your Auto-Reply Template ID
      const PUBLIC_KEY = "x0EUGH-BwfsY3CURC" // Replace with your Public Key

      // Check if credentials are properly configured
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.log("⚠️ EmailJS credentials missing - skipping auto-reply email")
        return {
          success: false,
          error: "EmailJS credentials not configured",
        }
      }

      // Dynamic import of EmailJS with better error handling
      let emailjs
      try {
        const emailjsModule = await import("@emailjs/browser")
        emailjs = emailjsModule.default
      } catch (importError) {
        console.error("Failed to load EmailJS:", importError)
        return {
          success: false,
          error: "EmailJS library not available",
        }
      }

      // Initialize EmailJS with your public key
      emailjs.init(PUBLIC_KEY)

      // Template parameters for auto-reply email to customer
      const templateParams = {
        // Customer information
        customer_name: `${data.firstName} ${data.lastName}`,
        customer_email: data.email,
        customer_phone: data.phone,
        user_email: data.email, // Add this for EmailJS
        user_name: `${data.firstName} ${data.lastName}`, // Add this for EmailJS

        // Project details
        service_type: data.service,
        project_description: data.description,

        // Additional info
        submission_date: new Date().toLocaleString("en-GH", {
          timeZone: "Africa/Accra",
          dateStyle: "full",
          timeStyle: "short",
        }),

        // Contact info for customer
        company_phone: "+233 24 491 9412",
        company_email: "naphtaliotoo@gmail.com",
        company_address: "H/No. 20/21 Boame Street, Darkuman, Accra, Ghana",

        // For auto-reply
        reply_to: "naphtaliotoo@gmail.com",
      }

      console.log("📧 Sending auto-reply email via EmailJS...")
      console.log("Service ID:", SERVICE_ID)
      console.log("Template ID:", TEMPLATE_ID)

      // Send auto-reply email using EmailJS
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      console.log("✅ Auto-reply email sent successfully:", response)
      return { success: true, response }
    } catch (error) {
      console.error("❌ Auto-reply email error details:", error)

      // Return specific error information
      let errorMessage = "Auto-reply email sending failed"

      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as any).status
        if (status === 404) {
          errorMessage = "EmailJS service not found - check your Service ID"
        } else if (status === 400) {
          errorMessage = "EmailJS template not found - check your Template ID"
        } else if (status === 422) {
          errorMessage = "Email template variables mismatch"
        }
      }
      
      if (error && typeof error === 'object' && 'text' in error) {
        errorMessage = (error as any).text
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      return { success: false, error: errorMessage }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("🚀 Form submission started")

    const errors = validateForm()
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      console.log("❌ Form validation failed:", errors)
      return
    }

    console.log("✅ Form validation passed")

    setIsSubmitting(true)

    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || "Direct",
        recaptchaToken: recaptchaValue,
      }

      console.log("📝 Submitting form data:", submissionData)
      console.log("📝 reCAPTCHA value:", recaptchaValue)

      // Test each service individually for debugging
      console.log("🔍 Testing Google Sheets...")
      const sheetsResult = await sendToGoogleSheets(submissionData)
      console.log("📊 Google Sheets result:", sheetsResult)

      console.log("🔍 Testing notification email...")
      const notificationResult = await sendNotificationEmail(submissionData)
      console.log("📧 Notification email result:", notificationResult)

      console.log("🔍 Testing auto-reply email...")
      const autoReplyResult = await sendAutoReplyEmail(submissionData)
      console.log("📧 Auto-reply email result:", autoReplyResult)

      console.log("📧 Notification email result:", notificationResult)
      console.log("📧 Auto-reply email result:", autoReplyResult)
      console.log("📊 Sheets result:", sheetsResult)

      // Check results
      const notificationSuccess = notificationResult.success
      const autoReplySuccess = autoReplyResult.success
      const sheetsSuccess = sheetsResult.success

      console.log("Notification email success:", notificationSuccess)
      console.log("Auto-reply email success:", autoReplySuccess)
      console.log("Sheets success:", sheetsSuccess)

      if (sheetsSuccess) {
        // Primary success - Google Sheets worked
        let successMessage = "✅ Thank you! Your request has been submitted successfully."

        if (autoReplySuccess) {
          successMessage += " You should receive a confirmation email shortly. We'll contact you within 24 hours."
        } else {
          successMessage += " Your information has been saved to our system and we'll contact you within 24 hours."

          const autoReplyError = autoReplyResult.error || "Auto-reply not configured"
          console.log("📧 Auto-reply email skipped:", autoReplyError)
        }

        if (!notificationSuccess) {
          const notificationError = notificationResult.error || "Notification not configured"
          console.log("📧 Notification email skipped:", notificationError)
        }

        setSubmitStatus({
          type: "success",
          message: successMessage,
        })

        // Reset form and reCAPTCHA
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          service: "",
          description: "",
        })
        resetRecaptcha()

        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus(null)
        }, 10000)
      } else if (notificationSuccess || autoReplySuccess) {
        // Fallback success - at least one email worked
        setSubmitStatus({
          type: "success",
          message: "✅ Thank you! We've received your request and will respond within 24 hours.",
        })

        // Reset form and reCAPTCHA
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          service: "",
          description: "",
        })
        resetRecaptcha()

        setTimeout(() => {
          setSubmitStatus(null)
        }, 10000)
      } else {
        // All failed
        const notificationError = notificationResult.error || "Unknown error"
        const autoReplyError = autoReplyResult.error || "Unknown error"
        const sheetsError = sheetsResult.error || "Unknown error"

        console.error("❌ All submission methods failed:")
        console.error("Notification email error:", notificationError)
        console.error("Auto-reply email error:", autoReplyError)
        console.error("Sheets error:", sheetsError)

        // Reset reCAPTCHA on error
        resetRecaptcha()

        throw new Error("Unable to submit your request. Please try again or call us directly.")
      }
    } catch (error) {
      console.error("❌ Form submission error:", error)

      // Reset reCAPTCHA on error
      resetRecaptcha()

      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setSubmitStatus({
        type: "error",
        message: `Sorry, there was an error submitting your request: ${errorMessage}. Please try again or call us directly at +233 24 491 9412.`,
      })

      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Modal */}
      <Dialog open={isEmergencyModalOpen} onOpenChange={setIsEmergencyModalOpen}>
        <DialogContent className="sm:max-w-md mx-4 sm:mx-auto border-0 shadow-2xl bg-gradient-to-br from-red-50 to-orange-50">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading mb-4">
              <center>Emergency Electrical Service</center>
            </DialogTitle>
            
            <DialogDescription asChild>
              <div className="space-y-6">
                {/* Emergency Message */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="font-semibold text-xl mb-2">24/7 Emergency Response</div>
                    <p className="text-red-100">
                      For immediate electrical emergencies, power outages, or safety concerns
                    </p>
                  </div>
                </div>

                {/* Phone Number Section */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                  <div className="text-center space-y-4">
                    <div className="text-gray-700 font-medium text-lg">Call Now</div>
                    
                    <Link
                      href="tel:+233244919412"
                      className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-2xl sm:text-3xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      +233 24 491 9412
                    </Link>
                    
                    <div className="text-sm text-gray-600">
                      Available 24/7 for electrical emergencies
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 text-center shadow-lg">
                  <div className="font-semibold mb-1">Fast Response Time</div>
                  <p className="text-blue-100 text-sm">
                    Average response: <span className="font-bold">15-30 minutes</span> in Accra
                  </p>
                </div>

                {/* Safety Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Safety First!</p>
                    <p>If you smell burning or see sparks, turn off the main power switch immediately and call us right away.</p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Header logo section */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/naphtali-logo-hero.png"
              alt="NAPHTALI VENTURES Logo"
              width={180}
              height={60}
              className="h-8 w-auto sm:h-10"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-sm font-medium hover:text-blue-600 transition-colors font-ui">
              Services
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors font-ui">
              About
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-blue-600 transition-colors font-ui">
              Projects
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors font-ui">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors font-ui">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSem6h5SqyJLxTqk62AQMppy71MVvgZhtR8g3dm0YLWk_yHeTQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-3 sm:px-4">
                Schedule Appointment
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur">
            <nav className="container px-4 py-4 space-y-4">
              <Link
                href="#services"
                className="block text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#about"
                className="block text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#projects"
                className="block text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="#testimonials"
                className="block text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="block text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSem6h5SqyJLxTqk62AQMppy71MVvgZhtR8g3dm0YLWk_yHeTQ/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">Schedule Appointment</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 md:py-32 relative overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-lighting-background.jpg"
            alt="Modern Electrical Lighting Installation"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Blue Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-700/80"></div>

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <Badge
                  variant="secondary"
                  className="w-fit mx-auto lg:mx-0 bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg text-xs sm:text-sm"
                >
                  ⚡ Your One-Stop Electrical Service
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-lg leading-tight font-hero">
                  Powering Ghana's
                  <span className="text-yellow-400 drop-shadow-lg"> Future</span>
                </h1>
                {/* Hero section tagline */}
                <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-[600px] drop-shadow-md mx-auto lg:mx-0">
                  Delivering high-quality electrical solutions for commercial clients in Ghana. Professional electrical
                  services with over 15 years of excellence, safety, and reliability.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSem6h5SqyJLxTqk62AQMppy71MVvgZhtR8g3dm0YLWk_yHeTQ/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-black shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Schedule Appointment
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Button
                  onClick={() => setIsEmergencyModalOpen(true)}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Emergency Service
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400 drop-shadow-lg">500+</div>
                  <div className="text-xs sm:text-sm text-blue-100 drop-shadow-md">Projects Completed</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400 drop-shadow-lg">15+</div>
                  <div className="text-xs sm:text-sm text-blue-100 drop-shadow-md">Years Experience</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400 drop-shadow-lg">24/7</div>
                  <div className="text-xs sm:text-sm text-blue-100 drop-shadow-md">Emergency Support</div>
                </div>
              </div>
            </div>
            {/* Hero section image - now using the logo overlay */}
            <div className="relative order-first lg:order-last">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <Image
                  src="/images/naphtali-logo-hero.png"
                  alt="NAPHTALI VENTURES Professional Electrical Team"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <Badge variant="secondary" className="w-fit mx-auto text-xs sm:text-sm">
              Our Services
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 px-4 font-heading">
              Complete Electrical Solutions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-[800px] mx-auto px-4">
              From residential wiring to industrial installations, we provide comprehensive electrical services across
              Ghana
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold">Residential Electrical</CardTitle>
                <CardDescription className="text-base">
                  Complete home electrical services including wiring, lighting, outlets, and electrical panel upgrades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>New home wiring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Lighting installation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Electrical repairs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold">Commercial & Industrial</CardTitle>
                <CardDescription className="text-base">
                  Professional electrical solutions for businesses, offices, factories, and industrial facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Industrial wiring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Motor installations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Power distribution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
                  <Sun className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold">Solar Energy Systems</CardTitle>
                <CardDescription className="text-base">
                  Sustainable solar power solutions for homes and businesses across Ghana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Solar panel installation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Battery backup systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Grid-tie systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Wrench className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold">Electrical Maintenance</CardTitle>
                <CardDescription className="text-base">
                  Preventive maintenance and repair services to keep your electrical systems running safely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Regular inspections</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Emergency repairs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>System upgrades</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold">Electrical Safety</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive electrical safety inspections and code compliance services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Safety inspections</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Code compliance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Risk assessments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold">24/7 Emergency Service</CardTitle>
                <CardDescription className="text-base">
                  Round-the-clock emergency electrical services for urgent repairs and power outages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>24/7 availability</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Rapid response</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Emergency repairs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Smart Systems Showcase */}
      <section className="py-12 sm:py-20 md:py-32 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-3 sm:space-y-4">
                <Badge
                  variant="secondary"
                  className="w-fit mx-auto lg:mx-0 bg-yellow-400 text-black text-xs sm:text-sm"
                >
                  Smart Technology
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-hero">
                  Advanced Electrical Control Systems
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-blue-100">
                  We integrate cutting-edge smart technology and digital monitoring systems into our electrical
                  installations, providing real-time control and monitoring capabilities.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <span className="text-blue-100">Digital monitoring and control systems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <span className="text-blue-100">Real-time performance analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <span className="text-blue-100">Remote system management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <span className="text-blue-100">Predictive maintenance capabilities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/services-hero.png"
                alt="Smart Electrical Control Systems"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 md:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-3 sm:space-y-4">
                <Badge variant="secondary" className="w-fit mx-auto lg:mx-0 text-xs sm:text-sm">
                  About Us
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-heading">
                  Ghana's Most Trusted Electrical Company
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  For over 15 years, NAPHTALI VENTURES has been Ghana's leading electrical contractor, providing safe,
                  reliable, and innovative electrical solutions across the country.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Licensed</div>
                  <div className="text-sm text-gray-600">Certified Professionals</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Insured</div>
                  <div className="text-sm text-gray-600">Fully Protected</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Expert Team</div>
                  <div className="text-sm text-gray-600">Skilled Electricians</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">24/7 Service</div>
                  <div className="text-sm text-gray-600">Always Available</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Why Choose NAPHTALI VENTURES?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-600">Licensed and insured electrical contractors</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-600">Over 15 years of experience in Ghana</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-600">24/7 emergency electrical services</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-600">Competitive pricing with quality guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/about-team.png"
                alt="NAPHTALI VENTURES Professional Electrical Team at Work"
                width={600}
                height={600}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <Badge variant="secondary" className="w-fit mx-auto text-xs sm:text-sm">
              Our Projects
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-heading">
              Recent Completed Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-[800px] mx-auto px-4">
              See some of our recent electrical installations and projects across Ghana
            </p>
          </div>

          <div className="relative mb-12 sm:mb-16">
            <Image
              src="/images/projects-showcase.png"
              alt="NAPHTALI VENTURES Major Electrical Projects"
              width={1200}
              height={800}
              className="rounded-xl shadow-2xl w-full"
            />
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/recent-projects.png"
                  alt="Power Infrastructure Projects"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600">Infrastructure</Badge>
              </div>
              <CardHeader>
                <CardTitle>Power Transmission Systems</CardTitle>
                <CardDescription>
                  Major power infrastructure and transmission line installations across Ghana
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/contact-infrastructure.png"
                  alt="Commercial Building Electrical"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-green-600">Commercial</Badge>
              </div>
              <CardHeader>
                <CardTitle>High-Rise Building Systems</CardTitle>
                <CardDescription>Complete electrical systems for modern commercial buildings</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/services-hero.png"
                  alt="Industrial Control Systems"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-purple-600">Industrial</Badge>
              </div>
              <CardHeader>
                <CardTitle>Smart Control Systems</CardTitle>
                <CardDescription>Advanced industrial automation and control panel installations</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/testimonial-collage.png"
                  alt="Manufacturing Electrical"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-orange-600">Manufacturing</Badge>
              </div>
              <CardHeader>
                <CardTitle>Manufacturing Facilities</CardTitle>
                <CardDescription>Comprehensive electrical solutions for manufacturing and production</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 md:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <Badge variant="secondary" className="w-fit mx-auto text-xs sm:text-sm">
              Testimonials
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-heading">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-[800px] mx-auto px-4">
              Hear from satisfied customers across Ghana
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "NAPHTALI VENTURES transformed our entire manufacturing facility with their advanced electrical
                  systems. The smart monitoring capabilities have improved our operational efficiency by 40%."
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Kwame Asante</p>
                  <p className="text-sm text-gray-600">Manufacturing Director, Tema</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "The team's expertise in power infrastructure is unmatched. They completed our substation project
                  ahead of schedule and within budget. Highly professional service."
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Ama Osei</p>
                  <p className="text-sm text-gray-600">Project Manager, ECG</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "Outstanding work on our high-rise building electrical systems. The integration of smart controls and
                  energy management systems exceeded our expectations."
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">John Mensah</p>
                  <p className="text-sm text-gray-600">Property Developer, Accra</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 md:py-32 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/contact-infrastructure.png"
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <Badge variant="secondary" className="w-fit mx-auto bg-yellow-400 text-black text-xs sm:text-sm">
              Contact Us
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
              Request Services Today
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-[800px] mx-auto px-4">
              Ready to start your electrical project? Contact us for a free consultation and quote
            </p>
          </div>

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Phone</h3>
                    <Link
                      href="tel:+233244919412"
                      className="text-blue-100 hover:text-white transition-colors block text-sm sm:text-base"
                    >
                      +233 24 491 9412
                    </Link>
                    <Link
                      href="tel:+233578364941"
                      className="text-blue-100 hover:text-white transition-colors block text-sm sm:text-base"
                    >
                      +233 57 836 4941
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Email</h3>
                    <p className="text-blue-100 text-sm sm:text-base">naphtaliotoo@gmail.com</p>
                    <p className="text-blue-100 text-sm sm:text-base">youngeabraham99@outlook.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Location</h3>
                    <p className="text-blue-100 text-sm sm:text-base">H/No. 20/21 Boame Street, Darkuman</p>
                    <p className="text-blue-100 text-sm sm:text-base">Accra, Ghana</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold">Service Areas</h3>
                <div className="grid grid-cols-2 gap-2 text-blue-100 text-sm sm:text-base">
                  <div>• Greater Accra</div>
                  <div>• Ashanti Region</div>
                  <div>• Eastern Region</div>
                  <div>• Central Region</div>
                  <div>• Western Region</div>
                  <div>• Volta Region</div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-2xl">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl text-gray-900 font-heading font-semibold">Request Service</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`w-full px-3 py-3 sm:py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-base sm:text-sm ${
                          formErrors.firstName
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="John"
                      />
                      {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`w-full px-3 py-3 sm:py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-base sm:text-sm ${
                          formErrors.lastName
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Doe"
                      />
                      {formErrors.lastName && <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full px-3 py-3 sm:py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-base sm:text-sm ${
                        formErrors.phone
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="+233 24 491 9412"
                    />
                    {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-3 py-3 sm:py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-base sm:text-sm ${
                        formErrors.email
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Needed <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange("service", e.target.value)}
                      className={`w-full px-3 py-3 sm:py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-base sm:text-sm ${
                        formErrors.service
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="residential">Residential Electrical</option>
                      <option value="commercial">Commercial Electrical</option>
                      <option value="solar">Solar Installation</option>
                      <option value="emergency">Emergency Repair</option>
                      <option value="maintenance">Electrical Maintenance</option>
                    </select>
                    {formErrors.service && <p className="mt-1 text-sm text-red-600">{formErrors.service}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={`w-full px-3 py-3 sm:py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none text-base sm:text-sm ${
                        formErrors.description
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Describe your electrical project in detail..."
                      maxLength={500}
                    />
                    {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
                    <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500 characters</p>
                  </div>

                  {/* reCAPTCHA */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Verification <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center sm:items-start space-y-2">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6Ld2RHMrAAAAAKlz_U9-fMAnn_XmLdtq6qOKsjOI"
                        onChange={handleRecaptchaChange}
                        onExpired={() => {
                          setRecaptchaValue(null)
                          setFormErrors((prev) => ({ ...prev, recaptcha: "reCAPTCHA expired. Please try again." }))
                        }}
                        onError={() => {
                          setRecaptchaValue(null)
                          setFormErrors((prev) => ({ ...prev, recaptcha: "reCAPTCHA error. Please refresh and try again." }))
                        }}
                        theme="light"
                        size="normal"
                      />
                    </div>
                    {formErrors.recaptcha && <p className="mt-1 text-sm text-red-600">{formErrors.recaptcha}</p>}
                    <p className="mt-1 text-xs text-gray-500">Please complete the security verification to submit your request.</p>
                  </div>

                  {submitStatus && (
                    <div
                      className={`p-4 rounded-md ${
                        submitStatus.type === "success"
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p className={`text-sm ${submitStatus.type === "success" ? "text-green-700" : "text-red-700"}`}>
                        {submitStatus.message}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-2 text-base sm:text-sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Request...</span>
                      </div>
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 text-center sm:text-left">
              {/* Footer logo */}
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Image
                  src="/images/naphtali-logo-hero.png"
                  alt="NAPHTALI VENTURES Logo"
                  width={150}
                  height={50}
                  className="h-6 sm:h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Ghana's premier electrical contractor providing safe, reliable, and innovative electrical solutions.
              </p>
              <div className="flex justify-center sm:justify-start space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold font-heading">Services</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Residential Electrical
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Commercial & Industrial
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Solar Energy Systems
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Emergency Services
                </Link>
              </div>
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold font-heading">Company</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  About Us
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Our Projects
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Careers
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold font-heading">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <Link
                  href="tel:+233244919412"
                  className="block hover:text-white transition-colors text-sm sm:text-base"
                >
                  +233 24 491 9412
                </Link>
                <p className="text-sm sm:text-base">naphtaliotoo@gmail.com</p>
                <p className="text-sm sm:text-base">
                  H/No. 20/21, Boame Street Darkuman
                  <br />
                  Accra, Ghana
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} NAPHTALI VENTURES. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center">
              <Link href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Safety Guidelines
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
