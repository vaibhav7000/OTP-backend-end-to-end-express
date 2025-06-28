const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const otpRouter = require("./routes/OTPRoute.js");
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173/",
}))


app.use(express.json());

app.use("/otp", otpRouter);


app.use(function(err, req, res, next) {
  if(err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error"
    })
    return
  }

  next();
})

app.use(function(req, res, next) {
  res.status(404).json({
    msg: "Route not found"
  })
})

app.listen(port, function() {
  console.log("server is started")
})







/*
  -> Flow of the OTP verification application

  1. Client sends the OTP request to the backend server / node js server
  2. Backend creates an random OTP stores it in-memory, REDIS, DB for temporary (for some-time and it will be deleted then)
  3. Uses an external tool node-mailer to the send the OTP over the mail 
  4. User recieves the OTP, fills in the application and send it to the backend server
  5. Backend compares both the OTPS stored and recieved and if equal sends the ok response to the user and logs inside the application


  -> Will be using "nodeMailer" as a external tool to the send the otp to the user over the mail
  -> node-mailer behaves as a "email-client" like "gmail", "outlook", "yahoo" and follows the same protocol when sending the MAIL over to the user (so we have to specify which email-service our mail is using either gmail, outlook etc)

  -> juai bscd allp vcen -> this password "grants complete access" of our email to the node-mailer client and hence the OTP will be know be send the from the our mail --> user-mail

  Flow for the node-mailer to send the mail over the internet
  1. Creates a email-client (eg gmail app that send mail to the user using the SMTP protocol) according to the host / service we provide (if we provide gmail it will become gmail client and will send the OTP according to the gmail ) and similarly for outlook and zoho
  2. The app password that we provide to it grants complete access to your Google Account / particular service provider
*/




