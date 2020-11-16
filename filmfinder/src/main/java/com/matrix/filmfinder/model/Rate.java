package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;



@Entity(name = "Rate")
@Table(
        name = "rate",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "movie_id"})}
)
public class Rate {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Movie movie;
    @Column
    private Integer rating;
    @Column(name = "rate_time")
    @Temporal(TemporalType.DATE)
    private Date rateTime;

    public Rate() {
    }

    public Date getRateTime() {
        return rateTime;
    }

    public void setRateTime(Date rateTime) {
        this.rateTime = rateTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User uid) {
        this.user = uid;
    }

    public void setMovie(Movie movie_id) {
        this.movie = movie_id;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public Movie getMovie() {
        return movie;
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
                Objects.equals(movie, rate.movie) &&
                Objects.equals(rating, rate.rating);
    }

    @Override
    public String toString() {
        return "Rate{" +
                "id=" + id +
                ", user=" + user +
                ", rating=" + rating +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, movie, rating);
    }
}