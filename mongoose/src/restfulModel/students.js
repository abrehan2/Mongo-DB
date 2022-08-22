// Defining the schema for student dbs

const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({

name: {
    type: String,
    required: true,
    minlength: 3
},

email: {
    type: String,
    required: true,
    unique: [true, "Email already exist"],
    validate(value) {
    if(validator.isEmail(value))
    {
        throw new Error("Invalid Email")
    }
    }
},

phone: {
    type: Number,
    required: true,
   },

address: {
    type: String,
    required: true
}

})

// We need to create a collection after defining a model and schema

const Student = new mongoose.model("Student", studentSchema);


module.exports = Student;