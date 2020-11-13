package com.matrix.filmfinder.message;

public interface WishlistMessage {
    Integer getWishlist_id();

    String getTmdb_id();

    String getTitle();

    String getDescription();

    String getPoster();
}
