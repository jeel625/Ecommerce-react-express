const port = 4000;
const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); // The id: greatstackdev pass:pateljeel625
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { error } = require("console");


app.use(express.json());
app.use(cors());


// Database Connecion with mongoDB
mongoose.connect("mongodb+srv://greatstackdev:pateljeel625@cluster0.w0piefz.mongodb.net/e-commerce");

// API Creation

app.get("/",(req,res) => {
    res.send("Express App is Running");
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images/',
    filename:(req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating upload endpint for images

app.use('/images',express.static('upload/images/'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema for Creating the products

const Product = mongoose.model("Product",{
    id: {
        type: Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    },
})

// Schema creating for User Model

const Users = mongoose.model("Users",{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        Default:Date.now(),
    }
})


// Creating Endpoint for registering the User
app.post('/signup',async (req,res) => {
    let check = await Users.findOne({email:req.body.email});

    if(check){
        return res.status(400).json({success:false,erros:"existing user found with same email address"})
    }

    let cart = {};
    for(let i = 0 ; i < 300; i++)
    {
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

//Creating endpoint for the user login

app.post('/login',async (req,res) => {

    console.log(req.body.password);
    let user = await Users.findOne({email:req.body.email});
    
    if(user){
        if(user.password){
            const passCompare = req.body.password === user.password;
            if(passCompare){
                const data = {
                    user:{
                        id:user.id
                    }
                }
                const token = jwt.sign(data,'secret_ecom') //You have to use the same "secret_ecom" because you have used that in the sing up for creating the tokens.
                res.json({success:true,token});
            }
            else{
                res.json({success:false,error:"Wrong password"});
            }
        }
        else{
            res.json({success:false,error:"There is no password for the user"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email Id"});
    }
})


//Add product

app.post('/addproduct',async (req,res)=> {

    let products = await Product.find({});
    let id;

    if(products.length>0)
    {
        let last_product_array = products.slice(-1); // if there is array of products then it will only take last product, that is why we using the slice method
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else
    {
        id=1;
    }

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);

    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name
    })
})


// Creating the product for deleting the product

app.post('/removeproduct',async (req,res) =>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// Creating API for getting all products
app.get('/allproducts',async (req,res) => {
    let products = await Product.find({});
    console.log("All products Fetched");
    res.send(products);
});

app.listen(port,(error) => {
    if(!error)
    {
        console.log("Server Running on Port "+ port);
    }
    else
    {
        console.log("Error : "+error);
    }
});
