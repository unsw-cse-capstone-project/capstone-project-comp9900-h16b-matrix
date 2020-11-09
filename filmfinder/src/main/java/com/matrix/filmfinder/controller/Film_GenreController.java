package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.Film_GenreRepository;
import com.matrix.filmfinder.dao.GenreRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.model.Genre;
import com.matrix.filmfinder.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/filmgenre")
public class Film_GenreController {
    Film_GenreRepository film_genreRepository;
    MovieRepository movieRepository;
    GenreRepository genreRepository;
    @Autowired
    public Film_GenreController(Film_GenreRepository film_genreRepository, MovieRepository movieRepository, GenreRepository genreRepository){
        this.film_genreRepository=film_genreRepository;
        this.movieRepository=movieRepository;
        this.genreRepository = genreRepository;
    }

    @PostMapping(path = "add")
    public ResponseEntity<Object> addFilmGenre(
            @RequestParam Movie movie,
            @RequestParam Genre genre
            ){
        
    }
}
