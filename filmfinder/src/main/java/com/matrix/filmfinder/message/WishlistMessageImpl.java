package com.matrix.filmfinder.message;

public class WishlistMessageImpl implements WishlistMessage {
    private Integer wishlist_id;
    private String tmdb_id;
    private String title;
    private String description;
    private String poster;

    public WishlistMessageImpl() {
    }

    @Override
    public Integer getWishlist_id() {
        return wishlist_id;
    }

    public void setWishlist_id(Integer wishlist_id) {
        this.wishlist_id = wishlist_id;
    }

    @Override
    public String getTmdb_id() {
        return tmdb_id;
    }

    public void setTmdb_id(String tmdb_id) {
        this.tmdb_id = tmdb_id;
    }

    @Override
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }
}