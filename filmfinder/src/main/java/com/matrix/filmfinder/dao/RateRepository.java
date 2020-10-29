package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Rate;
import org.springframework.data.repository.CrudRepository;

public interface RateRepository extends CrudRepository<Rate, Integer> {
}
