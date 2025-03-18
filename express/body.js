const express = require("express")
const app = express();
app.use(express.json())
let errorcount =0;
app.post("/health",function(req,res){
    const kidneys = req.body.kidneys;
    const kidneyNo = kidneys.length + 1;

    res.send("You have " +kidneyNo + " kidneys");
})




// to catch all the exceptions we need to have a middleware at last that takes four inputs , if an exception arises the control reaches the function and fuction executes
//these are called error handling middlewares.
app.use(function(err,req,res,next){ 

    // console.log(err);            to log in the error in console for debugging

    res.status(500).send("An internal server error occured")
})

app.listen(3000)