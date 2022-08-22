// creating DB connection for mongoose

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentsApi").then((result) => {
    console.log("Connection with DB is successful");
}).catch((err) => {
    console.log("Connection with DB is unsuccessful")
});