const express = require("express")
const productApi = express.Router();

productApi.use(express.json())

productApi.get("/products", async (req, res) => {
    const productsobj = req.app.get("productsobj")

    const productslist = await productsobj.find().toArray();

    res.send({ message: "products", payload: productslist })

})


productApi.get("/product/:id", async (req, res) => {
    const productsobj = req.app.get("productsobj")
    const productId = Number(req.params.id)
    const product = await productsobj.findOne({ id: productId })
    res.send({ message: "product", payload: product })
})


productApi.post("/product", async (req, res) => {
    const productsobj = req.app.get("productsobj")
    const newProduct = req.body;
    await productsobj.insertOne(newProduct)
    res.send({ message: "new product created" })
})


productApi.put("/product",async (req,res)=>{
    const productsobj = req.app.get("productsobj")
    const modProduct = req.body;
    const dbres = await productsobj.updateOne({id:modProduct.id},{$set:{...modProduct}})
    if(dbres.modifiedCount ==1 ){
        res.send({message:"product updated"})
    }
    else{
        res.send({message:"product not updated"})
    }
})


productApi.delete("/product/:id",async(req,res)=>{
    const productsobj = req.app.get("productsobj")
    const productId = Number(req.params.id);
    const dbres = await productsobj.deleteOne({id:productId})
    if(dbres.deletedCount ==1){
        res.send({message:"product deleted"})
    }
    else{
        res.send({message:"product not deleted"})
    }
})
module.exports = productApi;
