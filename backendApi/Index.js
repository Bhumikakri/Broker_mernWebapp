const express = require("express");
const mongoose =  require("mongoose");
const dotenv = require("dotenv");
let cookieParser = require("cookie-parser");

const cors = require("cors");

const userRouter = require("./Router/user");
const propertyRouter = require("./Router/property");

dotenv.config();

const app = express();

app.use(cors({
    origin:"*",
}));

app.use(cookieParser());

app.use(express.json());

mongoose.connect(process.env.DB_URL)
.then(()=> console.log("db connected Succesfully"))
.catch((err) => console.error(err));

app.use("/api/v1/user",userRouter);
app.use('/api/v1/property', propertyRouter);

app.listen(process.env.PORT, ()=>{
    console.log("port is running up on 10000");
})