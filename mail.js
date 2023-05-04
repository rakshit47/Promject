require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

OAuth2Client.setCredentials({ refresh_token: process.env.refreshToken });

exports.sendMail = async (nam, recipient) => {
  const accessToken = OAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.refreshToken,
      accessToken: accessToken,
    },
  });

  const mailOption = {
    from: `theDeveloper ${process.env.USER}`,
    to: recipient,
    subject: "A msg from theDeveloper",
    html: getHtml(nam),
  };

  let response = await transport.sendMail(mailOption);

  // console.log(response);
  return response;
};

function getHtml(Nam) {
  return `<body style="border: dashed 3.5px; border-radius: 14px;">
 <center>
   <h1>Your OTP is ${Nam}</h1>
 </center>
</body>`;
}
