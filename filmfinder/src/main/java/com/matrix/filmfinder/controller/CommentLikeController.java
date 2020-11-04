package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.CommentLikeRepository;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.CommentLike;
import com.matrix.filmfinder.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@Controller
@RequestMapping(path = "/like/comment")
public class CommentLikeController {
    private CommentLikeRepository commentLikeRepository;
    private CommentRepository commentRepository;
    private MovieRepository movieRepository;

    public CommentLikeController(CommentLikeRepository commentLikeRepository, CommentRepository commentRepository, MovieRepository movieRepository) {
        this.commentLikeRepository = commentLikeRepository;
        this.commentRepository = commentRepository;
        this.movieRepository = movieRepository;
    }

    @GetMapping(path = "/get")
    public ResponseEntity<Object> getCommentLike(@RequestParam(name = "user") User u, @RequestParam(name = "comment") Comment c) {
        try {
            CommentLike commentLike = commentLikeRepository.getCommentLikeByUserAndComment(u, c);
            return new ResponseEntity<>(
                    commentLike,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<>(
                    "Cannot found like status for current comment" + c.getId(),
                    HttpStatus.NOT_FOUND
            );
        }
    }
    @PostMapping(path = "/like")
    public ResponseEntity<Object> like(@RequestParam(name = "user") User u, @RequestParam(name = "comment") Comment c) {
        try {
            CommentLike commentLike = commentLikeRepository.findCommentLikeByUserAndComment(u, c);
            if (commentLike != null) {
                return new ResponseEntity<>(
                        commentLike,
                        HttpStatus.CONFLICT
                );
            } else {
                commentLike = new CommentLike(u, c);
                commentLikeRepository.save(commentLike);
                return new ResponseEntity<>(
                        commentLike,
                        HttpStatus.OK
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    @DeleteMapping(path = "/unlike")
    public ResponseEntity<Object> unLike(@RequestParam(name = "commentLike") CommentLike cl) {
        try {
            commentLikeRepository.delete(cl);
            return new ResponseEntity<>(
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException el) {
            return new ResponseEntity<>(
                    "unlike failed or you already unliked it",
                    HttpStatus.BAD_REQUEST
            );
        }
    }
    @GetMapping(path = "/count")
    public ResponseEntity<Object> getCountByComment(@RequestParam(name = "comment") Comment c) {
        try {
            Long count = commentLikeRepository.countCommentLikesByComment(c);
            return new ResponseEntity<>(
                    count,
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}
