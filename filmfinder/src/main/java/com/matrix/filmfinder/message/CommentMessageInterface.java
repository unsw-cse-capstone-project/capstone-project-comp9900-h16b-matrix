package com.matrix.filmfinder.message;

import java.util.Date;

public interface CommentMessageInterface {
    Integer getComment_id();

    Integer getPost_userid();

    String getPost_username();

    String getContent();

    Integer getMovie_id();

    Long getN_likes();

    Date getSubmit_time();

    Integer getYour_user_id();
}
