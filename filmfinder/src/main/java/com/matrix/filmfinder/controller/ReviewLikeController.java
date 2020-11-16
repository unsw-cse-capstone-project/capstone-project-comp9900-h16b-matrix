package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.matrix.filmfinder.dao.ReviewLikeRepository;
import com.matrix.filmfinder.dao.ReviewRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewLike;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
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

    /**
     * get reviewLike by user and review
     * @param user
     * @param review
     * @return
     */
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

    /**
     * like or unlike a review
     * @param jsonNode
     * @return
     */
    @PostMapping(path = "/likeorunlike")
    public ResponseEntity<Object> reviewlike(@RequestBody JsonNode jsonNode){
        // Initialization
        User user = new User();
        Review review = new Review();
        Integer uid;
        Integer review_id;
        Boolean jud = true; // true is like, false is unlike

        // unpack json packets
        uid = jsonNode.get("uid").asInt();
        user = userRepository.getUserById(uid);
        review_id = jsonNode.get("review_id").asInt();
        review = reviewRepository.getOne(review_id);
        jud = jsonNode.get("judgement").asBoolean();

        try {
            ReviewLike reviewLike = reviewLikeRepository.findByUserAndReview(user, review);
            if (reviewLike != null) { // means existing data
                if (reviewLike.getJud() != jud){
                    // change like to unlike by hint unlike button
                    if (jud) { //jud == true
                        reviewLike.setJud(true);
                        reviewLikeRepository.saveAndFlush(reviewLike);
                        Long count_true = reviewLikeRepository.countByReviewAndJud(review, true);
                        review.setLikes(count_true);
                        Long count_false = reviewLikeRepository.countByReviewAndJud(review, false);
                        review.setUnLikes(count_false);
                        reviewRepository.saveAndFlush(review);
                    } else { // jud == false
                        reviewLike.setJud(false);
                        reviewLikeRepository.saveAndFlush(reviewLike);
                        Long count_false = reviewLikeRepository.countByReviewAndJud(review, false);
                        review.setUnLikes(count_false);
                        Long count_true = reviewLikeRepository.countByReviewAndJud(review, true);
                        review.setLikes(count_true);
                        reviewRepository.saveAndFlush(review);
                    }
                }
            } else {
                ReviewLike rlike = new ReviewLike();
                rlike.setUser(user);
                rlike.setReview(review);
                rlike.setJud(jud);
                reviewLikeRepository.saveAndFlush(rlike);
                if (jud) {
                    Long count_true = reviewLikeRepository.countByReviewAndJud(review, true);
                    review.setLikes(count_true);
                    reviewRepository.saveAndFlush(review);
                }else { // jud == false
                    Long count_false = reviewLikeRepository.countByReviewAndJud(review, false);
                    review.setUnLikes(count_false);
                    reviewRepository.saveAndFlush(review);
                }
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
        }
        // return
        return new ResponseEntity<>(
                review,
                HttpStatus.OK
        );
    }

    /**
     * delete like or unlike
     * @param r
     * @return
     */
    @DeleteMapping(path = "/cancellikeorunlike")
    public ResponseEntity<Object> cancel(@RequestParam ReviewLike r) {
        try {
            if (r.getJud()){ // jud == true
                Review review = r.getReview();
                reviewLikeRepository.delete(r);
                Long cnt_true = reviewLikeRepository.countByReviewAndJud(review, true);
                review.setLikes(cnt_true);
                reviewRepository.saveAndFlush(review);
                return new ResponseEntity<>(
                        review,
                        HttpStatus.OK
                );
            } else {
                Review review = r.getReview();
                reviewLikeRepository.delete(r);
                Long cnt_false = reviewLikeRepository.countByReviewAndJud(review, false);
                review.setUnLikes(cnt_false);
                reviewRepository.saveAndFlush(review);
                return new ResponseEntity<>(
                        review,
                        HttpStatus.OK
                );
            }
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                    "cancel failed",
                    HttpStatus.BAD_REQUEST
            );
        }
    }
}