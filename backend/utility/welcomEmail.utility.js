/**
 * Generates a clean, responsive HTML welcome email template.
 * @param {string} name - The name of the registered user.
 * @returns {string} - Complete HTML string ready for Nodemailer.
 */
const getWelcomeTemplate = (name) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Platform!</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
                        
                        <tr>
                            <td align="center" style="background: linear-gradient(135deg, #4f46e5, #6366f1); padding: 40px 20px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Welcome to Our App!</h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 40px 30px; color: #334155;">
                                <p style="font-size: 18px; line-height: 1.6; margin-top: 0;">Hi <strong>${name}</strong>,</p>
                                
                                <p style="font-size: 16px; line-height: 1.6; color: #475569;">
                                    We're absolutely thrilled to have you onboard. Your account has been successfully created, and you're now ready to explore everything our platform has to offer.
                                </p>

                                <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 30px;">
                                    To help you get started right away, click the button below to jump straight into your dashboard and set up your profile.
                                </p>

                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center">
                                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" 
                                               target="_blank" 
                                               style="background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 30px; font-size: 16px; font-weight: 600; border-radius: 6px; display: inline-block; transition: background-color 0.2s ease;">
                                                Go to Dashboard
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 35px 0;">

                                <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin-bottom: 0;">
                                    If you have any questions, feel free to reply to this email—our support team is always happy to help.
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="background-color: #f8fafc; padding: 20px; border-top: 1px solid #f1f5f9;">
                                <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                                    &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
                                </p>
                                <p style="font-size: 12px; color: #94a3b8; margin: 5px 0 0 0;">
                                    123 Tech Street, Suite 400, San Francisco, CA 94107
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
};

module.exports = getWelcomeTemplate;