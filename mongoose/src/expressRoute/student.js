const express = require("express");
const Student = require("../restfulModel/students");

const router = new express.Router();

// router.get("/Home", (req, res) => {
//     res.send("This is a Home Page");
// });


router.post("/students", (req, res) => {

const user  = new Student(req.body); 

// console.log(req.body)

user.save().then(() => {
    res.status(201).send(user); 
}).catch((err) => {
    res.status(400).send(err); 
}); 



})

router.get("/students", async (req, res) => {

try{

const result = await Student.find(); 

res.send(result); 

}

catch(e){
res.send(e);
}


});

router.patch("/students/:id", async (req, res) => {

try{
const id = req.params.id;
const result = await Student.findByIdAndUpdate(id, req.body, {
    new: true
});
res.send(result)

}
catch(e) {
res.status(404).send(e)
}

})

router.patch("/students/:id", async (req, res) => {

try{
const id = req.params.id;
const result = await Student.findByIdAndUpdate(id, req.body, {
    new: true
});
res.send(result)

}
catch(e) {
res.status(404).send(e)
}

})


router.delete("/students/:id", async (req, res) => {

try{
    const deleteStd = await Student.findByIdAndDelete(req.params.id);


if(!req.params.id)
{
    return res.status(400).send()
}

res.send(deleteStd)


} catch(e)
{
    res.status(500).send(e)
}


})



module.exports = router;