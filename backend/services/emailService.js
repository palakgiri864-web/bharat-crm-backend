const nodemailer = require("nodemailer");

const sendLeadEmail = async (lead) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: lead.email,
    subject: `Thank you for your enquiry - ${lead.project}`,
    html: `
      <h2>Thank you, ${lead.name}</h2>
      <p>We received your enquiry for <b>${lead.project}</b>.</p>
      <p>Our sales team will contact you shortly.</p>
      <br/>
      <p>Regards,<br/>Bharat CRM</p>
    `,
  });
};

module.exports = sendLeadEmail;