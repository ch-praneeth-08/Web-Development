const express = require("express");
const { MongoClient } = require("mongodb");

const app = express(); // default export
app.use(express.json());

const mongoURL = "mongodb://localhost:27017";

async function startServer() {
    try {
        const mclient = await MongoClient.connect(mongoURL);
        console.log("DB connection success....");

        const obj = mclient.db("practice");
        const usersobj = obj.collection("users");
        const productsobj = obj.collection("products");

        // Store collections in app locals for access in routes
        app.set("usersobj", usersobj);
        app.set("productsobj", productsobj);

        // Import routes after DB connection is established
        const userapi = require("./APIs/userapidb.js");
        const productApi = require("./APIs/productsapi.js");

        app.use("/user-api", userapi);
        app.use("/product-api", productApi);

        app.listen(3000, () => {
            console.log("Server running on port 3000...");
        });

    } catch (err) {
        console.error("Error in connecting to DB:", err);
        process.exit(1); // Exit process on DB connection failure
    }
}

startServer();
