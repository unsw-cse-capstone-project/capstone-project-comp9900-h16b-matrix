package com.matrix.filmfinder.model;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity(name = "Comment")
public class Comment {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
//    @Column
//    @NotEmpty
    @ManyToOne (fetch = FetchType.EAGER, optional = false)
    private User user;
//    @NotEmpty
    @ManyToOne(optional = false)
    private Movie movie;

//    @Basic(optional = false)
    @Column
    @Temporal(TemporalType.DATE)
    private Date submit_time;
    @Column
    private Integer n_likes;
    @Column
//    @NotBlank
    private String content;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return id.equals(comment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Comment() {
    }

//    public Comment(Integer id, Integer uid, Integer movie_id, Date submit_time, Integer n_likes, String content){
//        this.id = id;
//        this.uid = uid;
//        this.movie_id = movie_id;
//        this.submit_time = submit_time;
//        this.n_likes = n_likes;
//        this.content = content;
//    }

    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Date getSubmit_time() {
        return submit_time;
    }

    public Integer getN_likes() {
        return n_likes;
    }

    public String getContent() {
        return content;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User uid) {
        this.user = uid;
    }


    public void setSubmit_time(Date submit_time) {
        this.submit_time = submit_time;
    }

    public void setN_likes(Integer n_likes) {
        this.n_likes = n_likes;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void incLike() {
        this.n_likes += 1;
    }

    public void decLike() {
        this.n_likes -= 1;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", user=" + user +
                ", movie=" + movie.getTmdb_id() +
                ", submit_time=" + submit_time +
                ", n_likes=" + n_likes +
                ", content='" + content + '\'' +
                '}';
    }
}