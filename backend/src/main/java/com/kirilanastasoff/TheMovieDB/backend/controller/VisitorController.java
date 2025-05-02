package com.kirilanastasoff.TheMovieDB.backend.controller;

import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.model.Visitor;
import com.kirilanastasoff.TheMovieDB.backend.services.VisitorService;
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
@RequestMapping("/visitor")
public class VisitorController {

	@Autowired
	private VisitorService visitorService;

	@GetMapping
	public ResponseEntity<List<Visitor>> getAll() {
		return new ResponseEntity<>(visitorService.getAll(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Visitor> getById(@PathVariable("id") Long id) {
		return new ResponseEntity<>(visitorService.getById(id), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Visitor> create(@RequestBody Visitor visitor) {
		return new ResponseEntity<>(visitorService.create(visitor), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") Long id) {
		visitorService.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@DeleteMapping
	public ResponseEntity<HttpStatus> delete() {
		visitorService.deleteAll();
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
