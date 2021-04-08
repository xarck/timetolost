const express = require('express')
const Router = express.Router()
const nodemailer = require('nodemailer')
const Content = require('../../models/content')

Router.get('/',(req,res)=> {
    Content.find()
    .select('-__v')
    .select('-_id')
    .then(data => res.json(data))
})

Router.post('/email',(req,res)=>{
    Content.findOneAndUpdate({
        $push:{"contents.support": req.body.email}
    })
    .then(data=>res.json(data))

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'Gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: req.body.email, // list of receivers
    subject: "For Sponsering / Collaborating / Suggestions", // Subject line
    html: "<strong style='font-size:25px'>Thanks for taking interest in our website. Please reply why you were interested in our website, so we can provide you more details.<strong>", // plain text body
  });
})

module.exports = Router