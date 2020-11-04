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
    private Integer id;
    private String content;
    private Integer movie_id;
    private Long n_likes;
    private Date submit_time;
    private Integer user_id;

    public CommentMessage() {
    }

    @Override
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
}
