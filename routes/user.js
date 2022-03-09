const express = require("express");
const User = require("../models/user");
const Diary = require("../models/diary");
const mongoose = require("mongoose");
const router = express.Router();
const passport =require("passport");
const {checkAuthentication,checkLogin} = require("../config/authentication");


router.get(
    "/dashboard",
    checkAuthentication,
    (req, res) => {
        res.render("dashboard", {username: req.user.username})
    }
)

module.exports = router;