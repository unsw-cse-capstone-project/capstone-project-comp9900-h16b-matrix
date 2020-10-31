package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    // add comment
    @PostMapping(path = "/addcomment")
    public @ResponseBody
    String addComment(@RequestBody ObjectNode jsonNode) {
        Comment comment = new Comment();
        Integer uid = jsonNode.get("uid").asInt();
        Integer movie_id = jsonNode.get("movie_id").asInt();
        Integer n_likes = jsonNode.get("n_likes").asInt();
        String content = jsonNode.get("content").asText();
        comment.setUid(uid);
        comment.setMovie_id(movie_id);
        comment.setN_likes(n_likes);
        comment.setContent(content);
        commentRepository.save(comment);
        String res = "Comment " + comment.toString() + " saved.";
        return res;
    }

    //    update n_likes
    @PutMapping(value = "udLike/{id}")
    public Comment updateLikes(@PathVariable Integer id, @RequestParam("n_likes") Integer n_likes) {
        //how to get the id which have new value
        Comment record_n = commentRepository.findById(id).get();
        record_n.setN_likes(n_likes);
        return commentRepository.save(record_n);
    }

    // Update comment
    @PutMapping(value = "udComment/{id}")
    public Comment updateComment(@PathVariable Integer id, @RequestParam("content") String content) {
        Comment record = commentRepository.findById(id).get();
        record.setContent((content));
        return commentRepository.save(record);
    }

    // Delete data
    @DeleteMapping(value = "/delComment/{id}")
    public void deleteComment(@PathVariable Integer id) {
        commentRepository.deleteById(id);
    }
}