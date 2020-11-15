package com.matrix.filmfinder.services;

import com.matrix.filmfinder.dao.BlacklistRepository;
import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.RateRepository;
import com.matrix.filmfinder.model.Blacklist;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Rate;
import com.matrix.filmfinder.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.integration.IntegrationGraphEndpoint;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class RateService {
    private final BlacklistRepository blacklistRepository;
    private final RateRepository rateRepository;
    private final MovieRepository movieRepository;
    private final Logger logger = LoggerFactory.getLogger(RateService.class);
    @Autowired
    public RateService(BlacklistRepository blacklistRepository, RateRepository rateRepository, MovieRepository movieRepository) {
        this.blacklistRepository = blacklistRepository;
        this.rateRepository = rateRepository;
        this.movieRepository = movieRepository;
    }

    public List<Double> getAvgRate(User user, Movie movie) {
        List<Double> count_sum;
        List<Double> result = new ArrayList<>();
        if(user == null) {
            count_sum = rateRepository.getCountAndRating(movie);
        } else {
            count_sum = rateRepository.getCountAndRatingBlacklistExcluded(user, movie);
        }
        if(count_sum.size() < 2) {
            count_sum.add(0D);
        }
        movie = movieRepository.getOne(movie.getId());
        Double count =  count_sum.get(0) + movie.getTmdb_rates_count();
        Double rateSum = count_sum.get(1) + movie.getTmdb_rates_count() * movie.getTmdb_rates();
        Double avg_rate = rateSum / count;
        result.add(avg_rate);
        result.add(count);
        logger.info(avg_rate.toString());
        logger.info(result.toString());
        return result;
    }

}
