package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewReply;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewReplyRepository extends JpaRepository<ReviewReply, Integer> {
    List<ReviewReply> findByReview(Review review);
    @Query(
            nativeQuery = true,
            value = "select r.id, content, rsubmit_time, reply_user_id, review_id, review_user_id " +
                    "from review_reply r left join " +
                    "(select * from blacklist b where b.user_id = ?2) as b " +
                    "on r.reply_user_id = b.banned_user_id or r.review_user_id = b.banned_user_id " +
                    "where b.banned_user_id is null and r.review_id = ?1 "
    )
    List<ReviewReply> findByReviewWithBlacklistFilter(Review review, User user);
}
