package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.RateRepository;
import com.matrix.filmfinder.model.Rate;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/rate")
public class RateController {
    private RateRepository rateRepository;
    @Autowired
    public RateController(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

//    add
    @PostMapping(path="/addrate")
    public String addRate(
            @RequestParam(name = "uid") User uid,
            @RequestParam(name = "movie_id") Integer movie_id,
            @RequestParam(name = "rating") Integer rating)
    {
        Rate rate = new Rate();
        rate.setUid(uid);
        rate.setMovie_id(movie_id);
        rate.setRating(rating);
        rateRepository.save(rate);
        return "Rate successfully";
    }

    //    update
    @PutMapping(value = "udrate/{uid}&{movie_id}")
    public void updateRate(@PathVariable Integer uid){
//        Rate rate = rateRepository.findById(id).get();

    }
}
