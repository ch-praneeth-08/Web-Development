const express = require("express")//importing express
const app = express(); //express object
const user = require('./APIs/userApi')//importing the user api
const mongoose = require('mongoose')
app.use('/user-api',user)//directing the routes when the start is user-api - to userApi

async function StartSever(){
    try{
        mongoose.connect('mongodb://localhost:27017/database')//connecting to mongodb
        console.log("Database connection Success....")
        // http server 
        app.listen(3000,()=>{
            console.log("HTTP server is running in port 3000...")
        })
    }
    catch(err){
        console.log("Error in connecting to Database",err)
    }
}
StartSever();

