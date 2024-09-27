"use server";

import nodemailer from "nodemailer";
import { createClient } from "../supabase/server";

export async function GetAllUsers() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to send email to all users
export async function sendEmail(message: string) {
  const SENDER_EMAIL = process.env.NEXT_PUBLIC_SENDER_EMAIL;
  const SENDER_PASSWORD = process.env.NEXT_PUBLIC_SENDER_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD,
    },
  });

  try {
    // Get all users from the database
    const users = await GetAllUsers();
    if (users.length === 0) {
      return { success: false, error: "No users found to send emails." };
    }

    // Loop through all users and send email
    const emailPromises = users.map(async (user) => {
      const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: "SNSU Event Management",
        text: message,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        return info.response;
      } catch (error) {
        console.error(`Error sending email to ${user.email}:`, error);
        return null;
      }
    });

    // Wait for all emails to be sent
    const results = await Promise.all(emailPromises);

    // Filter out any failed emails
    const failedEmails = results.filter((result) => result === null);
    if (failedEmails.length > 0) {
      return { success: false, error: "Some emails failed to send." };
    }

    return { success: true, message: "Emails sent successfully!" };
  } catch (error) {
    console.error("Error sending emails:", error);
    return { success: false, error: "Failed to send emails." };
  }
}
