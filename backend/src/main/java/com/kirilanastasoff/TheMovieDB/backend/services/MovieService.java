package com.kirilanastasoff.TheMovieDB.backend.services;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.exception.BadRequestException;
import com.kirilanastasoff.TheMovieDB.backend.model.Movie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.kirilanastasoff.TheMovieDB.backend.repository.MovieRepository;

@Service
@RequiredArgsConstructor
public class MovieService {

	private final MovieRepository movieRepository;

	public List<Movie> getAll() {
		return movieRepository.findAll();
	}

	public Movie getById(Long id) {
		return movieRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Could not find movie with id="+id));
	}

	public Movie create(Movie movie){
		return movieRepository.save(movie);
	}
	
	public List<Movie> findByName(String name) {
		return movieRepository.findByNameContaining(name);
	}
	
	public void deleteById(Long id) {
		movieRepository.deleteById(id);
		
	}
	
	public void deleteAll() {
		movieRepository.deleteAll();
	}

	public void update(Long id, Movie newMovie){
		Movie movie = getById(id);
		BeanUtils.copyProperties(newMovie, movie);

		movieRepository.save(movie);
	}
	
	public List<Movie> findByReleaseDate(Date releaseDate) {
		return movieRepository.findByReleaseDate(releaseDate);
	}
	
}
