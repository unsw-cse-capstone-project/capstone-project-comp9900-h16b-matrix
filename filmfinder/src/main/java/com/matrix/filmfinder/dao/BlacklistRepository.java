package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Blacklist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlacklistRepository extends CrudRepository<Blacklist, Integer> {
}
