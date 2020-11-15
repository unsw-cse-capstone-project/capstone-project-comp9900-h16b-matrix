package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.matrix.filmfinder.dao.CommentLikeRepository;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.message.CommentMessageInterface;
import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.CommentLike;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/comment")
public class CommentController {
    private CommentRepository commentRepository;
    private MovieRepository movieRepository;
    private UserRepository userRepository;
    private CommentLikeRepository commentLikeRepository;
    @Autowired
    public CommentController(CommentRepository commentRepository, MovieRepository movieRepository, UserRepository userRepository, CommentLikeRepository commentLikeRepository) {
       this.commentRepository = commentRepository;
       this.movieRepository = movieRepository;
       this.userRepository = userRepository;
       this.commentLikeRepository = commentLikeRepository;
    }

    @GetMapping(path = "/getMine")
    public ResponseEntity<Object> findCommentsByUserAndMovie(@RequestParam Movie movie, @RequestParam User user) {
        try {
            List<Comment> comments = commentRepository.findCommentsByUserAndMovie(user, movie);
            return new ResponseEntity<>(
                    comments,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "shouldn't happens",
                    HttpStatus.NOT_FOUND
            );
        }
    }


    @GetMapping(path = "/getAll")
    public ResponseEntity<Object> findAllCommentsByMovie(@RequestParam Movie movie, @RequestParam User user) {
        try {
            List<CommentMessageInterface> comments = commentRepository.findCommentsByMovieWithLikedUser(movie, user);
            return new ResponseEntity<>(
                    comments,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Entities not found when get comments by movie",
                    HttpStatus.NOT_FOUND
            );
        }
    }
    // add comment
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addComment(@RequestBody JsonNode jsonNode) {
        Comment comment = new Comment();
        Movie movie = new Movie();
        Integer uid;
        Integer movie_id;
        User user = new User();
        String content = "";
        try {
            uid = jsonNode.get("uid").asInt();
            user = userRepository.getUserById(uid);
            movie_id = jsonNode.get("movie_id").asInt();
            content = jsonNode.get("content").asText();
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "User not found you fucker!!!",
                    HttpStatus.NOT_FOUND
            );
        } catch (JsonParseException e) {
            return new ResponseEntity<>(
                    "format for comment json is not correct",
                    HttpStatus.BAD_REQUEST
            );
        }
        try {
           movie = movieRepository.getMovieById(movie_id);
        } catch (DataAccessResourceFailureException ed) {
            return new ResponseEntity<>(
                    "That's shouldn't happens, addComment cannot find movie",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "MOVIE Not found when add comment",
                    HttpStatus.NOT_FOUND
            );
        }
        comment.setUser(user);
        comment.setMovie(movie);
        comment.setNLikes(0L);
        comment.setContent(content);
        comment.setSubmitTime(new Date());
        try {
            commentRepository.save(comment);
            return new ResponseEntity<>(
                    comment,
                    HttpStatus.OK
            );
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(
                    "comment saving error, maybe the user doesn't exist",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    //    update n_likes
    @PutMapping(value = "/like")
    public ResponseEntity<Object> like(@RequestParam User user, @RequestParam Comment comment) {
//        comment = commentRepository.getOne(comment.getId());
        CommentLike commentLike = commentLikeRepository.getCommentLikeByUserAndComment(user, comment);
        if (commentLike == null) {
            commentLike = new CommentLike(user, comment);
            commentLikeRepository.saveAndFlush(commentLike);
            comment.setNLikes(commentLikeRepository.countCommentLikesByComment(comment));
            commentRepository.save(comment);
        }
        return new ResponseEntity<>(
                comment,
                HttpStatus.OK
        );

    }

    @PutMapping(value = "/unlike")
    public ResponseEntity<Object> unlike(@RequestParam User user, @RequestParam Comment comment) {
        CommentLike commentLike = commentLikeRepository.getCommentLikeByUserAndComment(user, comment);
        if(commentLike != null) {
            commentLikeRepository.delete(commentLike);
            comment.setNLikes(commentLikeRepository.countCommentLikesByComment(comment));
            commentRepository.save(comment);
            return new ResponseEntity<>(
                    comment,
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(
                    "Unlike Unsucessfully coz no like detail found",
                    HttpStatus.NOT_FOUND
            );
        }

    }
//    // Update comment
//    @PutMapping(value = "udComment/{id}")
//    public Comment updateComment(@PathVariable Integer id, @RequestParam("content") String content) {
//        Comment record = commentRepository.findById(id).get();
//        record.setContent((content));
//        return commentRepository.save(record);
//    }

    // Delete data
    @DeleteMapping(value = "/delete")
    public ResponseEntity<Object> deleteComment(@RequestParam Integer id) {
        try {
            commentRepository.deleteById(id);
        } catch(NoResultException e) {
            return new ResponseEntity<>(
                    "Comment doesn't exist" + id.toString(),
                    HttpStatus.BAD_REQUEST
            );
        } catch (IllegalArgumentException ed) {
            return new ResponseEntity<>(
                    "You cannot delete comment like this, check your param you fucker!!!",
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                "Comment " + id.toString() + " deleted",
                HttpStatus.OK
        );
    }

}