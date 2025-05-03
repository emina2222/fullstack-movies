package com.kirilanastasoff.TheMovieDB.backend.controller;

import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.model.Actor;
import com.kirilanastasoff.TheMovieDB.backend.services.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/actor")
public class ActorController {

	@Autowired
	private ActorService actorService;

	@GetMapping
	public ResponseEntity<List<Actor>> getAll() {
		return new ResponseEntity<>(actorService.getAll(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Actor> getById(@PathVariable("id") Long id) {
		return new ResponseEntity<>(actorService.getById(id), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Actor> create(@RequestBody Actor actor) {
		return new ResponseEntity<>(actorService.create(actor), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") Long id) {
		actorService.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@DeleteMapping
	public ResponseEntity<HttpStatus> delete() {
		actorService.deleteAll();
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
