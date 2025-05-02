package com.kirilanastasoff.TheMovieDB.backend.repository;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.model.TvShow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TvShowRepository extends JpaRepository<TvShow, Long> {
	List<TvShow> findByNameContaining(String name);

	List<TvShow> findByVoteAverage(int voteAverage);

	List<TvShow> findByFirstAirDate(Date firstAirDate);

}
