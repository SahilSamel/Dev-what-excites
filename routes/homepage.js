const express = require("express");
const User = require("../models/seeker");

const mongoose = require("mongoose");
const router = express.Router();
const passport =require("passport");
const {checkAuthentication,checkLogin} = require("../config/authentication");


router.get(
    "/interviewee_dashboard",
    checkAuthentication,
    (req, res) => {
        res.render("interviewee_dashboard", {username: req.user.username})
    }
)

router.get(
    "/profile",
    checkAuthentication,
    (req,res) => {
        res.render("profile",{username: req.user.username})
    }
)



module.exports = router;