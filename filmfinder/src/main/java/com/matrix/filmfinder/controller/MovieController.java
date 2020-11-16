package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "/movie")
public class MovieController {
    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }


    /**
     *
     * @param id
     * @return Movie
     */
    @GetMapping(path = "/get")
    public ResponseEntity<Object> get(@RequestParam Integer id) {
        return new ResponseEntity<>(movieService.getMovieDetail(id), HttpStatus.OK);
    }

    /**
     * search movie
     * @param searchField
     * @param user
     * @param keyword
     * @param sortedBy
     * @param page
     * @param pageSize
     * @param isAscending
     * @param genres
     * @return search result page
     */
    @GetMapping(path = "/search/{search_field}")
    public ResponseEntity<Object> search(@PathVariable("search_field") String searchField,
                                         @RequestParam User user,
                                         @RequestParam String keyword,
                                         @RequestParam(name = "sorted_by") String sortedBy,
                                         @RequestParam Integer page,
                                         @RequestParam(name = "page_size") Integer pageSize,
                                         @RequestParam(name = "is_ascending") Boolean isAscending,
                                         @RequestParam List<Integer> genres) {
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

    /**
     * recommend movie
     * @param user
     * @param movie
     * @return movie lists
     */
    @GetMapping(path = "/recommend")
    public ResponseEntity<Object> recommend(@RequestParam User user, @RequestParam Movie movie) {
        try {
            return new ResponseEntity<>(
                    movieService.recommend(user, movie),
                    HttpStatus.OK
            );
        } catch (ResponseStatusException e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    e.getStatus()
            );
        }
    }
}
