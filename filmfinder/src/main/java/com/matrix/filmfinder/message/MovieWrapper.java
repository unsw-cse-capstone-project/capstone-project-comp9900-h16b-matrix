package com.matrix.filmfinder.message;

import com.matrix.filmfinder.model.Movie;

import java.util.Date;

public class MovieWrapper{
    private Integer id;
    private String title;
    private Double rate;

    public MovieWrapper(Movie movie, Double rate) {
        this.id = movie.getId();
        this.title = movie.getTitle();
        this.rate = rate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }
}
