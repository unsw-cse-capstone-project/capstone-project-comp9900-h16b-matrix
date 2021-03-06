package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Objects;

/**
 * An entity comment_like, which takes id as Integer, user_id, comment_id as foreign key user and comment
 */
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
    @JoinColumn(name = "comment_id")
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
        return Objects.equals(id, that.id) &&
                user.equals(that.user) &&
                comment.equals(that.comment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, comment);
    }
}
