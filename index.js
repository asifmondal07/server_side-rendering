const express=require("express");
const cookieParser=require("cookie-parser")
const URLrouter=require("./routes/url");
const path=require("path");
const staticRouter=require("./routes/static_routes");
const userRouter=require("./routes/user");
const {restrictToLoggedinUserOnly}=require("./middileware/auth")
const {connectMongodb}=require("./connection/connect");
const { clear } = require("console");

const app=express();

const PORT =8000;


connectMongodb("mongodb://localhost:27017/short-url").then(()=>console.log("connected mongodb"));

app.set("view engine","ejs");
app.set("vies",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));  //get data from in home page
app.use(cookieParser());   //set cookie


app.use("/url",restrictToLoggedinUserOnly,URLrouter);
app.use("/user",userRouter);
app.use("/",staticRouter);


app.listen(PORT,()=> console.log("SERVER START",PORT))