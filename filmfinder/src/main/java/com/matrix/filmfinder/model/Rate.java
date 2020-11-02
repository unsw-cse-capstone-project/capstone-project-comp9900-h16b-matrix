package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity(name = "Rate")
public class Rate {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private User user;
    @Column
    private Integer movie_id;
    @Column
    private Integer rating;

    public Rate() {
    }

//    public Rate(Integer uid, Integer movie_id, Integer rating) {
//        this.uid = uid;
//        this.movie_id = movie_id;
//        this.rating = rating;
//    }

    public void setUser(User uid) {
        this.user = uid;
    }

    public void setMovie_id(Integer movie_id) {
        this.movie_id = movie_id;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
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
        return Objects.equals(user, rate.user) &&
                Objects.equals(movie_id, rate.movie_id) &&
                Objects.equals(rating, rate.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, movie_id, rating);
    }
}