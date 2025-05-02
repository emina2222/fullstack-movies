package com.kirilanastasoff.TheMovieDB.backend.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "movie")
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Movie {

	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "image")
	private String image;

	@Column(name = "overview")
	private String overview;

	@ElementCollection
	@CollectionTable(name = "directors_companies", joinColumns = @JoinColumn(name = "director_id"))
	@Column(name = "production_companies")
	private List<String> productionCompanies;

	@Column(name = "user_score")
	private int userScore;

	@Column(name = "status")
	private String status;

	@ElementCollection
	@CollectionTable(name = "movies_genres", joinColumns = @JoinColumn(name = "movies_id"))
	@Column(name = "genres")
	private List<String> genres;

	@Column(name = "duration")
	private int duration;

	@Column(name = "the_movie_db_id")
	private Long theMovieDbId;
	
	@Column(name = "release_date")
	private Date releaseDate;
	
	@Override
	public String toString() {
		return "Movie [id=" + id + ", name=" + name + ", image=" + image + ", overview=" + overview
				+ ", productionCompanies=" + productionCompanies + ", userScore=" + userScore + ", status=" + status
				+ ", genres=" + genres + ", duration=" + duration + ", theMovieDbId=" + theMovieDbId + ", releaseDate="
				+ releaseDate + ", hashCode()=" + hashCode() + "]";
	}



}
