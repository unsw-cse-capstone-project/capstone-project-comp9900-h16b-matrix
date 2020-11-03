package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.Movie;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.sql.SQLDataException;
import java.util.List;

@Controller
@RequestMapping(path = "/movie")
public class MovieController {
    private MovieRepository movieRepository;
    private CommentRepository commentRepository;

    public MovieController(MovieRepository movieRepository, CommentRepository commentRepository) {
        this.movieRepository = movieRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping(path = "/get")
    public ResponseEntity<Movie> getMovieDetail ( @RequestParam String tmdb_id) {
        Movie movie = new Movie();


        movie = movieRepository.findMovieByTmdb_id(tmdb_id);
        if (movie == null) {
            movie = new Movie(tmdb_id);
            movieRepository.save(movie);
        }
        movie.incN_hits();
        movieRepository.save(movie);


//        try {
//            movieJson = objectMapper.writeValueAsString(movie);
//        } catch (Exception ej) {
//            return new ResponseEntity<>(
//                    "Movie json generator screwed",
//                    HttpStatus.INTERNAL_SERVER_ERROR
//            );
//        }
        return new ResponseEntity<>(
                movie,
                HttpStatus.OK
        );
    }
    @PostMapping(path = "/update")
    public ResponseEntity<Object> updateDetail(@RequestBody String detailJson) {
        ObjectMapper mapper = new ObjectMapper();
        Movie payload = new Movie();
        try {
            payload = mapper.readValue(detailJson, Movie.class);
        } catch (IOException em) {
            return new ResponseEntity<>(
                    "Haha detailJson reading error!!!",
                    HttpStatus.BAD_REQUEST
            );
        }
        try {
            Movie movie = movieRepository.getOne(payload.getId());
            movie.setDescription(payload.getDescription());
            movie.setPoster(payload.getPoster());
            movieRepository.save(movie);
            return new ResponseEntity<>(
                    movie,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Haha, couldn't get such a fucking movie when update movie detail you fucker!!!",
                    HttpStatus.BAD_REQUEST
            );

        }

    }

}
