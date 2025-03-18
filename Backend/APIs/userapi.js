const express = require("express")
const userapi = express.Router();

userapi.use(express.json())
const users = [
    {
        id: 1, name: "sharan", age: 18
    },
    {
        id: 2, name: "praneeth", age: 20
    },
    {
        id: 3, name: "prachod", age: 19
    },
    {
        id: 4, name: "krishna", age: 21
    },
    {
        id: 5, name: "haradeep", age: 20
    }
]

userapi.get("/users", (req, res) => {
    res.send({ msg: "LIST of users", payload: users })
})

userapi.get("/user/:id", (req, res) => {

    const userId = Number(req.params.id)

    if (Number.isInteger(userId) && userId > 0) {
        const result = users.find(user => user.id == userId)
        if (result == undefined) {
            res.send({ message: "user is not available" })
        }
        else {
            res.send({ message: "user Details", payload: result })
        }
    }
    else{
        res.send({message:"enter a valid id number"})
    }

})

userapi.post("/user",(req,res)=>{
    const {id, name , age} = req.body;
     if(!id || !name|| !age){
        return res.status(400).send({message:"all inputs are required"})
     }

    const newid = Number(id);
    if(!Number.isInteger(newid)|| newid<=0){
        return res.status(400).send({message:"Id must be greater than 0"})
        
    }
    const result = users.find(user=> user.id === newid)
    if(result){
        return res.status(400).send({message:"User already exists"})
    }
    users.push({id:newid , name :name , age:age})
    res.send({message:"New user created",payload:{id, name, age}})
})

userapi.put("/user",(req,res)=>{
    const {id, name , age} = req.body;
    
     if(!id || !name|| !age){
        return res.status(400).send({message:"all inputs are required"})
     }

    const newid = Number(id);
    if(!Number.isInteger(newid)|| newid<=0){
        return res.status(400).send({message:"Id must be greater than 0"})
    }
    const Userindex = users.findIndex(user=> user.id === newid)
    if(Userindex==-1){
        return res.status(400).send({message:"User doesnt exist"})
    }
    else{
        users[Userindex] = { id: newid, name, age };
        res.send({message:"user updated"})
    }
})

userapi.delete("/users/:id",(req,res)=>{
    const userId = req.params.id;
    const newid = Number(userId);
    const Userindex = users.findIndex(user=> user.id === newid)
    if(Userindex==-1){
        return res.status(400).send({message:"User doesnt exist"})
    }
    else{
        users.splice(Userindex,1)
        res.send({message:"user deleted"})
    }
})

module.exports = userapi;