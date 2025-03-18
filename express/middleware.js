const express = require("express")
const app = express();

function authentication(req, res , next){
    const user = req.headers.user;
    const password = req.headers.password;
    
    if(user != "praneeth" || password!="hello"){
        res.status(400).json({
            msg:"Invalid credentials"
        })
    }
    else{
        next();
    }
}

function kidneycheck(req,res,next){
    const kidneys = req.query.kidneys;
    if(kidneys!=2 && kidneys!=1){
        res.status(400).json({
            msg:"Invalid inputs"
        })
    }
    else{
        next();
    }
}
app.get("/health-checkup", authentication, kidneycheck, function(req, res){
    res.json({
        msg:"Your kidneys are fine"
    })
    res.send("Bravo");
    return;
});
app.listen(3000)
