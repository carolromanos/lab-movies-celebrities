const express = require('express');
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

//MOVIE CREATION

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

    //MOVIE EDITION
    router
    .route("/:id/edit")
    .get(async (req, res)=>{
        try{
            const allCelebs = await Celebrity.find()
            const movie = await Movie.findById(req.params.id)
            res.render("movies/edit-movie.hbs", {allCelebs, movie: movie})

        }catch(error){
            console.log(error)
        }
    })
    .post(async (req,res)=>{
        try{
        const movieId = req.params.id
        const {title, genre, plot, cast} = req.body
        const foundMovie = await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast})
        .populate("cast")
        res.redirect("/movies")
        }catch(error){
            console.log(error)
        }

    })


    //MOVIE DELEETE

    router.post("/:id/delete", (req,res)=>{
        console.log("hola")
        const movieId= req.params.id
        Movie.findByIdAndDelete(movieId)
        .then(deletedMovie => res.redirect("/movies"))
        .catch(error=> console.log(error))
      
    })

    //MOVIE DETAILS
    router.get("/:id", (req,res)=>{
        const movieId = req.params.id
        Movie.findById(movieId).populate("cast")
        .then((movies)=>{
            res.render("movies/movie-details", movies)
        })
    })

    router.get("/", (req,res)=>{
        Movie.find()
        .populate("cast")
        .then((movies)=>{
            res.render("movies/movies", {movies})
        })
        
    })




module.exports = router;