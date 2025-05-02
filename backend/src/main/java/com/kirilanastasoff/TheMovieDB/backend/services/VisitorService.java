package com.kirilanastasoff.TheMovieDB.backend.services;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.exception.BadRequestException;
import com.kirilanastasoff.TheMovieDB.backend.model.Visitor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.kirilanastasoff.TheMovieDB.backend.repository.VisitorRepository;

@Service
@RequiredArgsConstructor
public class VisitorService {
	
	private final VisitorRepository visitorRepository;
	
	public List<Visitor> getAll() {
		return visitorRepository.findAll();
	}
	
	public Visitor getById(Long id) {
		return visitorRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Could not find visitor with id="+id));
	}
	
	public List<Visitor> findByName(String name) {
		return visitorRepository.findByNameContaining(name);
	}
	
	public void deleteById(Long id) {
		visitorRepository.deleteById(id);		
	}
	
	public void deleteAll() {
		visitorRepository.deleteAll();
	}
	
	
	public Visitor create(Visitor visitor) {
		return visitorRepository.save(visitor);
	}
	
	public List<Visitor> findByBirthDay(Date birthDay) {
		return visitorRepository.findByBirthDay(birthDay);
	}

}
