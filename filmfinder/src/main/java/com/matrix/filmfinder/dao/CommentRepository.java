package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
//   @Query(
//      value = "select * from Comment c,  " +
//              "where c.movie_id = "
//   )
   List<Comment> getCommentsByUserAndMovie(User u, Movie m);
   List<Comment> getCommentsByMovie(Movie m);
}
