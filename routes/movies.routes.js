const express = require('express');
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")



router
    .route("/create")
    .get(async (req, res)=>{
        try{
            const allCelebs = await Celebrity.find()
            res.render("movies/new-movie.hbs", {allCelebs})

        }catch(error){
            console.log(error)
        }
    })
    .post(async (req,res)=>{
        try{
        const {title, genre, plot, cast} = req.body
        const newMovie =await Movie.create({title, genre, plot, cast})
        res.redirect("/movies")
        }catch(error){
            console.log(error)
        }

    })

    router.get("/delete/:id",(req, res)=>{
        Movie.findByIdAndDelete(req.params.id)
        .then(() => res.redirect("/movies"))
        .catch(error=> console.log(error))
      })

    router.get("/", (req,res)=>{
        Movie.find().populate("cast")
        .then((movies)=>{
            res.render("movies/movies", {movies})
        })
        
    })




module.exports = router;