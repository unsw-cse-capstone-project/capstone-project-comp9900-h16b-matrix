package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class Comment {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "submit_time")
    @Temporal(TemporalType.DATE)
    private Date submitTime;
    @Column
    private Long nLikes;
    @Column
//    @NotBlank
    private String content;


    @ManyToOne (fetch = FetchType.EAGER, optional = false)
    private User user;
    //    @NotEmpty
    @ManyToOne(optional = false)
    private Movie movie;
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


    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Date getSubmitTime() {
        return submitTime;
    }

    public Long getNLikes() {
        return nLikes;
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


    public void setSubmitTime(Date submit_time) {
        this.submitTime = submit_time;
    }

    public void setNLikes(Long n_likes) {
        this.nLikes = n_likes;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void incLike() {
        this.nLikes += 1;
    }

    public void decLike() {
        this.nLikes -= 1;
    }


    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", user=" + user +
                ", submit_time=" + submitTime +
                ", n_likes=" + nLikes +
                ", content='" + content + '\'' +
                '}';
    }
}