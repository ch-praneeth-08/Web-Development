const express = require("express")
const app = express();

app.get("/", function(req,res){
    const user = req.headers.user;
    const password = req.headers.password;
    const kidneys = req.query.kidneys;

    if(user == "praneeth" && password == "pass" ){
        if(kidneys==1 || kidneys ==2){

            res.send("Your kidneys are fine");
            return;
        }
        else{
            res.send("Your inputs are wrong !");
            return;
        }

    }
    else{
        res.status(400).json({
            msg:"Invalid credentials"
        })
        return;
    }
    
})
app.listen(3000);