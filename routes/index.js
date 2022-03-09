const bcrypt = require('bcryptjs');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport =require("passport");
const {checkAuthentication,checkLogin} = require("../config/authentication");
const User = require("../models/seeker");
const recruiters = require("../models/recruiters");

router.get(
    "/",
    checkLogin,
    (req,res) => {
        res.render("homePage");
    }
);

router.get(
    "/login_interviewee",
    checkLogin,
    (req,res) => {
        res.render("login_interviewee");
    }
)

router.post(
    "/login_interviewee",
    checkLogin,
    (req, res, next) => {
        passport.authenticate
        (
            'local',
            {
                successRedirect: '/home/interviewee_dashboard',
                failureRedirect: '/login_interviewee',
                failureFlash: true
            }
        )(req, res, next);
    }
)

router.get(
    "/login_recruiter",
    (req,res) => {
        res.render("login_recruiter");
    }
)

router.get(
    "/recruiter_dashboard",
    (req,res) => {
        res.render("recruiter_dashboard")
    }
)

router.post(
    "/login_recruiter",
    async(req, res, next) => {
        try{
            const recruiter = await recruiters.findOne({name:req.body.name});
            email = recruiter.email;
            id = recruiter.id;
            if(recruiter.id === req.body.id && recruiter.email===req.body.email ){
                res.redirect("/recruiter_dashboard")
                
            }
        }catch (error) {
            res.redirect("/login_recruiter")
        }
        

    }
)

router.get(
    "/logoutrecruiter",
    (req,res) => {
        res.render("homepage")
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