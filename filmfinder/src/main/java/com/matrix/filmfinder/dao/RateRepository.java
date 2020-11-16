package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Rate;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface RateRepository extends JpaRepository<Rate, Integer> {
    @Query(
            value = "select avg(r.rating) from Rate r where r.movie = ?1"
    )
    Double getAvgOfRateByMovie(Movie m);
    Rate getRateByUserAndMovie(User u, Movie m);
    Rate getRateById(Integer id);
    Integer countRatesByRating(Integer rating);

//    @Query(
//            value = "select count(r.id) from Rate r"
//    )
    Integer countRatesByMovie(Movie movie);
    @Query(
        value = "select count(r), sum(r.rating) from Rate r " +
                "where r.movie = ?1"
    )
    List<Double> getCountAndRating(Movie movie);
    @Query(
            nativeQuery = true,
            value = "Select count(r.id), sum(r.rating), b.banned_user_id from rate r left join " +
                    "(select * from blacklist b where b.user_id = ?1 ) as b " +
                    "on r.user_id = b.banned_user_id where b.banned_user_id is null and r.movie_id = ?2"
    )
    List<Double> getCountAndRatingBlacklistExcluded(User user, Movie movie);
}
