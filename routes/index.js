const bcrypt = require('bcryptjs');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport =require("passport");
const {checkAuthentication,checkLogin} = require("../config/authentication");
const User = require("../models/user");

router.get(
    "/",
    checkLogin,
    (req,res) => {
        res.render("homePage");
    }
);

router.get(
    "/login",
    checkLogin,
    (req,res) => {
        res.render("login");
    }
)

router.post(
    "/login",
    checkLogin,
    (req, res, next) => {
        passport.authenticate
        (
            'local',
            {
                successRedirect: '/user/dashboard',
                failureRedirect: '/login',
                failureFlash: true
            }
        )(req, res, next);
    }
)

router.get(
    "/register",
    checkLogin,
    (req,res) => {
        res.render("register");
    }
)

router.post(
    "/register",
    checkLogin,
    (req,res,next) => {
        const {username,password,email} = req.body;
        
        let errors = []

        if (!username)
            errors.push("Please enter an username")
        if (!password)
            errors.push("Please enter a password")
        if (!email)
            errors.push("Please enter an email")
        
        if (errors.length>0)
            res.render(
                "register",{
                    errors,
                    username,
                    email,
                    password
                }
            );

        else{
            User.findOne(
                {
                    email:email
                }
            ).then(
                (user) => {
                    if (user){
                        errors.push("That email has been used")
                        res.render(
                            "register",
                            {
                                errors,
                                username,
                                email,
                                password
                            }
                        );
                    }
                    else{
                        const newUser = new User
                        (
                            {
                                username,
                                email,
                                password
                            }
                        )
                    
                        bcrypt.hash(
                            newUser.password,
                            10,
                            (err,hash) => {
                                if(err)
                                    throw err;
    
                                newUser.password = hash;
                                newUser.save().then(
                                    (user,req) => {
                                        res.redirect("/login")
                                    }
                                )
                            }
                            );
                    }

                    
                }
            )
        }
    }
)

router.get(
    '/logout',
    checkAuthentication,
    (req, res) =>
    {
        req.logOut();
        res.redirect("/");
    }
)


module.exports = router;