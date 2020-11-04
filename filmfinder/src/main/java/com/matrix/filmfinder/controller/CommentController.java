package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.List;

@RestController
@RequestMapping(path = "/comment")
public class CommentController {
    private CommentRepository commentRepository;
    private MovieRepository movieRepository;
    private UserRepository userRepository;
    @Autowired
    public CommentController(CommentRepository commentRepository, MovieRepository movieRepository, UserRepository userRepository) {
       this.commentRepository = commentRepository;
       this.movieRepository = movieRepository;
       this.userRepository = userRepository;
    }
//    @Autowired
//    public CommentController(CommentRepository commentRepository) {
//        this.commentRepository = commentRepository;
//    }

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
    public ResponseEntity<Object> findAllCommentsByMovie(@RequestParam Movie movie) {
        try {
            List<Comment> comments = commentRepository.findCommentsByMovie(movie);
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
           movie = movieRepository.getOne(movie_id);
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
        comment.setN_likes(0);
        comment.setContent(content);
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
    public ResponseEntity<Object> updateLikes(@RequestParam Integer id, @RequestParam("isLike") Boolean isLike) {
        //how to get the id which have new value
        Comment comment = commentRepository.findById(id).get();
        if(isLike == true) {
            //if isLike is true, then add 1
            comment.incLike();
        } else {
            comment.decLike();
        }
        commentRepository.save(comment);

        return new ResponseEntity<>(
                comment,
                HttpStatus.OK
        );
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