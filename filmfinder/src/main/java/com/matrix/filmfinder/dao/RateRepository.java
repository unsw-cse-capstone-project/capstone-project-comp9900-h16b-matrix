package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Rate;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

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
    @Modifying
    @Query(
            value = "update Rate r set r.rating = ?2 where r.id = ?1"
    )
    void setRatingById(Integer Id, Integer rating);
    @Modifying
    @Query(
            value = "update Rate r set r.rating = ?3 where r.user = ?1 and r.movie = ?2 "
    )
    Rate setRateByUserAndMovie(User u, Movie m, Integer rating);
}
