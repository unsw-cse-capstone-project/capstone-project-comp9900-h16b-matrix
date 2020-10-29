package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping(path = "/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    // add comment
    @PostMapping(path="/comment/add")
    public Comment addComment(
            @RequestParam(name = "id") Integer id,
            @RequestParam(name = "uid") Integer uid,
            @RequestParam(name = "movie_id") Integer movie_id,
            @RequestParam(name = "submit_time") Timestamp submit_time,
            @RequestParam(name = "n_likes") Integer n_likes,
            @RequestParam(name = "content") String content){
        Comment comment = new Comment();
        comment.setId(id);
        comment.setUid(uid);
        comment.setMovie_id(movie_id);
        comment.setSubmit_time(submit_time);
        comment.setN_likes(n_likes);
        comment.setContent(content);
        commentRepository.save(comment);
        return (Comment) commentRepository.findAll();
    }
//    update comment
//    @PutMapping("/{id}")
    public void updateComment(int id){
        //how to get the id which have new value
        Comment record = commentRepository.findById(id).get();
        record.setN_likes(record.getN_likes());
        commentRepository.save(record);
    }

    // delete one list
//    @DeleteMapping(value = "/comment/{id}")
//    public String deleteComment(@PathVariable Interger id) {
//      comment.remove(id);
//      return "success";
}