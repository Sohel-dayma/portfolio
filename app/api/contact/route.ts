import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ============================================================
// 🔧 NODEMAILER SETUP — .env.local file mein yeh daalo:
//
//   GMAIL_USER=apnigmail@gmail.com
//   GMAIL_PASS=xxxx xxxx xxxx xxxx   ← Gmail App Password
//   CONTACT_TO=jiskomail@gmail.com   ← kahan aana chahiye mail
//
// Gmail App Password kaise banao:
//   1. myaccount.google.com → Security
//   2. 2-Step Verification ON karo
//   3. "App passwords" → "Mail" select karo → Generate
//   4. Woh 16-digit password yahan paste karo
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email aur message zaroori hai' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to:      process.env.CONTACT_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `📩 New Inquiry: ${subject || 'Portfolio Contact'}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:580px;margin:0 auto;background:#0d1626;color:#f0f4ff;border-radius:16px;overflow:hidden">
          <div style="background:#00d4ff;padding:24px 32px">
            <h2 style="margin:0;color:#080e1a;font-size:20px;font-weight:700">New Portfolio Message</h2>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;color:#8a9bb5;font-size:13px;width:100px">Name</td><td style="padding:10px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#8a9bb5;font-size:13px">Email</td><td style="padding:10px 0"><a href="mailto:${email}" style="color:#00d4ff">${email}</a></td></tr>
              ${phone   ? `<tr><td style="padding:10px 0;color:#8a9bb5;font-size:13px">Phone</td><td style="padding:10px 0">${phone}</td></tr>` : ''}
              ${subject ? `<tr><td style="padding:10px 0;color:#8a9bb5;font-size:13px">Subject</td><td style="padding:10px 0">${subject}</td></tr>` : ''}
            </table>
            <hr style="border:none;border-top:1px solid #1a2d46;margin:20px 0"/>
            <p style="color:#8a9bb5;font-size:13px;margin:0 0 8px">Message:</p>
            <p style="margin:0;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
          <div style="padding:16px 32px;background:#080e1a;text-align:center;color:#8a9bb5;font-size:12px">
            Sent from your Portfolio Website
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json({ error: 'Email send nahi hua' }, { status: 500 })
  }
}
