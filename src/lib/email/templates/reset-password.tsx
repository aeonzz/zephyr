import * as React from "react";
import {
  Html,
  Button,
  Text,
  Head,
  Body,
  Container,
  Section,
  Preview,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  email: string;
  url: string;
  subject: string;
}

export function ResetPasswordEmail({
  email,
  url,
  subject,
}: ResetPasswordEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>{subject}</title>
      </Head>
      <Preview>Reset your password to regain access to your account.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>Password Reset Request</Text>
          <Text style={text}>Hi {email},</Text>
          <Text style={text}>
            We received a request to reset your password. If you didn&apos;t make
            this request, you can safely ignore this email. Otherwise, click the
            button below to reset your password:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Reset Password
            </Button>
          </Section>
          <Text style={text}>
            This link will expire in 1 hour for security reasons. If you need
            assistance, please contact our support team.
          </Text>
          <Text style={footer}>
            Best regards,
            <br />
            Your Company Name
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles (reused from your existing template)
const main = {
  backgroundColor: "#f6f9fc",
  padding: "20px 0",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  padding: "40px",
  maxWidth: "600px",
  margin: "0 auto",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  color: "#555555",
  lineHeight: "1.5",
  marginBottom: "20px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "20px 0",
};

const button = {
  backgroundColor: "#0070f3",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "12px 24px",
  borderRadius: "5px",
  textDecoration: "none",
};

const footer = {
  fontSize: "14px",
  color: "#999999",
  marginTop: "20px",
};
