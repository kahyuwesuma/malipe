import { Resend } from "resend";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const donorName = formData.get("donorName");
    const nestLocation = formData.get("nestLocation");
    const eggCount = formData.get("eggCount");
    const hatchStatus = formData.get("hatchStatus");
    const updateDate = formData.get("updateDate");
    const message = formData.get("message");
    const image = formData.get("image");

    // Format date to WITA / GMT+8
    const dateObj = new Date(updateDate);
    const formattedDate = dateObj.toLocaleString("en-US", {
      timeZone: "Asia/Makassar",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDateWithZone = `${formattedDate} (WITA / GMT+8)`;

    // Load logo (optional)
    let logoDataUri = "";
    try {
      const logoPath = path.join(process.cwd(), "src", "asset", "logo_ylbkd.png");
      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString("base64");
      logoDataUri = `data:image/png;base64,${logoBase64}`;
    } catch {
      logoDataUri = "https://malipe.vercel.app/assets/malipe.webp";
    }

    // Prepare attachments if image is included
    let attachments = [];
    if (image && typeof image === "object" && image.name) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: image.name,
        content: buffer.toString("base64"),
      });
    }

    // Email template
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Turtle Nest Update</title>
        </head>
        <body style="margin:0;padding:0;font-family:'AktivGrotesk-Regular',sans-serif;background:#f8fafc;line-height:1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#f8fafc;">
            <tr>
              <td align="center">
                <table width="650" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,0.08);overflow:hidden;border:1px solid #e2e8f0;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1e40af 0%,#2563eb 100%);padding:40px;text-align:center;">
                      ${
                        logoDataUri
                          ? `<img src="${logoDataUri}" alt="Malipe Logo" style="height:60px;margin-bottom:20px;">`
                          : ""
                      }
                      <h1 style="color:#fff;font-size:28px;font-weight:700;margin:0;">Turtle Nest Update</h1>
                      <p style="color:#dbeafe;font-size:15px;margin-top:8px;">Maratua Peduli Penyu</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <p style="font-size:16px;color:#1e293b;margin:0 0 20px 0;">
                        Hello <strong>${donorName}</strong>,
                      </p>
                      <p style="font-size:15px;color:#475569;margin:0 0 30px 0;">
                        We are pleased to share the latest update about the turtle nest you helped protect:
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:30px;">
                        <tr>
                          <td style="background:#f8fafc;padding:16px 20px;width:40%;font-weight:600;color:#64748b;">Nest Location</td>
                          <td style="padding:16px 20px;">${nestLocation}</td>
                        </tr>
                        <tr>
                          <td style="background:#f8fafc;padding:16px 20px;font-weight:600;color:#64748b;">Egg Count</td>
                          <td style="padding:16px 20px;">${eggCount}</td>
                        </tr>
                        <tr>
                          <td style="background:#f8fafc;padding:16px 20px;font-weight:600;color:#64748b;">Hatching Status</td>
                          <td style="padding:16px 20px;">${hatchStatus}</td>
                        </tr>
                        <tr>
                          <td style="background:#f8fafc;padding:16px 20px;font-weight:600;color:#64748b;">Observation Date</td>
                          <td style="padding:16px 20px;">${formattedDateWithZone}</td>
                        </tr>
                      </table>
                      ${
                        message
                          ? `
                        <div style="margin-bottom:30px;">
                          <h3 style="color:#1e40af;font-size:18px;margin-bottom:12px;">Additional Notes</h3>
                          <div style="background:#f8fafc;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;">
                            <p style="color:#334155;font-size:14px;white-space:pre-wrap;">${message}</p>
                          </div>
                        </div>` 
                          : ""
                      }
                      ${
                        attachments.length > 0
                          ? `
                          <div style="margin-bottom:30px;">
                            <h3 style="color:#1e40af;font-size:18px;margin-bottom:12px;">Attached Image</h3>
                            <p style="color:#475569;font-size:14px;">An image update is attached to this email.</p>
                          </div>`
                          : ""
                      }
                      <p style="font-size:14px;color:#475569;margin-bottom:0;">
                        Thank you for your continued support in turtle conservation! 
                        Your contribution helps protect marine biodiversity in Maratua.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f8fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
                      <p style="color:#64748b;font-size:13px;margin:0 0 12px 0;">
                        This email was sent automatically by <strong>Maratua Peduli Penyu (Malipe)</strong><br/>
                        Please do not reply to this message.
                      </p>
                      <p style="color:#94a3b8;font-size:12px;margin:0;">
                        &copy; ${new Date().getFullYear()} Maratua Peduli Penyu (Malipe)
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const minifyHTML = (html) => 
      html.replace(/\s+/g, " ").replace(/\n/g, "").trim();

    const emailHTMLMin = minifyHTML(emailHTML);

    // Send email via Resend
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Turtle Nest Update - ${nestLocation}`,
      html: emailHTMLMin,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Update email has been successfully sent to the donor.",
    });
  } catch (error) {
    console.error("Error sending update email:", error);
    return NextResponse.json(
      {
        error: "Failed to send update email.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}