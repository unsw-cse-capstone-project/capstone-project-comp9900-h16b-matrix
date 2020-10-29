package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
