const express = require("express")
const zod = require("zod")
const app = express();

app.use(express.json())

const schema = zod.object(
    {
        name: zod.string().min(8),
        age : zod.number(),
        email:zod.string().email(),
        country:zod.literal("IN").or(zod.literal("US"))
    }
)
app.post("/health",function(req,res){
    const details = req.body.details;
    const response = schema.safeParse(details);
    if(!response.success){
        res.status(411).json({
            msg:"Input is Invalid"
        })
    }else{
        res.send({
            response
        })
    }
})

app.listen(3000)