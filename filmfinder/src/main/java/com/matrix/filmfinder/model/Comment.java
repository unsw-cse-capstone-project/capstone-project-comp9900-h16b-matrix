package com.matrix.filmfinder.model;

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
    @ManyToOne
    private User user;
    @Column
//    @NotEmpty
    private Integer movie_id;
    @Column
    @CreatedDate
    private Date submit_time;
    @Column
    private Integer n_likes;
    @Column
//    @NotBlank
    private String content;

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

    public Integer getMovie_id() {
        return movie_id;
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

    public void setMovie_id(Integer movie_id) {
        this.movie_id = movie_id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return id.equals(comment.id) &&
                Objects.equals(user, comment.user) &&
                Objects.equals(movie_id, comment.movie_id) &&
                Objects.equals(submit_time, comment.submit_time) &&
                Objects.equals(n_likes, comment.n_likes) &&
                Objects.equals(content, comment.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, movie_id, submit_time, n_likes, content);
    }
}