import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: unknown;
  mobile?: unknown;
  email?: unknown;
  message?: unknown;
};

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  const recipient = process.env.CONTACT_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const sender = process.env.CONTACT_FROM_EMAIL || smtpUser;

  if (
    !recipient ||
    !smtpHost ||
    !smtpPort ||
    !smtpUser ||
    !smtpPassword ||
    !sender
  ) {
    console.error("Contact form email configuration is incomplete.");
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, mobile, email, message } = payload;
  if (
    !isString(name) ||
    !isString(mobile) ||
    !isString(email) ||
    !isString(message) ||
    name.length > 100 ||
    mobile.length > 30 ||
    email.length > 254 ||
    message.length > 3000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Please provide valid contact details and a message." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `New Infysa enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Mobile: ${mobile}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("SMTP rejected contact form email.", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
