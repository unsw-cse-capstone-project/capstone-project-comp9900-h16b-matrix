package com.matrix.filmfinder.message;

import java.util.Date;
//@SqlResultSetMapping(
//        name = "commentResult",
//        classes = {
//                @ConstructorResult(
//                        targetClass = CommentMessage.class,
//                        columns = {
//                                @ColumnResult(name = "id", type = Integer.class),
//                                @ColumnResult(name = "content", type = String.class),
//                                @ColumnResult(name = "movie_id", type = Integer.class),
//                                @ColumnResult(name = "n_likes", type = Long.class ),
//                                @ColumnResult(name = "submit_time", type = Date.class),
//                                @ColumnResult(name = "user_id", type = User.class),
//                        }
//                )
//        }
//)
public class CommentMessage implements CommentMessageInterface {
    private Integer comment_id;
    private Integer post_userid;
    private String post_username;
    private String content;
    private Integer movie_id;
    private Long n_likes;
    private Date submit_time;
    private Integer your_user_id;

    public CommentMessage() {
    }

    @Override
    public Integer getComment_id() {
        return comment_id;
    }

    public void setComment_id(Integer comment_id) {
        this.comment_id = comment_id;
    }

    public Integer getPost_userid() {
        return post_userid;
    }

    public void setPost_userid(Integer post_userid) {
        this.post_userid = post_userid;
    }

    @Override
    public String getPost_username() {
        return post_username;
    }

    public void setPost_username(String post_username) {
        this.post_username = post_username;
    }

    @Override
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public Integer getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(Integer movie_id) {
        this.movie_id = movie_id;
    }

    @Override
    public Long getN_likes() {
        return n_likes;
    }

    public void setN_likes(Long n_likes) {
        this.n_likes = n_likes;
    }

    @Override
    public Date getSubmit_time() {
        return submit_time;
    }

    public void setSubmit_time(Date submit_time) {
        this.submit_time = submit_time;
    }

    @Override
    public Integer getYour_user_id() {
        return your_user_id;
    }

    public void setYour_user_id(Integer your_user_id) {
        this.your_user_id = your_user_id;
    }
}
