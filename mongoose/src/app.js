const mongoose  = require("mongoose");

mongoose.connect("mongodb://localhost:27017/PersonalDbs").then(() => console.log("connection is successful")).catch((err) => console.log(err)); // ismain eik path pass kerna hai jo bataiga kay mera jo local db hai wo kaha store hai and then end main db ka naam dena hai aur ager wo db exist nae kerti tou wo create kerdega and ager hogi tou usmain hi kaam chalta rahey ga. Then it returns a promise


// creating schema starts here which is the structure of the document

    // default values, validators, etc..
    const infoSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum 2 letters"],
        maxlength: 30
    },

    ctype: {
        
        type: String,
        required: true,
        lowercase: true,
        enum: ["frontend", "backend", "database"] //course type sirf ye wali user dalay aur koi na ho


    },
    videos:{
     type: Number,
     validate(value) {
        if(value < 0)
        {
            throw new Error("No negative Videos")
        }

        //THIS IS CUSTOM VALIDATION by defining a function
     }
    
    
    },
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
    }
    )
    // creating schema ends here

    // collection creation

    const Info = new mongoose.model("Info", infoSchema);

    // model kay variable ka name and uska first parameter ka name jo collection ka name same wo capital case hona chiye and singul ar form main hona chiye

    // mongoose model is a wrapper on mongoose schema. It defines the structure of document, default values, validators etc

    // mongoose model provides an interface to the db for creating, querying, updating and deleting records

    // Create document or insert


const createDocument = async () => {

try{
    const reactPlayList = new Info({
       name: "React JS",
       ctype: "Front End",
       videos: 80,
       author: "Rehan",
       active: true
       
    })


      const javaScriptPlayList = new Info({
       name: "JavaScript",
       ctype: "Front End",
       videos: 180,
       author: "Rehan",
       active: true
       
    })

  const mongoPlayList = new Info({
       name: "Mongo DB",
       ctype: "Full stack",
       videos: 40,
       author: "Rehan",
       active: true
       
    })


    // const result = await reactPlayList.save(); - single document insertion
    // console.log(result);


const result = await Info.insertMany([javaScriptPlayList, mongoPlayList, reactPlayList]); //multiple document insertion

console.log(result);


    
}
catch(err){
    console.log(err);
}

}

//createDocument(); - isko isiliye comment kiya takay aur documents na banay db main

// Read document method in mongoose starts here

const getDocument = async () => {
   const result =  await Info.find({ctype: "Full stack"}, {ctype: 0}); // this will return a promise so we will use await with it
   console.log(result);
}

// getDocument()

// Read document method in mongoose ends here


// single document insertion starts here 



    // const reactPlayList = new Info({
    //     name: "React JS",
    //     ctype: "Front End",
    //     videos: 80,
    //     author: "Rehan",
    //     active: true
       
    // })

    // reactPlayList.save(); // save the document and this save method returns a promise

    // better to create document using async and wait as .save() returns promise and creation of document works asynchoronous. Promise thora time leta hai ressult denay main lekin eventually deta hai so promise ko bhetar kerne kay liye we need to use async await 

    // single document insertion ends here 

    // Mongoose comparison operator starts here $gt, $gte, $in, $lt, $lte, $ne, $nin

    // Greater than

    const greatherThan = async () => {
   const result =  await Info.find({videos: {$lt: 50}});
   console.log(result);
}

// greatherThan();

// In opertor - means koi specific value array main hai ya nae

  const InOpt = async () => {
   const result =  await Info.find({ctype: {$in: ["Full stack", 
"Front End"]}});
   console.log(result);
}

// InOpt();

    // Mongoose comparison operator ends here

// Monogo logical operator starts here - $and, $not, $nor, $or

// $or - works on 2 ya 2 se ziada arrays par baki sab same hi hai yk



  const OrOpt = async () => {
   const result =  await Info.find({$or: [{ctype: "Front End"}, {author: "Rehan"}]});
   console.log(result);
}

// OrOpt()
    // Mongo logical operator ends here


   // count & sort using mongo
//      const count = async () => {
//    const result =  await Info.find().count();
//    console.log(result);
// }

// count()
    //  sort using mongo

    

     const sort = async () => {
   const result =  await Info.find().sort({name: 1});
   console.log(result);
}

// name:1 means name A se start hokar Z tak jayega (asc order)
// name: -1 means desc order

// sort()

// how to update the documents using Mongoose? use the ID of the document and the vaiable of modal which is Info
// We will use $set operator to update as it replaces the value of field with specified value

const update = async (id) => {
const result = await Info.updateOne({_id: id}, {$set : {
    name: "Drupal Developer"
}}); //this returns a prmomise and _id is the key in document  aur ye filter wala part hai which the first step in updating the document

console.log(result);

}

// update('62fce6d7132c1013afdea15b');

// Delete document using mongoose

const deleteDoc = async (id) => {

const result = await Info.deleteOne({_id: id});


console.log(result)

}

// deleteDoc("62fce6d7132c1013afdea15b");

// always use try and catch with async and await

// Mongoose validation using npm validator through  package which is "npm install validator". ye login form ya sign up form main use hota hai waise. npm se package install kenre kay baad packay ko require kerna hai by using "validator" and then use its methods and tareeka custom validation wala hi hai