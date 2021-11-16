const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");

//Celebrities create
router.get("/create", (req,res)=>{
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res)=>{
 
    const {name, occupation, catchPhrase}  = req.body
    Celebrity.create({name, occupation, catchPhrase} )
    .then(celebrity=>{
      console.log(celebrity)
      res.redirect("/celebrities")
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/celebrities/new-celebrity.hbs")

    });
})

router.get("/", (req,res)=>{
    Celebrity.find()
    .then((celebrities)=>{
        res.render("celebrities/celebrities", {celebrities})
    })
    
})


module.exports = router;