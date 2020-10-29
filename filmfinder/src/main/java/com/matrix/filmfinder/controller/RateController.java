package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.RateRepository;
import com.matrix.filmfinder.model.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/rate")
public class RateController {
    @Autowired
    private RateRepository rateRepository;

//    add
    @PostMapping(path="/rate/add")
    public Rate addRate(
            @RequestParam(name = "uid") Integer uid,
            @RequestParam(name = "movie_id") Integer movie_id,
            @RequestParam(name = "rating") Integer rating)
    {
        Rate rate = new Rate();
        rate.setUid(uid);
        rate.setMovie_id(movie_id);
        rate.setRating(rating);
        rateRepository.save(rate);
        return (Rate) rateRepository.findAll();
    }

    //    update
    @Modifying(clearAutomatically = true)
    @Query("update Rate a set a.rating=?3 where a.uid=?1 and a.movie_id=?2")
    int updateRate(@Param("uid") Integer uid, @Param("movie_id") Integer movie_id, @Param("rating") Integer rating)
    {
        return 0;//???????????
    }
}
