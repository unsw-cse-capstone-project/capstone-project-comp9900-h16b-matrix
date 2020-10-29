package com.matrix.filmfinder.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@DynamicInsert
@DynamicUpdate
public class Comment {
    @Id
    @NonNull
    @GeneratedValue
    private Integer id;
    @Column
    private Integer uid;
    @Column
    private Integer movie_id;
    @Column
    @CreatedDate
    private Timestamp submit_time;
    @Column
    private Integer n_likes;
    @Column
    private String content;

    public Comment() {
    }

    public Comment(Integer id, Integer uid, Integer movie_id, Timestamp submit_time, Integer n_likes, String content){
        this.id = id;
        this.uid = uid;
        this.movie_id = movie_id;
        this.submit_time = submit_time;
        this.n_likes = n_likes;
        this.content = content;
    }

    @NonNull
    public Integer getId() {
        return id;
    }

    public Integer getUid() {
        return uid;
    }

    public Integer getMovie_id() {
        return movie_id;
    }

    public Timestamp getSubmit_time() {
        return submit_time;
    }

    public Integer getN_likes() {
        return n_likes;
    }

    public String getContent() {
        return content;
    }

    public void setId(@NonNull Integer id) {
        this.id = id;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public void setMovie_id(Integer movie_id) {
        this.movie_id = movie_id;
    }

    public void setSubmit_time(Timestamp submit_time) {
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
                Objects.equals(uid, comment.uid) &&
                Objects.equals(movie_id, comment.movie_id) &&
                Objects.equals(submit_time, comment.submit_time) &&
                Objects.equals(n_likes, comment.n_likes) &&
                Objects.equals(content, comment.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, uid, movie_id, submit_time, n_likes, content);
    }
}