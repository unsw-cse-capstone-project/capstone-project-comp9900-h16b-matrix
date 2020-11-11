package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.ReviewLike;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Integer> {
    ReviewLike getByUserAndReview(User user, Review review);

    ReviewLike findByUserAndReview(User user, Review review);

    Long countByReviewAndReviewLike(Review review, ReviewLike rlike);
}
