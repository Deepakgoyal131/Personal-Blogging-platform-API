const express = require('express');
const dataBase = require('./db');

const app = express();
app.use(express.json());

require('dotenv').config();
const port = process.env.PORT || 3000;

dataBase();

app.listen(port,()=>{
    console.log(`server is running on PORT: ${port}`)
});

app.get('/',(req,res)=>{
    res.send("Hello world")
})  

app.use('/deepak',require('./routes/artical'))