package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.GenreRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.model.Genre;
import com.matrix.filmfinder.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping(path = "/genre")
public class GenreController {
    private GenreRepository genreRepository;
    private MovieRepository movieRepository;
    @Autowired
    public GenreController(GenreRepository genreRepository, MovieRepository movieRepository){
        this.genreRepository=genreRepository;
        this.movieRepository=movieRepository;
    }

    @PostMapping(path = "/add")
    public ResponseEntity<Object> addGenre(@RequestParam Movie m_genre){
        try{
            Genre genre = new Genre();
            genre.setGenre(m_genre);
            return  new ResponseEntity<>(
                    genre,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.NOT_FOUND
            );
        }
    }
}
