package com.matrix.filmfinder.message;

import com.matrix.filmfinder.model.Movie;

public class MovieWrapper{
    private Integer id;
    private String title;
    private Double rate;
    private String description;
    private String poster;
    public MovieWrapper(Movie movie, Double rate) {
        this.id = movie.getId();
        this.title = movie.getTitle();
        this.description = movie.getDescription();
        this.poster = movie.getPoster();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }
}
