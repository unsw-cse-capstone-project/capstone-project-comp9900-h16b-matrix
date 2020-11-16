package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

/**
 * An entity match to ReviewReply, which take 2 User id as foreign key. take review as a foreign key
 */
@Entity(name = "ReviewReply")
public class ReviewReply {
    @Id
    @GeneratedValue
    @Column
    private Integer id;
    @ManyToOne
    private Review review;
    @OneToOne
    private User review_user;
    @ManyToOne
    private User reply_user;
    @Column
    private String content;
    @Temporal(TemporalType.DATE)
    private Date rsubmitTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewReply that = (ReviewReply) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "ReviewReply{" +
                "id=" + id +
                ", review=" + review +
                ", review_user=" + review_user +
                ", reply_user=" + reply_user +
                ", content='" + content + '\'' +
                ", rsubmitTime=" + rsubmitTime +
                '}';
    }

    public ReviewReply() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public User getReview_user() {
        return review_user;
    }

    public void setReview_user(User review_user) {
        this.review_user = review_user;
    }

    public User getReply_user() {
        return reply_user;
    }

    public void setReply_user(User reply_user) {
        this.reply_user = reply_user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getRsubmitTime() {
        return rsubmitTime;
    }

    public void setRsubmitTime(Date rsubmitTime) {
        this.rsubmitTime = rsubmitTime;
    }
}
