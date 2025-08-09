import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface RecruiterFormData {
	name: string;
	email: string;
	company: string;
	position: string;
	message: string;
	requestedInfo: string[];
}

// please don't DOS me
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed. Use POST" });
	}
	if (req.headers["content-type"] !== "application/json") {
		return res
			.status(400)
			.json({ error: "Content-Type must be application/json" });
	}
	try {
		const body: RecruiterFormData = req.body;

		// Validate required fields
		const { name, email, company, position, message, requestedInfo } = body;
		if (!name || !email || !company || !position || !message) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		// Retrieve recipient email from env
		const recipientEmail = process.env.RECIPIENT_EMAIL;
		if (!recipientEmail) {
			console.error("Recipient email is not set in environment variables.");
			return res.status(500).json({ error: "Internal server error" });
		}

		// Configure Nodemailer (Node.js runtime supports this)
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Email content
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: recipientEmail,
			subject: `Recruiter Contact Form Submission from ${name}`,
			text: `Name: ${name}
Email: ${email}
Company: ${company}
Position: ${position}
Message: ${message}
Requested Info: ${requestedInfo?.join(", ") || "None"}`,
		};

		await transporter.sendMail(mailOptions);

		return res.status(200).json({
			success: true,
			message:
				"Thank you for your interest! I'll get back to you within 24 hours with the requested information.",
			note: "Please check your email (including spam folder) for my response.",
		});
	} catch (error) {
		console.error("Error processing recruiter contact form:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
