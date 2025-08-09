"use client";
import React, { useState } from "react";
import { Card } from "./card";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  position: string;
  message: string;
  requestedInfo: string[];
}

const infoOptions = [
  { id: "cv", label: "CV/Resume" },
  { id: "portfolio", label: "Portfolio Details" },
  { id: "contact", label: "Direct Contact Information" },
  { id: "availability", label: "Availability & Timeline" },
  { id: "references", label: "Professional References" },
];

export const RecruiterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    position: "",
    message: "",
    requestedInfo: [],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (infoId: string) => {
    setFormData(prev => ({
      ...prev,
      requestedInfo: prev.requestedInfo.includes(infoId)
        ? prev.requestedInfo.filter(id => id !== infoId)
        : [...prev.requestedInfo, infoId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/recruiter-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setResponseMessage(result.message);
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          position: "",
          message: "",
          requestedInfo: [],
        });
      } else {
        setSubmitStatus("error");
        setResponseMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setResponseMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card glowColor="from-green-500/20 via-green-400/10 to-transparent" staticGlow>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Send className="text-green-400" size={24} />
          <h2 className="text-2xl font-bold text-zinc-200">Recruiter Contact Form</h2>
        </div>
        
        <p className="text-zinc-400 mb-6">
          Interested in working together? Fill out this form to access additional information including my CV, portfolio details, and direct contact information.
        </p>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center gap-2">
            <CheckCircle className="text-green-400" size={20} />
            <p className="text-green-300">{responseMessage}</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-red-300">{responseMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-zinc-200 placeholder-zinc-400 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none transition"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-zinc-200 placeholder-zinc-400 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none transition"
                placeholder="your.email@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-zinc-200 placeholder-zinc-400 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none transition"
                placeholder="Company name"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-zinc-300 mb-2">
                Position/Role *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-zinc-200 placeholder-zinc-400 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none transition"
                placeholder="e.g., Software Engineer, Frontend Developer"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-zinc-200 placeholder-zinc-400 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none transition resize-vertical"
              placeholder="Tell me about the opportunity, role details, company culture, or any specific questions you have..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Requested Information
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {infoOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.requestedInfo.includes(option.id)}
                    onChange={() => handleCheckboxChange(option.id)}
                    className="w-4 h-4 text-green-400 bg-zinc-800 border-zinc-600 rounded focus:ring-green-400 focus:ring-2"
                  />
                  <span className="text-zinc-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Request
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-zinc-500 mt-4">
          * Required fields. Your information will be kept confidential and used only for recruitment purposes.
        </p>
      </div>
    </Card>
  );
};
