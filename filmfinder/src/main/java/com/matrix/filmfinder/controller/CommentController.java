package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.model.Comment;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;

@RestController
@RequestMapping(path = "/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;
//    @Autowired
//    public CommentController(CommentRepository commentRepository) {
//        this.commentRepository = commentRepository;
//    }

    // add comment
    @PostMapping(path = "/addcomment")
    public ResponseEntity<String> addComment(@RequestBody ObjectNode jsonNode) {
        Comment comment = new Comment();

        try {
            Integer uid = jsonNode.get("uid").asInt();
            User user = new User(uid);
            Integer movie_id = jsonNode.get("movie_id").asInt();
            String content = jsonNode.get("content").asText();
            comment.setUser(user);
            comment.setMovie_id(movie_id);
            comment.setN_likes(0);
            comment.setContent(content);

        } catch (JsonParseException e) {
            return new ResponseEntity<>(
                    "format for comment json is not correct",
                    HttpStatus.BAD_REQUEST
            );
        }

        commentRepository.save(comment);
        String commentJson = "";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            commentJson = objectMapper.writeValueAsString(comment);
        } catch(JsonProcessingException e) {
            return new ResponseEntity<>(
                    "comment json generation error in addcomment",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(
                commentJson,
                HttpStatus.OK
        );
    }

    //    update n_likes
    @PutMapping(value = "likes/{id}")
    public ResponseEntity<String> updateLikes(@PathVariable Integer id, @RequestParam("isLike") Boolean isLike) {
        //how to get the id which have new value
        Comment comment = commentRepository.findById(id).get();
        if(isLike == true) {
            comment.incLike();
        } else {
            comment.decLike();
        }
        commentRepository.save(comment);
        ObjectMapper objectMapper = new ObjectMapper();
        String commentJson = new String();
        try {
            commentJson = objectMapper.writeValueAsString(comment);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(
                    "comment json processing error: " + comment.toString(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return new ResponseEntity<>(
                commentJson,
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
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer id) {
        try {
            commentRepository.deleteById(id);
        } catch(NoResultException e) {
            return new ResponseEntity<>(
                    "Comment doesn't exist" + id.toString(),
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                "Comment " + id.toString() + " deleted",
                HttpStatus.OK
        );
    }
}