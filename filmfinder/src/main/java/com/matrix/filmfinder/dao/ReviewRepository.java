package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Review;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review getByUserAndMovie(User user, Movie movie);

    Review getByIdAndUser(int review, User user);

    Review getReviewById(int review_id);

    List<Review> findReviewsByMovie(Movie movie);

    @Query(
            nativeQuery = true,
            value = "Select r.id, likes, content, submit_time, title, un_likes, movie_id, r.user_id from review r left join " +
                    "(select * from blacklist b where b.user_id = ?2) b " +
                    "on r.user_id = b.banned_user_id where b.banned_user_id is null and r.movie_id = ?1"
    )
    List<Review> findReviewsByMovieWithBlacklistFilter(Movie movie, User user);
}
