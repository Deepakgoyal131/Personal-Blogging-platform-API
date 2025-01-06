const mongoose = require('mongoose');
    
const connectToDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/blogs').then(()=>{
        console.log("Success: Connect to DB");
    }).catch((err)=>{
        console.log(`Unsuccess : connection Error ${err}`);
    })   
}

module.exports = connectToDB;