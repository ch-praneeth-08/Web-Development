const express = require('express') //importing express modules
const user = express.Router(); //creating mini express application 

const User = require('../Models/userModel')//importing the user schema from server


user.use(express.json())

user.get('/users',async(req,res)=>{
    try{
        const usersList = await User.find()
        res.send({message:"users",payload: usersList})
    }
    catch(err){
        res.send({message:"ERROR",payload:err.message})
    }
})

user.get('/users/:_id',async(req,res)=>{
    try{
        const user = await User.findById(req.params._id)
        res.send({message:"User",payload:user})
    }catch(err){
        res.send({message:"ERROR",payload:err.message})
    }
})

user.get('/user/:name',async(req,res)=>{
    try {
        const user = await User.findOne({name:req.params.name})
        res.send({message:"user",payload :user})
    } catch (err) {
        res.send({message:"ERROR",payload:err.message})
    }
})
user.post('/user',async(req,res)=>{
    const newUser = req.body;
    //creating user document
    try{
        const userDoc = new User(newUser)
    //save to database
    await userDoc.save()
    res.send({
        message:"new user created..."
    })
    }
    catch(err){
        res.send({message:"Error occured",payload:err.message})
    }
})


user.put('/user',async(req,res)=>{
    try{
        const modUser = req.body;
        let updatedUser = await User.findOneAndUpdate({id:modUser.id},{$set:{...modUser}},{new:true})
        res.send({message:"user",payload:updatedUser})
    }catch(err){
        res.send({message:"Error",payload:err.message})
    }
})

user.delete('/user/:id',async(req,res)=>{
    try {
        const deleteddoc = await User.findOneAndDelete({id:req.params.id})
        res.send({message:"Deleted User",payload:deleteddoc})
    } catch (err) {
        res.send({
            message:"Error",payload:err.message
        })
    }
})

user.delete('/userById/:_id',async(req,res)=>{
    try {
        const delUser = await User.findOneAndDelete(req.params._id)
        res.send({message:"deleted user",payload:delUser})
    } catch (error) {
        res.send({message:"Error",payload:error.message})
    }
})
module.exports = user;//exporting the api using common js module 