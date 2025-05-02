package com.kirilanastasoff.TheMovieDB.backend.repository;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
	List<Visitor> findByNameContaining(String name);

	List<Visitor> findByHomepage(String homepage);

	List<Visitor> findByBirthDay(Date birthDay);

}
