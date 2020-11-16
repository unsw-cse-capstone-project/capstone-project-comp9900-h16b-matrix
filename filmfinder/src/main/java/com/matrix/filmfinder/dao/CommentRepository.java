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

   List<Comment> findCommentsByUserAndMovie(User u, Movie m);
   @Query(
           nativeQuery = true,
           value = "Select c.id as comment_id, u.id as post_userid, u.name as post_username, c.content as content, c.movie_id as movie_id, c.n_likes as n_likes, c.submit_time as submit_time, cl.your_user_id " +
                   "from comment c " +
                   "left join user u on c.user_id = u.id " +
                   "LEFT JOIN " +
                   "(Select cl.user_id AS your_user_id, cl.comment_id from comment_like cl where cl.user_id = ?2) cl " +
                   "on c.id = cl.comment_id " +
                   "left join" +
                   "(Select * from blacklist b where ?2 = b.user_id) b " +
                   "on c.user_id = b.banned_user_id " +
                   "where c.movie_id = ?1 " +
                   "and b.banned_user_id is null "
   )
   @Transactional
   List<CommentMessageInterface> findCommentsByMovieWithLikedUser(Movie m, User u);
}
