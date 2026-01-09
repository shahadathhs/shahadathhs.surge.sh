"use client";

import { sendEmail } from "@/app/actions/email";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Copy, Github, Linkedin, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { BorderBeam } from "../magicui/border-beam";
import { TypingAnimation } from "../magicui/typing-animation";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const email = "shahadathhossensajib732@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard", {
      icon: "📋",
      duration: 2000,
      description: "You can now paste it anywhere you need.",
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Error sending message", {
          icon: "❌",
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        icon: "❌",
        description: "Please try again later.",
      });
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden items-center p-2 md:p-16 border rounded mt-10">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* info */}
        <div className="space-y-4 md:space-y-8 max-w-[450px]">
          <h2 className="text-3xl font-semibold">
            <TypingAnimation>Get in touch</TypingAnimation>
          </h2>

          <div className="space-y-6">
            {/* github */}
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">GitHub</h3>
                <a
                  href="https://github.com/shahadathhs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/shahadathhs
                </a>
              </div>
            </div>

            {/* linkedin */}
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/shahadathhs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  linkedin.com/in/shahadathhs
                </a>
              </div>
            </div>

            {/* email */}
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Email</h3>
                <div className="flex items-center xl:gap-4">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm md:text-base truncate max-w-[180px] xl:max-w-[280px]"
                  >
                    {email}
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="ml-2"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="w-full flex justify-end">
          <Card className="w-full relative overflow-hidden max-w-[450px]">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-6">Send me Email</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Email subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Email"}
                </Button>
              </form>
            </CardContent>

            <BorderBeam duration={6} size={400} />
            <BorderBeam duration={6} delay={3} size={400} />
          </Card>
        </div>

        {/* border beam */}
        <BorderBeam duration={40} size={300} reverse />
      </div>
    </div>
  );
}
