const express = require("express");
const mongoose =  require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors")

const userRouter = require("./Router/user");

dotenv.config();

const app = express();

app.use(cors({
    origin:"*",
}));


app.use(express.json());

mongoose.connect(process.env.DB_URL)
.then(()=> console.log("db connected Succesfully"))
.catch((err) => console.error(err));

app.use("/api/v1/user",userRouter);

app.listen(process.env.PORT, ()=>{
    console.log("port is running up on 10000");
})