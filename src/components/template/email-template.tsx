import type * as React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  subject,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New message from your website contact form</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Form Submission</Heading>
        <Text style={text}>
          You received a new message from your website contact form.
        </Text>

        <Section style={section}>
          <Text style={sectionHeader}>Subject:</Text>
          <Text style={sectionContent}>{subject}</Text>
        </Section>

        <Section style={section}>
          <Text style={sectionHeader}>From:</Text>
          <Text style={sectionContent}>
            {name} ({email})
          </Text>
        </Section>

        <Section style={section}>
          <Text style={sectionHeader}>Message:</Text>
          <Text style={sectionContent}>{message}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          This email was sent from your website contact form.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px",
  borderRadius: "4px",
  maxWidth: "600px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  lineHeight: "1.5",
};

const text = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 20px",
  lineHeight: "1.5",
};

const section = {
  margin: "20px 0",
};

const sectionHeader = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 5px",
};

const sectionContent = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 10px",
  lineHeight: "1.5",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "1.5",
};
