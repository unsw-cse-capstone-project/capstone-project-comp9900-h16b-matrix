package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Rate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RateRepository extends CrudRepository<Rate, Integer> {
}
