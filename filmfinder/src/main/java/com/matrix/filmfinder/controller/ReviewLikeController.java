package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.ReviewLikeRepository;
import com.matrix.filmfinder.dao.ReviewRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewLike;
import com.matrix.filmfinder.model.User;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.boot.json.JsonParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping(path = "/reviewlike")
public class ReviewLikeController {
    private ReviewRepository reviewRepository;
    private ReviewLikeRepository reviewLikeRepository;
    private UserRepository userRepository;
    @Autowired
    public ReviewLikeController(ReviewRepository reviewRepository, ReviewLikeRepository reviewLikeRepository, UserRepository userRepository) {
        this.reviewLikeRepository=reviewLikeRepository;
        this.reviewRepository=reviewRepository;
        this.userRepository=userRepository;
    }

    //  get
    @GetMapping(path = "/get")
    public ResponseEntity<Object> getReviewLike(@RequestParam User user, @RequestParam Review review){
        try {
            ReviewLike reviewLike = reviewLikeRepository.getByUserAndReview(user,review);
            return new ResponseEntity<>(
                    reviewLike,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Cannot found like status for current review",
                    HttpStatus.NOT_FOUND
            );
        }
    }

    // Update like status
    @PostMapping(path = "/likeorunlike")
    public ResponseEntity<Object> reviewlike(@RequestBody JsonNode jsonNode){
        // Initialization
        User user = new User();
        Review review = new Review();
        Integer uid;
        Integer review_id;
        Boolean jud = null; // true is like, false is unlike

        // unpack json packets
        uid = jsonNode.get("uid").asInt();
        user = userRepository.getUserById(uid);
        review_id = jsonNode.get("review_id").asInt();
        review = reviewRepository.getOne(review_id);
        jud = jsonNode.get("judgement").asBoolean();

        try {
            ReviewLike reviewLike = reviewLikeRepository.findByUserAndReview(user, review);
            if (reviewLike != null) {
                reviewLike.setJud(jud); // change like to unlike by hint unlike button
                reviewLikeRepository.saveAndFlush(reviewLike);
                return new ResponseEntity<>(
                        reviewLike,
                        HttpStatus.OK
                );
            } else {
                ReviewLike rlike = new ReviewLike();
                rlike.setUser(user);
                rlike.setReview(review);
                rlike.setJud(jud);
                reviewLikeRepository.save(rlike);
                return new ResponseEntity<>(
                        rlike,
                        HttpStatus.OK
                );
            }
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "User or review cannot found...",
                    HttpStatus.NOT_FOUND
            );
        } catch (JsonParseException e) {
            return new ResponseEntity<>(
                    "format for comment json is not correct",
                    HttpStatus.BAD_REQUEST
            );
        } catch (Exception ee) {
            return new ResponseEntity<> (
                    ee.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        } catch(Exception ee) {
            return new ResponseEntity<>(
                    ee.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @DeleteMapping(path = "/cancellikeorunlike")
    public ResponseEntity<Object> cancel(@RequestParam ReviewLike r) {
        try {
            reviewLikeRepository.delete(r);
            return new ResponseEntity<>(
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                    "cancel failed",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // count the number of like
    @GetMapping(path = "/count")
    public ResponseEntity<Object> getcountReviewLike(@RequestParam Review review, @RequestParam ReviewLike rlike){
        try {
            if (rlike.getJud()) {
                Long count_true = reviewLikeRepository.countByReviewAndReviewLike(review, rlike);
                return new ResponseEntity<>(
                        count_true,
                        HttpStatus.OK
                );
            } if (!rlike.getJud()){
                Long count_false = reviewLikeRepository.countByReviewAndReviewLike(review, rlike);
                return new ResponseEntity<>(
                        count_false,
                        HttpStatus.OK
                );
            } else {// no like and unlike
                return new ResponseEntity<>(
                        HttpStatus.OK
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
