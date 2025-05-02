package com.kirilanastasoff.TheMovieDB.backend.repository;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
	List<Movie> findByNameContaining(String name);

	List<Movie> findByUserScore(int userScore);

	List<Movie> findByReleaseDate(Date releaseDate);

}
