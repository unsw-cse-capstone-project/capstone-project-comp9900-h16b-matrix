package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewReply;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewReplyRepository extends JpaRepository<ReviewReply, Integer> {
    List<ReviewReply> findByReview(Review review);
//    ReviewReply deleteByReviewReplyAndReply_user(ReviewReply reply, User reply_user);
}
