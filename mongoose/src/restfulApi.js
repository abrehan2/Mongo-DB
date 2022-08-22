// Representational state transfer API

// Software that allows two applications to communicate with each other over the internet and through various devices

// we need 2 things to create restful api - 1) https verbs like post, get, put/patch and delete 2) ager apko kuch bhi request kerna ho restful apis kay through tou apke end points change nae honay chiye ager kuch change hoga tou wo apke https methods honge e.g http://google.com/api/users (/api/users is the end point)

//  CREATING YOUR OWN REST FUL API - ager apko restful api create kerna hai then we have crud operation

// rstApi kehta hai apka path same hona chiye

// CREATE ----> POST
// READ   ----> GET
// UPDATE ----> PUT/PATCH
// DELETE ----> DELETE

// END POINT IS /api/users

// npm init -y ----> package.json file ko initalize kerta hai
// install express ----> npm install express
// install mongoose ----> npm install mongoose
// install mongoose validator ----> npm install validator

// install nodemon - npm install -g nodemon and npm install --save-dev nodemon

// npm i bcryptjs --> hashes the password

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

require("./restfulDb/conn"); //requiring the db connection

const student = require("./restfulModel/students"); //requiring a collection

app.use(express.json()); // ye post & put req kay liye kerna hoga cos the incoming request object is json object and we need to convert it into js object. this methid is called middleware

// Create routes

// Register a student using post method

// app.post("/students", (req, res) => {

// const user  = new student(req.body); // jo bhi postman main likha hai server per bhejne kay liye wo idher likha ayega in the form of json obj

// console.log(req.body)

// user.save().then(() => {
//     res.status(201).send(user); // ager data store hota hai db main tou humain ye wala data dekhe ga
// }).catch((err) => {
//     res.status(400).send(err); // ager data na store huwa tou we need to check the error 
// }); //saves the data in db



// })


// SAME UPPER WALI POST REQ USING ASYNC & AWAIT

// app.post("/students", async (req, res) => {

// try{

// const user = new student(req.body);
// const createUser = await user.save();
// res.status(201).send(user);
// }

// catch(e){
//     res.status(400).send(e)}

// })



// server ki jo port hum likhte hai wo server ko directly samhaj nae ati tou humain manually port create kerni hogi

// req.body helps in getting the data
// POST STATUS CODE IS 201


// Get data from server

// app.get("/students", async (req, res) => {

// try{

// const result = await student.find(); //find method se we read the data from db

// res.send(result); // here we get the data to read

// }

// catch(e){
// res.send(e);
// }


// });

// Get individual data from server

// app.get("/students/:id", async (req, res) => {

// try{

// const id = req.params.id;

// // console.log(req.params.id)
// const result = await student.findById(id);

// console.log(result);

// if(!result)
// {
//     return res.status(404).send()
// }

// else{
    
//     res.send(result);
// }


// }
// catch(e){
// res.send(e);
// }


// })

// PUT REQUEST through API
// Update students by id

// app.patch("/students/:id", async (req, res) => {

// try{
// const id = req.params.id;
// const result = await student.findByIdAndUpdate(id, req.body, {
//     new: true
// });
// res.send(result)

// }
// catch(e) {
// res.status(404).send(e)
// }

// })

// new: true - means jo bhi databody main ayega wo first time main hi updated ayega

// Add express router in restFul API. Express routing main aap route ko separate file main rakhte ho and isko phir require kerte ho

//1- create a new router

// const router = new express.Router();

// 2- we need to define the router

// router.get("/Home", (req, res) => {
//     res.send("This is a Home page")
// })

// 3 - register the router

const router = require("./expressRoute/student"); // getting the step 1 and 2

app.use(router);

// Ab main ye chaho ga kay step 1 and 2 separate file main ho and instead of app hum router use keray upper http verbs kay sath and phir hum un steps ko idher require keray ge

app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
});