package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.matrix.filmfinder.dao.ReviewReplyRepository;
import com.matrix.filmfinder.dao.ReviewRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewReply;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/reply")
public class ReviewReplyController {
    private ReviewReplyRepository reviewReplyRepository;
    private UserRepository userRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewReplyController(ReviewReplyRepository reviewReplyRepository, UserRepository userRepository, ReviewRepository reviewRepository) {
        this.reviewReplyRepository = reviewReplyRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    /**
     * get all reply for a review
     * @param review
     * @param user
     * @return
     */
    // find all replys for one review
    @GetMapping(path = "/getall")
    public ResponseEntity<Object> findAllReply(@RequestParam Review review, @RequestParam User user) {
        try {
            List<ReviewReply> replies = new ArrayList<>();
            if (user == null) {
                replies = reviewReplyRepository.findByReview(review);
            } else {
                replies = reviewReplyRepository.findByReviewWithBlacklistFilter(review, user);
            }
        return new ResponseEntity<>(
                    replies,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Entity not found when get replys",
                    HttpStatus.NOT_FOUND
            );
        }
    }

    // add reply to review
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addReply(@RequestBody JsonNode jsonNode){
        // Initialization
        ReviewReply rreply = new ReviewReply();
        int review_id;
        int review_uid;
        int reply_uid;
        User review_user = new User();
        User reply_user = new User();
        Review review = new Review();
        String content = "";
        try {
            review_id = jsonNode.get("reviewid").asInt();
            review = reviewRepository.getReviewById(review_id);
            review_uid = jsonNode.get("review_uid").asInt();
            review_user = userRepository.getUserById(review_uid);
            reply_uid = jsonNode.get("reply_uid").asInt();
            reply_user = userRepository.getUserById(reply_uid);
            content = jsonNode.get("content").asText();
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "User not found",
                    HttpStatus.NOT_FOUND
            );
        }
        rreply.setReview(review);
        rreply.setReview_user(review_user);
        rreply.setReply_user(reply_user);
        rreply.setContent(content);
        rreply.setRsubmitTime(new Date());
        try {
            reviewReplyRepository.save(rreply);
            return new ResponseEntity<>(
                    rreply,
                    HttpStatus.OK
            );
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(
                    "review_reply saving error",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Object> deleteReviewReply(@RequestParam Integer id){
        try {
            reviewReplyRepository.deleteById(id);
        } catch (NoResultException e) {
            return new ResponseEntity<>(
                    "Reply does not exist" + id.toString(),
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                "Reply" + id.toString() +" deleted",
                HttpStatus.OK
        );
    }

//    @DeleteMapping(path = "/delete")
//    public ResponseEntity<Object> deleteReviewReply(@RequestParam ReviewReply reply, @RequestParam User reply_user){
//        try {
//            reviewReplyRepository.deleteByReviewReplyAndReply_user(reply, reply_user);
////            reviewReplyRepository.deleteByIdAndReply_user(id, reply_user);
//        } catch (NoResultException e) {
//            return new ResponseEntity<>(
//                    "Reply does not exist",
//                    HttpStatus.BAD_REQUEST
//            );
//        }
//        return new ResponseEntity<>(
//                "Reply deleted",
//                HttpStatus.OK
//        );
//    }
}
