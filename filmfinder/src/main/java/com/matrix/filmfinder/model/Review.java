package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity(name = "Review")
@Table(name = "review",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "movie_id"})})
public class Review {
    @Id
    @NonNull
    @GeneratedValue
    private Integer id;
    @Column
    private String title;
    @Lob // map text
    @Column(columnDefinition = "text")
    private String content;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User user;
    @ManyToOne(optional = false)
    private Movie movie;
    @Column(name = "submit_time")
    @Temporal(TemporalType.DATE)
    private Date submitTime;
    @Column
    private Long Likes;
    @Column
    private Long unLikes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o==null||getClass()!=o.getClass()) return false;
        Review review = (Review) o;
        return id.equals(review.id);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Review(){}

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", user=" + user +
                ", movie=" + movie +
                ", Likes=" + Likes +
                ", unLikes=" + unLikes +
                '}';
    }

    @NonNull
    public Integer getId() {
        return id;
    }

    public void setId(@NonNull Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Date getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Date submitTime) {
        this.submitTime = submitTime;
    }

    public Long getLikes() {
        return Likes;
    }

    public void setLikes(Long likes) {
        Likes = likes;
    }

    public Long getUnLikes() {
        return unLikes;
    }

    public void setUnLikes(Long unLikes) {
        this.unLikes = unLikes;
    }
}
