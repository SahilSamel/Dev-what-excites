const mongoose = require("mongoose");
// const Diary = require("../models/diary").schema;

const seekerSchema = new mongoose.Schema({
    username:{type: String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    phone:{type:String},
    address:{type:String},
    domain:{type:String},
    past_jobs:[
        {type:String}
    ],
    gender:{type:String, enum:"Male"||"Female"||"Other"}
});

module.exports = mongoose.model("seeker",seekerSchema);