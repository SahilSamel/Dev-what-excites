const mongoose = require("mongoose");


const recruiterSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type:String, required:true},
    id:{type:String, required:true},
    company:{type:String, required:true},
    phone:{type:String, required:true},
    gender:{type:String, enum:"Male"||"Female"||"Other", required:true}
});

module.exports = mongoose.model("recruiter",recruiterSchema);