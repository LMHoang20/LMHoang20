import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

export default async function recruiterContact(
	req: NextRequest,
): Promise<NextResponse> {
	if (req.method !== "POST") {
		return new NextResponse("Method not allowed. Use POST", { status: 405 });
	}

	if (req.headers.get("Content-Type") !== "application/json") {
		return new NextResponse("Content-Type must be application/json", {
			status: 400,
		});
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

		// Log the form submission
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

		// Retrieve your email from environment variables
		const recipientEmail = process.env.RECIPIENT_EMAIL;
		if (!recipientEmail) {
			console.error("Recipient email is not set in environment variables.");
			return new NextResponse("Internal server error", { status: 500 });
		}

		// Configure nodemailer
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: recipientEmail,
			subject: `Recruiter Contact Form Submission from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPosition: ${position}\nMessage: ${message}\nRequested Info: ${requestedInfo.join(
				", ",
			)}`,
		};

		await transporter.sendMail(mailOptions);

		const response = {
			success: true,
			message:
				"Thank you for your interest! I'll get back to you within 24 hours with the requested information.",
			note: "Please check your email (including spam folder) for my response.",
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error("Error processing recruiter contact form:", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
