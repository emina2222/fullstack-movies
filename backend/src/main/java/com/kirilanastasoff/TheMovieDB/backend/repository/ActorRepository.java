package com.kirilanastasoff.TheMovieDB.backend.repository;

import java.util.Date;
import java.util.List;

import com.kirilanastasoff.TheMovieDB.backend.model.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {
	List<Actor> findByNameContaining(String name);

	List<Actor> findByHomepage(String homepage);

	List<Actor> findByBirthDay(Date birthDay);

}
