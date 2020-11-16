package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Blacklist;
import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlacklistRepository extends JpaRepository<Blacklist, Integer> {
    List<Blacklist> getBlacklistsByUser(User u);
    List<Blacklist> findBlacklistByUser(User u);
}
