const express = require("express");
const mongoose = require("mongoose");
const Router = require("./router")


const PORT = 5000;
const DB_URL = "mongodb+srv://romanovskyi2137:2137@node-js-practice.dl3l1b2.mongodb.net/";

const app = express();

app.use(express.json())
app.use("/api", Router)


app.get("/", (req, res) => {
    console.log(req.query)
    res.status(200).json("server is working ")
})


const startApp = async () => {
    try{
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`server is working on port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
};


startApp()

