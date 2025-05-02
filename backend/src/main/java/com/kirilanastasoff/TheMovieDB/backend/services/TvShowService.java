package com.kirilanastasoff.TheMovieDB.backend.services;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.exception.BadRequestException;
import com.kirilanastasoff.TheMovieDB.backend.model.TvShow;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.kirilanastasoff.TheMovieDB.backend.repository.TvShowRepository;

@Service
@RequiredArgsConstructor
public class TvShowService {

	private final TvShowRepository tvShowRepository;

	public List<TvShow> getAll() {
		return tvShowRepository.findAll();
	}

	public TvShow getById(Long id) {
		return tvShowRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Could not find tv show with id="+id));
	}

	public List<TvShow> findByName(String name) {
		return tvShowRepository.findByNameContaining(name);
	}

	public void deleteById(Long id) {
		tvShowRepository.deleteById(id);
	}
	
	public void deleteAll() {
		tvShowRepository.deleteAll();
	}

	public TvShow create(TvShow tvShow) {
		return tvShowRepository.save(tvShow);
	}

	public List<TvShow> findByFirstAirDate(Date firstAirDate) {
		return tvShowRepository.findByFirstAirDate(firstAirDate);
	}

}
