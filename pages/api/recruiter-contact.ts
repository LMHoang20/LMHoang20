import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

interface RecruiterFormData {
  name: string;
  email: string;
  company: string;
  position: string;
  message: string;
  requestedInfo: string[];
}

export default async function recruiterContact(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed. Use POST", { status: 405 });
  }

  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("Content-Type must be application/json", { status: 400 });
  }

  try {
    const body: RecruiterFormData = await req.json();
    
    // Validate required fields
    const { name, email, company, position, message, requestedInfo } = body;
    
    if (!name || !email || !company || !position || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse("Invalid email format", { status: 400 });
    }

    // Log the form submission (in a real app, you'd save to database or send email)
    console.log("Recruiter contact form submission:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      position,
      message,
      requestedInfo,
      ip: req.ip,
    });

    // In a production app, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send auto-reply with requested information
    
    // For now, we'll just return success
    const response = {
      success: true,
      message: "Thank you for your interest! I'll get back to you within 24 hours with the requested information.",
      note: "Please check your email (including spam folder) for my response.",
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error("Error processing recruiter contact form:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
