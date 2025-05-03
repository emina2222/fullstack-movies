package com.kirilanastasoff.TheMovieDB.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kirilanastasoff.TheMovieDB.backend.model.Visitor;
import com.kirilanastasoff.TheMovieDB.backend.repository.VisitorRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	VisitorRepository visitorRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Visitor visitor = visitorRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserDetailsImpl.build(visitor);
	}

}