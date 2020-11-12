package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review getByUserAndMovie(User user, Movie movie);

    Review getByIdAndUser(int review, User user);

    Review getReviewById(int review_id);
}
