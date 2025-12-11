'use server';

import { EmailTemplate } from '@/components/template/email-template';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend with your API key
// You'll need to add RESEND_API_KEY to your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define validation schema using Zod
const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters long' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' }),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

export async function sendEmail(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedData = ContactFormSchema.safeParse(formData);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues.map((e) => e.message).join(', '),
      };
    }

    const { name, email, subject, message } = validatedData.data;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'shahadathhossensajib732@gmail.com',
      subject: `Contact Form of Portfolio: ${subject}`,
      react: await EmailTemplate({
        name,
        email,
        message,
        subject,
      }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error in sendEmail:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
