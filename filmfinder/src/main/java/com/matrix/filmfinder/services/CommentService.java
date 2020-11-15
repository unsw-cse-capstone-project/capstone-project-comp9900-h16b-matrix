package com.matrix.filmfinder.services;

import com.matrix.filmfinder.dao.CommentLikeRepository;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private MovieRepository movieRepository;
    private UserRepository userRepository;
    private CommentLikeRepository commentLikeRepository;
    @Autowired
    public CommentService(CommentRepository commentRepository, MovieRepository movieRepository, UserRepository userRepository, CommentLikeRepository commentLikeRepository) {
        this.commentRepository = commentRepository;
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
        this.commentLikeRepository = commentLikeRepository;
    }
}
