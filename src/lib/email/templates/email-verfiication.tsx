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

interface EmailVerificationProps {
  email: string;
  url: string;
  subject: string;
}

export function EmailVerification({
  email,
  url,
  subject,
}: EmailVerificationProps) {
  return (
    <Html lang="en">
      <Head>
        <title>{subject}</title>
      </Head>
      <Preview>
        Verify your email address to complete your registration.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>Email Verification</Text>
          <Text style={text}>Hi {email},</Text>
          <Text style={text}>
            Thank you for signing up! Please verify your email address by
            clicking the button below:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Verify Email
            </Button>
          </Section>
          <Text style={text}>
            If you didn&apos;t create an account, you can safely ignore this email.
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
  backgroundColor: "#09090b",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "12px 24px",
  textDecoration: "none",
};

const footer = {
  fontSize: "14px",
  color: "#999999",
  marginTop: "20px",
};
