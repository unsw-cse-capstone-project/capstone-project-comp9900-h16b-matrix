package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.ReviewLikeRepository;
import com.matrix.filmfinder.dao.ReviewRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewLike;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.Date;

@RestController
@RequestMapping(path = "/review")
public class ReviewController {
    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private MovieRepository movieRepository;
    private ReviewLikeRepository reviewLikeRepository;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository, MovieRepository movieRepository, ReviewLikeRepository reviewLikeRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.reviewLikeRepository = reviewLikeRepository;
    }

    // get data
    @GetMapping(path = "get")
    public ResponseEntity<Object> findReviewByUserAndMovie(@RequestParam User user, @RequestParam Movie movie){
        try {
            Review review = reviewRepository.findByUserAndMovie(user,movie);
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
    // update title and content
    @PostMapping(path = "/update")
    public ResponseEntity<Object> updateReview(@RequestParam JsonNode jsonNode) {
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
                    "User not found you fucker!!!",
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

    //  update Like and unlike
    @PutMapping(value = "/like")
    public ResponseEntity<Object> reviewLikes(@RequestParam User user, @RequestParam Review review) {
        ReviewLike reviewLike = reviewLikeRepository.getByUserAndReview(user, review);
        if (reviewLike == null) {
            reviewLike = new ReviewLike(user, review);
            reviewLikeRepository.saveAndFlush(reviewLike);
            if (reviewLike.getJud()) {
                review.setLikes(reviewLikeRepository.countByReviewAndReviewLike(review,reviewLike));
            } if (!reviewLike.getJud()){
                review.setUnLikes(reviewLikeRepository.countByReviewAndReviewLike(review, reviewLike));
            }
            reviewRepository.save(review);
        }
        return new ResponseEntity<>(
                review,
                HttpStatus.OK
        );
    }

    // update cancel like or unlike
    @PutMapping(value = "/cancel")
    public ResponseEntity<Object> cancellikeorunlike(@RequestParam User user, @RequestParam Review review) {
        ReviewLike reviewLike = reviewLikeRepository.getByUserAndReview(user, review);
        if (reviewLike != null) {
            reviewLikeRepository.delete(reviewLike);
//            Review r = reviewRepository.getOne(review.getId());
            return new ResponseEntity<>(
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(
                    "Unsuccessfully to cancel coz no detail can be found",
                    HttpStatus.NOT_FOUND
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
