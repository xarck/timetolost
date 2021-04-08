const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const app = express()

app.use(express.json())

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

mongoose
.connect(process.env.URI,{useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log("Mongo db Connected"))
.catch(err => console.log(err))

app.use('/api/content',require('./routes/api/content'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"))
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
  });
  
}

const PORT = process.env.PORT || 3001

app.listen(PORT,function(){
  console.log('Server Running On Port 3001')
})

