package com.kirilanastasoff.TheMovieDB.backend.services;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.exception.BadRequestException;
import com.kirilanastasoff.TheMovieDB.backend.model.Actor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.kirilanastasoff.TheMovieDB.backend.repository.ActorRepository;

@Service
@RequiredArgsConstructor
public class ActorService {
	
	private final ActorRepository actorRepository;
	
	public List<Actor> getAll() {
		return actorRepository.findAll();
	}
	
	public Actor getById(Long id) {
		return actorRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Could not find actor with id="+id));
	}
	
	public List<Actor> findByName(String name) {
		return actorRepository.findByNameContaining(name);
	}
	
	public void deleteById(Long id) {
		actorRepository.deleteById(id);
	}
	
	public void deleteAll() {
		actorRepository.deleteAll();
	}
	
	
	public Actor create(Actor actor) {
		return actorRepository.save(actor);
	}
	
	public List<Actor> findByBirthDay(Date birthDay) {
		return actorRepository.findByBirthDay(birthDay);
	}

}
