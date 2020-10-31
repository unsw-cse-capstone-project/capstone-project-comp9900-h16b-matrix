package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "rate")
public class Rate {
    @Id
    @GeneratedValue
    private Integer id;
    @JoinColumn(name = "User_id")
    @ManyToOne()
    private Integer uid;
    @Column
    private Integer movie_id;
    @Column
    private Integer rating;

    public Rate() {
    }

    public Rate(Integer uid, Integer movie_id, Integer rating) {
        this.uid = uid;
        this.movie_id = movie_id;
        this.rating = rating;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public void setMovie_id(Integer movie_id) {
        this.movie_id = movie_id;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getUid() {
        return uid;
    }

    public Integer getMovie_id() {
        return movie_id;
    }

    public Integer getRating() {
        return rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rate rate = (Rate) o;
        return Objects.equals(uid, rate.uid) &&
                Objects.equals(movie_id, rate.movie_id) &&
                Objects.equals(rating, rate.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uid, movie_id, rating);
    }
}