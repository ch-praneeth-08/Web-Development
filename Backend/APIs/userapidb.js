const express = require("express")
const userapi = express.Router();

userapi.use(express.json())


userapi.get("/users", async(req, res) => {
  const usersobj = req.app.get("usersobj")
  //find returns database cursor
  //cursor to array using toArray() method
    const userslist = await usersobj.find().toArray()

    res.send({message:"users",payload:userslist})
})

userapi.get("/user/:id", async (req, res) => {
    const usersobj = req.app.get("usersobj")

    const userId = Number(req.params.id)
    const user = await usersobj.findOne({id:userId})
    res.send({
        message:"users",payload:user
    })
})

userapi.post("/user",async(req,res)=>{
  const usersobj = req.app.get("usersobj")
    const newUser = req.body;
    await  usersobj.insertOne(newUser);
    res.send({message:"new user created"})
})

userapi.put("/user",async(req,res)=>{
  const usersobj = req.app.get("usersobj")
    
  const Moduser = req.body;
  let dbres = await usersobj.updateOne({id:Moduser.id},{$set:{...Moduser}})
    if(dbres.modifiedCount == 1){
        res.send({message:"user updated"})
    }
    else{
        res.send({message:"user not modified"})
    }

})

userapi.delete("/users/:id",async(req,res)=>{
  const usersobj = req.app.get("usersobj")
    const userId = Number(req.params.id)
    let dbres = await usersobj.deleteOne({id:userId})
    if(dbres.deletedCount ==1){
        res.send({message:"user deleted"})
    }
    else{
        res.send({message:"user not deleted"})
    }
})

module.exports = userapi;