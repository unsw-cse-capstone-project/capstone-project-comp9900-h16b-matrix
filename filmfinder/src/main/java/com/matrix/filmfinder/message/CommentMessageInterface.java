package com.matrix.filmfinder.message;

import java.util.Date;

public interface CommentMessageInterface {
    Integer getId();

    String getContent();

    Integer getMovie_id();

    Long getN_likes();

    Date getSubmit_time();

    Integer getUser_id();
}
