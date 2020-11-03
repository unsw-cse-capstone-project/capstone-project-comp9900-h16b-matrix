package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.RateRepository;
import com.matrix.filmfinder.model.Rate;
import com.matrix.filmfinder.model.User;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(path="/rate")
public class RateController {
    @Autowired
    private RateRepository rateRepository;
//    @Autowired
//    public RateController(RateRepository rateRepository) {
//        this.rateRepository = rateRepository;
//    }

//    add
    @PostMapping(path="/add")
    public ResponseEntity<String> addRate(
            @RequestParam(name = "uid") User uid,
            @RequestParam(name = "movie_id") Integer movie_id,
            @RequestParam(name = "rating") Integer rating) throws IOException {
        Rate rate = new Rate();
        rate.setUser(uid);
        rate.setMovie_id(movie_id);
        rate.setRating(rating);
        rateRepository.save(rate);
        String rateJson = "";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            rateJson = objectMapper.writeValueAsString(rate);
        } catch(JsonProcessingException e) {
            return new ResponseEntity<>(
                    "rate json generation error in addrate",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(
                rateJson,
                HttpStatus.OK
        );
    }

    //    update
    @PutMapping(value = "udrate/{uid}&{movie_id}")
    public void updateRate(@PathVariable Integer uid){
//        Rate rate = rateRepository.findById(id).get();

    }
}
