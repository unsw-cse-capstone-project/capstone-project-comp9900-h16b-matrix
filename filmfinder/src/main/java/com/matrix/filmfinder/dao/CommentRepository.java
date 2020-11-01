package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
