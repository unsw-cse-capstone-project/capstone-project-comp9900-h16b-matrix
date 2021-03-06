package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.CommentLikeRepository;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.CommentLike;
import com.matrix.filmfinder.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final Logger logger = LoggerFactory.getLogger(CommentLikeController.class);

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

    /**
     * like a comment given user
     * @param u
     * @param c
     * @return
     */
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

    /**
     * unlike given commentLike
     * @param cl
     * @return
     */
    @DeleteMapping(path = "/unlike")
    public ResponseEntity<Object> unLike(@RequestParam(name = "commentLike") CommentLike cl) {
        try {
            commentLikeRepository.delete(cl);
            Comment c = cl.getComment();
            c.setNLikes(commentLikeRepository.countCommentLikesByComment(c));
            commentRepository.save(c);
            return new ResponseEntity<>(
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException el) {
            return new ResponseEntity<>(
                    "unlike failed or you already unliked it",
                    HttpStatus.BAD_REQUEST
            );
        } catch (Exception e) {
            logger.error("Something wrong in unlike");
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.OK
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
