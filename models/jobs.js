const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    company:{type:String, required:true},
    domain:{type:String, required:true},
    CTC:{type:Integer},
    requirements:{type:String,required:true}
});

module.exports = mongoose.model("jobs",jobSchema);