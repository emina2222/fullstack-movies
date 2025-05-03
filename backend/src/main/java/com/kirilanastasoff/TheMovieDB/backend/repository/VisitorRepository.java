package com.kirilanastasoff.TheMovieDB.backend.repository;

import java.util.Optional;

import com.kirilanastasoff.TheMovieDB.backend.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
	
	Optional<Visitor> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

}
