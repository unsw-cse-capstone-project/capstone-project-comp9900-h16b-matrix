package com.matrix.filmfinder.services;

import com.matrix.filmfinder.dao.CommentRepository;
import com.matrix.filmfinder.dao.GenreRepository;
import com.matrix.filmfinder.dao.MovieRepository;

import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.message.MovieWrapper;
import com.matrix.filmfinder.message.SearchResult;
import com.matrix.filmfinder.model.Genre;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.web.annotation.ControllerEndpointDiscoverer;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

/**
 * MovieService
 */
@Service
public class MovieService {
    private MovieRepository movieRepository;
    private CommentRepository commentRepository;
    private RateService rateService;
    private GenreRepository genreRepository;
    private UserRepository userRepository;
    static final Logger logger = LoggerFactory.getLogger(MovieService.class);

    @Autowired
    public MovieService(MovieRepository movieRepository, CommentRepository commentRepository, RateService rateService, GenreRepository genreRepository, UserRepository userRepository) {
        this.movieRepository = movieRepository;
        this.commentRepository = commentRepository;
        this.rateService = rateService;
        this.genreRepository = genreRepository;
        this.userRepository = userRepository;

    }



    public Movie getMovieDetail(Integer id) {
        try {
            logger.info("Get movie by movie id {}", id);
            Movie movie = movieRepository.getMovieById(id);
            if (movie == null) {
                throw new EntityNotFoundException();
            }
            logger.info("Get movie id {} succeed", movie.getId());
            logger.info("{}", movie);
            return movie;
        } catch (EntityNotFoundException ex) {
            logger.error("Entity not found exception at movie id {}", id);
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "movie not found",
                    ex
            );
        } catch (Exception e) {
            logger.error("Uncatched error detected in getMovieDetail");
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs in get movie",
                    e
            );
        }
    }
    public SearchResult searchMovie(User user, String keyword, String searchField, List<Integer> genre_ids, String ordered_by, Integer page, Integer batchSize, Boolean isAscending) {
        try {
            logger.info("Get genres");
            List<Genre> genres = genreRepository.mapIdListToGenreList(genre_ids);
            logger.info("Search movie by title with keyword {}", keyword);
            Sort sort;
            if(isAscending) {
                sort = Sort.by(ordered_by).ascending();
            } else {
                sort = Sort.by(ordered_by).descending();
            }
            Pageable pageable = PageRequest.of(page, batchSize, sort);
            logger.info("Querying");
            Page<Movie> moviePage;
            switch (searchField) {
                case "title":
                    if (genres.size() == 0) {
                        logger.info("search without genre");
                        moviePage = movieRepository.getMoviesByTitleWithCustomOrder(keyword, pageable);
                    } else {
                        logger.info("search with genre");
                        moviePage = movieRepository.getMoviesByTitleWithCustomOrderAndGenreFilter(keyword, genres, pageable);
                    }
                    break;
                case "description":
                    if (genres.size() == 0) {
                        moviePage = movieRepository.getMoviesByDescriptionWithCustomOrder(keyword, pageable);
                    } else {
                        moviePage = movieRepository.getMoviesByDescriptionWithCustomOrderAndGenreFilter(keyword, genres, pageable);
                    }
                    break;
                default:
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "search field should be either 'title' or 'description'"
                    );
            }
            if (moviePage.isEmpty()) {
                logger.info("empty string");
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Page is empty"
                );
            }
            List<Movie> movies = moviePage.getContent();
            List<MovieWrapper> movieJsons = new ArrayList<>();
            for (Movie m : movies) {
                Double rate = rateService.getAvgRate(user, m).get(0);
                MovieWrapper movieJson = new MovieWrapper(m, rate);
                movieJsons.add(movieJson);
            }
            SearchResult searchResult = new SearchResult(
                    movieJsons,
                    moviePage.getSize(),
                    moviePage.getNumber(),
                    moviePage.getTotalPages(),
                    moviePage.getTotalElements()
            );
            return searchResult;
        } catch (EntityNotFoundException ex) {
            logger.error("entity not found by searching " + keyword);
            throw new ResponseStatusException(
                    HttpStatus.NO_CONTENT,
                    "No results of " + keyword,
                    ex
            );
        }
    }
    public List<Movie> recommend(User user, Movie movie) {
        List<Movie> recommendMovies = new ArrayList<>();
        if (user == null) {
            recommendMovies = movieRepository.recommendByGenreWithoutUser(movie);
        } else {
            user = userRepository.getUserById(user.getId());
            if (user.getGenre() && !user.getDirector()) {
                recommendMovies = movieRepository.recommendByGenre(user, movie);
            } else if (user.getDirector() && !user.getGenre()) {
                recommendMovies = movieRepository.recommendByDirector(user, movie);
            } else if (user.getGenre() && user.getDirector()) {
                recommendMovies = movieRepository.recommendByDirectorAndGenre(user, movie);
            } else {
                throw new ResponseStatusException(
                        HttpStatus.UNPROCESSABLE_ENTITY,
                        "Wrong user preference status"
                );
            }
        }
        return recommendMovies;
    }
}
