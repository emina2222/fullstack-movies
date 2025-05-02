package com.kirilanastasoff.TheMovieDB.backend.controller;

import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.model.TvShow;
import com.kirilanastasoff.TheMovieDB.backend.services.TvShowService;
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
@RequestMapping("/tv")
public class TvShowController {

    @Autowired
    private TvShowService tvShowService;

    @GetMapping
    public ResponseEntity<List<TvShow>> getAll() {
        return new ResponseEntity<>(tvShowService.getAll(), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TvShow> getById(@PathVariable("id") Long id) {
        return new ResponseEntity<TvShow>(tvShowService.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TvShow> create(@RequestBody TvShow tvShow) {
        return new ResponseEntity<>(tvShowService.create(tvShow), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") Long id) {
        tvShowService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteTV() {
        tvShowService.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
