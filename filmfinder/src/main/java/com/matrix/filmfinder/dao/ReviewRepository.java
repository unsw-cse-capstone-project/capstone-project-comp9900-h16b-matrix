package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review getByUserAndMovie(User user, Movie movie);

    Review getByIdAndUser(int review, User user);

    Review getReviewById(int review_id);

    List<Review> findReviewsByMovie(Movie movie);

//    List<Review> findReviewsByBanned_Users(List<User> banned_users);

//    @Query(
//            nativeQuery = true,
//            value =
//    )
//    @Transactional
//    List<Review> findReviewsByMovieWithBannedUsers(Movie movie_id);
}
