package com.matrix.filmfinder.message;

import com.matrix.filmfinder.model.Movie;

import java.util.List;

public class SearchResult {
    private List<MovieWrapper> movies;
    private Integer page_size;
    private Integer page_number;
    private Integer total_pages;
    private Long total_element;
    public SearchResult(List<MovieWrapper> movies, Integer page_size, Integer page_number, Integer total_pages, Long total_element) {
        this.movies = movies;
        this.page_size = page_size;
        this.page_number = page_number;
        this.total_pages = total_pages;
        this.total_element = total_element;
    }

    public List<MovieWrapper> getMovies() {
        return movies;
    }

    public void setMovies(List<MovieWrapper> movies) {
        this.movies = movies;
    }

    public Integer getPage_size() {
        return page_size;
    }

    public void setPage_size(Integer page_size) {
        this.page_size = page_size;
    }

    public Integer getPage_number() {
        return page_number;
    }

    public void setPage_number(Integer page_number) {
        this.page_number = page_number;
    }

    public Integer getTotal_pages() {
        return total_pages;
    }

    public void setTotal_pages(Integer total_pages) {
        this.total_pages = total_pages;
    }

    public Long getTotal_element() {
        return total_element;
    }

    public void setTotal_element(Long total_element) {
        this.total_element = total_element;
    }
}
