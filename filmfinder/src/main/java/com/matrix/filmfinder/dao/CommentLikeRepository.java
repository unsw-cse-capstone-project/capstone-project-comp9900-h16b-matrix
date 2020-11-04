package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.CommentLike;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {
    CommentLike getCommentLikeByUserAndComment(User u, Comment c);
    CommentLike findCommentLikeByUserAndComment(User u, Comment c);
    Long countCommentLikesByComment(Comment c);
}
