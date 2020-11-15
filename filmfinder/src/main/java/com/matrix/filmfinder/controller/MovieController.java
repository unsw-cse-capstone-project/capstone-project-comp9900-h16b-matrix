package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.message.GenresWrapper;
import com.matrix.filmfinder.model.Genre;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.Predicate;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/movie")
public class MovieController {
    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }



    @GetMapping(path = "/get")
    public ResponseEntity<Object> get(@RequestParam Integer id) {
        return new ResponseEntity<>(movieService.getMovieDetail(id), HttpStatus.OK);
    }
//    @GetMapping(path = "/search/title")
//    public ResponseEntity<Object> searchByTitle(@RequestParam String keyword,
//                                                @RequestParam String sorted_by,
//                                                @RequestParam Integer page,
//                                                @RequestParam Boolean isAscending
//    ) {
//        return new ResponseEntity<>(
//                movieService.searchMovieWithTitle(keyword, sorted_by, page, 16, isAscending),
//                HttpStatus.OK
//        );
//    }
//    @GetMapping(path = "/search/description")
//    public ResponseEntity<Object> searchByDescription(@RequestParam String keyword,
//                                                      @RequestParam String sorted_by,
//                                                      @RequestParam Integer page,
//                                                      @RequestParam Boolean isAscending) {
//       return new ResponseEntity<>(
//               movieService.searchByDescription(keyword, sorted_by, page, 16, isAscending),
//               HttpStatus.OK
//       );
//    }
    @GetMapping(path = "/search/{search_field}")
    public ResponseEntity<Object> search(@PathVariable("search_field") String searchField,
                                         @RequestParam User user,
                                         @RequestParam String keyword,
                                         @RequestParam(name = "sorted_by") String sortedBy,
                                         @RequestParam Integer page,
                                         @RequestParam(name = "page_size") Integer pageSize,
                                         @RequestParam(name = "is_ascending") Boolean isAscending,
                                         @RequestParam List<Genre> genres) {
        try {
            return new ResponseEntity<>(
                    movieService.searchMovie(user, keyword, searchField, genres, sortedBy, page, pageSize, isAscending),
                    HttpStatus.OK
            );
        } catch (ResponseStatusException e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    e.getStatus()
            );
        } catch (Exception ee) {
            return new ResponseEntity<>(
                    ee.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
