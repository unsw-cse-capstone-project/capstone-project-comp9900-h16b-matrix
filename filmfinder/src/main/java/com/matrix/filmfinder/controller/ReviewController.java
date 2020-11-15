package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.matrix.filmfinder.dao.*;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewLike;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/review")
public class ReviewController {
    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private MovieRepository movieRepository;
    private ReviewLikeRepository reviewLikeRepository;
    private BlacklistRepository blacklistRepository;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository, MovieRepository movieRepository, ReviewLikeRepository reviewLikeRepository, BlacklistRepository blacklistRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.reviewLikeRepository = reviewLikeRepository;
        this.blacklistRepository = blacklistRepository;
    }

    // get all review by movie_id
    @GetMapping(path = "getall")
    public ResponseEntity<Object> getReviewsByMovieid(@RequestParam Movie movie_id){
        try {
            List<Review> reviews = reviewRepository.findReviewsByMovie(movie_id);
            return new ResponseEntity<>(
                    reviews,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Cannot find entity when get reviews by movie_id",
                    HttpStatus.NOT_FOUND
            );
        }
    }

    // get data
    @GetMapping(path = "get")
    public ResponseEntity<Object> findReviewByUserAndMovie(@RequestParam User user, @RequestParam Movie movie){
        try {
            Review review = reviewRepository.getByUserAndMovie(user,movie);
            return new ResponseEntity<>(
                    review,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Not Found",
                    HttpStatus.NOT_FOUND
            );
        }
    }
    // add title and content
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addReview(@RequestBody JsonNode jsonNode) {
        Review review = new Review();
        Movie movie = new Movie();
        User user = new User();
        Integer uid;
        Integer movie_id;
        String title = "";
        String content = "";
        try {
            uid = jsonNode.get("uid").asInt();
            user = userRepository.getUserById(uid);
            movie_id = jsonNode.get("movie_id").asInt();
            title = jsonNode.get("title").asText();
            content = jsonNode.get("content").asText();
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "User not found",
                    HttpStatus.NOT_FOUND
            );
        } catch (JsonParseException e) {
            return new ResponseEntity<>(
                    "format for comment json is not correct",
                    HttpStatus.BAD_REQUEST
            );
        }
        try {
            movie = movieRepository.getOne(movie_id);
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "MOVIE Not found",
                    HttpStatus.NOT_FOUND
            );
        }
        review.setUser(user);
        review.setMovie(movie);
        review.setTitle(title);
        review.setContent(content);
        review.setLikes(0L);
        review.setUnLikes(0L);
        review.setSubmitTime(new Date());
        try {
            reviewRepository.save(review);
            return new ResponseEntity<>(
                    review,
                    HttpStatus.OK
            );
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(
                    "Review saving error",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    //  update existing review
    @PostMapping(path = "/update")
    public ResponseEntity<Object> updateReview(@RequestBody JsonNode jsonNode) {
        int review_id;
        int uid;
        String title = "";
        String content = "";
//        Review rv = new Review();
        User user = new User();
        try {
            review_id = jsonNode.get("review_id").asInt();
            uid = jsonNode.get("uid").asInt();
            title = jsonNode.get("title").asText();
            content = jsonNode.get("content").asText();
            user = userRepository.getUserById(uid);
//            rv = reviewRepository.getReviewById(review_id);
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Entity not found.",
                    HttpStatus.NOT_FOUND
            );
        } catch (JsonParseException e) {
            return new ResponseEntity<>(
                    "json has something wrong",
                    HttpStatus.BAD_REQUEST
            );
        }
        Review review = reviewRepository.getByIdAndUser(review_id, user);
        try {
            review.setTitle(title);
            review.setContent(content);
            review.setSubmitTime(new Date());
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Review cannot be found...",
                    HttpStatus.NOT_FOUND
            );
        }
        try {
            reviewRepository.save(review);
            return new ResponseEntity<>(
                    review,
                    HttpStatus.OK
            );
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(
                    "Review Saving Error",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // Delete this review
    @DeleteMapping(value = "/delete")
    public ResponseEntity<Object> deleteReview(@RequestParam Integer id) {
        try {
            reviewRepository.deleteById(id);
        } catch (NoResultException e) {
            return new ResponseEntity<>(
                    "Review does not exist" + id.toString(),
                    HttpStatus.BAD_REQUEST
            );
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                    "illegal argument",
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                "Review" + id.toString() +" deleted",
                HttpStatus.OK
        );
    }
}