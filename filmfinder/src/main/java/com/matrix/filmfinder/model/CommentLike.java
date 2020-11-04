package com.matrix.filmfinder.model;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import java.util.Objects;

@Entity(
        name = "comment_like"
)
@Table(
        name = "comment_like",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "comment_id"})}

)
public class CommentLike {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Comment comment;

    public CommentLike() {
    }

    public CommentLike(User user, Comment comment) {
        this.user = user;
        this.comment = comment;
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

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentLike that = (CommentLike) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
