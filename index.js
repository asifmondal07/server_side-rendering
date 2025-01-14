const express=require("express");
const cookieParser=require("cookie-parser")
const URLrouter=require("./routes/url");
const path=require("path");
const staticRouter=require("./routes/static_routes");
const userRouter=require("./routes/user");
const {checkForAuthorization,
    restrictTo}=require("./middileware/auth")
const {connectMongodb}=require("./connection/connect");
const { clear } = require("console");

const app=express();

const PORT =8000;


connectMongodb("mongodb://127.0.0.1:27017/short-url",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000}) // Timeout after 5s instead of 30s
    .then(()=>console.log("connected mongodb"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));  //get data from in home page
app.use(cookieParser());   //set cookie
app.use(checkForAuthorization);


app.use("/url",restrictTo(["NORMAL"]),URLrouter);
app.use("/user",userRouter);
app.use("/",staticRouter);


app.listen(PORT,()=> console.log("SERVER START",PORT))