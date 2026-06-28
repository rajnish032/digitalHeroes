const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const sendEmail = async (email, subject, { text, html }) => {
  const params = {
    Source: `Test Team <${process.env.SES_FROM_EMAIL}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: text || "",
        },
        Html: {
          Data: html || "",
        },
      },
    },
  };

  await ses.send(new SendEmailCommand(params));
};

module.exports = sendEmail;


// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async (email, subject, { text, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: `Test Team <${process.env.RESEND_EMAIL_FROM}>`,
//       to: email,
//       subject,
//       text: text || undefined,
//       html: html || undefined,
//     });

//     if (error) {
//       throw error;
//     }

//     console.log("Email sent:", data);
//     return data;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// module.exports = sendEmail;