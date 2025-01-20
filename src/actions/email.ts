"use server";

import { EmailVerification } from "@/lib/email/templates/email-verfiication";
import { ResetPasswordEmail } from "@/lib/email/templates/reset-password";
import { env } from "../env";
import { actionClient } from "@/lib/safe-actions";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { z } from "zod";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT || "587"),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

const schema = z.object({
  to: z.string().min(1).email(),
  subject: z.string().min(1).max(100),
  url: z.string().min(1),
});

export const sendVerificationEmail = actionClient
  .metadata({ actionName: "sendVerificationEmail" })
  .schema(schema)
  .action(async ({ parsedInput: { to, subject, url } }) => {
    const emailHtml = await render(
      EmailVerification({
        email: to,
        url: url,
        subject: subject,
      })
    );

    try {
      const info = await transporter.sendMail({
        from: env.SMTP_FROM,
        to: to,
        subject: subject,
        html: emailHtml,
      });

      console.log("Email sent successfully:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  });

export const sendResetPassword = actionClient
  .metadata({ actionName: "sendResetPassword" })
  .schema(schema)
  .action(async ({ parsedInput: { to, subject, url } }) => {
    const emailHtml = await render(
      ResetPasswordEmail({
        email: to,
        url: url,
        subject: subject,
      })
    );

    try {
      const info = await transporter.sendMail({
        from: env.SMTP_FROM,
        to: to,
        subject: subject,
        html: emailHtml,
      });

      console.log("Email sent successfully:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  });
