package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Objects;

/**
 * An Entity mapping to ReviewLike table, take user_id, review_id as foreign keys
 */
@Entity(name = "review_like")
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id","review_id"})})
public class ReviewLike {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Review review;
    @Column// judgement symbol for like or unlike
    private Boolean jud;

    public ReviewLike() {
    }

    public ReviewLike(User user, Review review) {
        this.user = user;
        this.review = review;
    }

    public Boolean getJud() {
        return jud;
    }

    public void setJud(Boolean jud) {
        this.jud = jud;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewLike that = (ReviewLike) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(user, that.user) &&
                Objects.equals(review, that.review);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, review);
    }
}
