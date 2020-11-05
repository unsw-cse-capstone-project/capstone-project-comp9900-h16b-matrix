package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.message.CommentMessageInterface;
import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
//   @Query(
//      value = "select * from Comment c,  " +
//              "where c.movie_id = "
//   )
   List<Comment> getCommentsByUserAndMovie(User u, Movie m);
   List<Comment> getCommentsByMovie(Movie m);

   List<Comment> findCommentsByUserAndMovie(User u, Movie m);
   List<Comment> findCommentsByMovie(Movie m);
   @Query(
           nativeQuery = true,
           value = "Select c.id as id, c.content as content, c.movie_id as movie_id, c.n_likes as n_likes, c.submit_time as submit_time, cl.user as user_id " +
                   "from comment c LEFT JOIN " +
                   "(Select cl.user_id AS user, cl.comment_id from comment_like cl where cl.user_id = ?2) cl " +
                   "on c.id = cl.comment_id " +
                   "and c.movie_id = ?1"
   )
   @Transactional
   List<CommentMessageInterface> findCommentsByMovieWithLikedUser(Movie m, User u);
}
