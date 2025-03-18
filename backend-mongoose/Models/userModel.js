const mongoose = require('mongoose')

//user Schema using mongoose
const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        maxLength:10
    },
    age:{
        type:Number,
        required: true,
        min : 25
    }
})

//create model (constructor)
const User = mongoose.model('user',userSchema)
module.exports = User;//exporting the user model 