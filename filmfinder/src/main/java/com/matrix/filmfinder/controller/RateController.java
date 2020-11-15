package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.RateRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.message.RateMessage;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Rate;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.services.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/rate")
public class RateController {
    private RateRepository rateRepository;
    private MovieRepository movieRepository;
    private UserRepository userRepository;
    private RateService rateService;

    @Autowired
    public RateController(RateRepository rateRepository, MovieRepository movieRepository, UserRepository userRepository, RateService rateService) {
        this.rateRepository = rateRepository;
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
        this.rateRepository = rateRepository;
        this.rateService = rateService;
    }


    @PostMapping(path="/add")
    public ResponseEntity<Object> addRate(
            @RequestParam User user,
            @RequestParam Movie movie,
            @RequestParam Integer rating)
    {
        Rate rate = new Rate();
        rate.setUser(user);
        rate.setMovie(movie);
        rate.setRating(rating);
        rateRepository.save(rate);
        return new ResponseEntity<>(
                rate,
                HttpStatus.OK
        );
    }

    //    update
    @PutMapping(value = "/update")
    public ResponseEntity<Object> updateRate(@RequestParam User user,
                                             @RequestParam Movie movie,
                                             @RequestParam Integer rating){

       Rate rate = new Rate();

       try {
           rate = rateRepository.getRateByUserAndMovie(user, movie);

       } catch (NoResultException e) {
           return new ResponseEntity<>(
                   "No result for " + user.getId() + " in movie " + movie.getId(),
                   HttpStatus.NOT_FOUND
           );
       }

       rate.setRating(rating);
       try {
           rateRepository.save(rate);
       } catch (IllegalArgumentException ie){
           return new ResponseEntity<>(
                   "rate update error",
                   HttpStatus.INTERNAL_SERVER_ERROR
           );
       }
       return new ResponseEntity<>(
               rate,
               HttpStatus.OK
       );
    }
    @GetMapping(value = "/getAvg")
    public ResponseEntity<Object> getAverageRateOfMovie(@RequestParam User user, @RequestParam Movie movie) {
        try {
           return new ResponseEntity<>(
                   rateService.getAvgRate(user, movie).toString(),
                   HttpStatus.OK
           );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    ee.getMessage(),
                    HttpStatus.NOT_FOUND
            );
        }
    }
    @GetMapping(value = "/get")
    public ResponseEntity<Object> getRateByUserAndMovie(@RequestParam Movie movie, @RequestParam User user ) {
        try {
            Rate rate = rateRepository.getRateByUserAndMovie(user, movie);
            return new ResponseEntity<>(
                    rate,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "getRateByUserAndMovie failure -- EntityNotFound",
                    HttpStatus.NOT_FOUND
            );
        }

    }
    @GetMapping(value = "/getAll")
    public ResponseEntity<Object> getAll(@RequestParam Movie movie) {
        Double avg = rateRepository.getAvgOfRateByMovie(movie);
        Integer count = rateRepository.countRatesByMovie(movie);
        // List<Integer> rates = [oneStars, twoStars, threeStars, fourStars, fiveStars]
        List<Integer> rates = new ArrayList<>();
        for (int i = 1; i < 6; i++) {
           rates.add(rateRepository.countRatesByRating(i));
        }
        RateMessage rm = new RateMessage(rates, avg, count);
        return new ResponseEntity<>(
                rm,
                HttpStatus.OK
        );
    }
}
