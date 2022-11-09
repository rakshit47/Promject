require("dotenv").config();
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
//
exports.sendOtp = async (email, otp) => {
  let sendMail = await smtpTransport.sendMail({
    from: `Promject OTP <promject@mail.com`,
    to: email,
    subject: "noreplay-promject-otp",
    text: "Your genetrated OTP is " + otp,
    // html: `<body
    //     style="
    //       background-color: white;
    //       color: rgb(65, 65, 65);
    //       padding: 22px;
    //       font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    //         Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    //         sans-serif;
    //     "
    //   >
    //     <img src="https://i.ibb.co/7CcqvZJ/logo.png" alt="Slack" height="50" />
    //     <h1>Confirm your email address to get started on Slack</h1>
    //     <p>
    //       Once you've confirmed that
    //       <a
    //         href="kaloyan.yankulov@gmail.com"
    //         style="
    //           color: blue;
    //           font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    //             Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    //             sans-serif;
    //         "
    //         ><b>kaloyan.yankulov@gmail.com</b></a
    //       >
    //       is your email address, we'll help you find your Slack workspaces or create
    //       a new one.
    //     </p>
    //     <p><b>From your mobile device,</b> tap the button below to confirm:</p>
    //     <button
    //       style="
    //         border-radius: 3px;
    //         padding-block: 8px;
    //         padding-inline: 19px;
    //         margin-block: 40px;
    //         font: bold;
    //         color: aliceblue;
    //         background-color: rgb(61, 170, 61);
    //         border: none;
    //       "
    //     >
    //       <b>Confirm Email Address</b>
    //     </button>

    //     <p>
    //       If you didn't request this email, there's nothing to worry about - you can
    //       safely ignore it.
    //     </p>
    //     <hr style="margin-block: 60px" />
    //     <div style="text-align: center; margin: 1px">
    //       <p>
    //         Made by Slack Technologies, Inc<br />500 Howard Street | San Francisco,
    //         CA 94105 | United States
    //       </p>
    //       <p><u>Our Blog</u>    <u>Email Preferences</u>    <u>Policies</u></p>
    //     </div>
    //   </body>`,
  });

  return sendMail;
};
