const path = require("path");
const express = require("express");
const transporter = require("./config");
const dotenv=require('dotenv');
dotenv.config();
const app = express(); //creating express app

const buildPath = path.join(__dirname, "..", "build");
app.use(express.json()); //setting up json parser to handle the form data
app.use(express.static(buildPath));

app.post("/send", (req, res) => {
  console.log(req.body);
  try {
    const mailOptions = {
      from: req.body.email,
      to: process.env.email,
      subject: req.body.subject,
      html: req.body.message
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
          console.log(err);
        res.status(500).send({
          success: false,
          message: "Something wnet wrong.Please try again later",
        });
      } else {
        res.send({
          success: true,
          message: "Thanks for contacting us.",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong.Try again",
    });
  }
});

app.listen(3030, () => console.log("server started on port 3030"));
