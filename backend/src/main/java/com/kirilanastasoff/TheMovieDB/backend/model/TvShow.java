package com.kirilanastasoff.TheMovieDB.backend.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tv_show")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TvShow {

	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "poster_path")
	private String posterPath;

	@Column(name = "overview")
	private String overview;

	@ElementCollection
	@CollectionTable(name = "directors_companies_tv", joinColumns = @JoinColumn(name = "tv_director_id"))
	@Column(name = "production_companies_tv")
	private List<String> productionCompaniesTV;
	
	@Column(name = "vote_average")
	private double voteAverage;

	@Column(name = "vote_count")
	private int voteCount;

	@ElementCollection
	@CollectionTable(name = "tv_genres", joinColumns = @JoinColumn(name = "tv_id"))
	@Column(name = "genres")
	private List<String> genres;

	@Column(name = "the_movie_db_id")
	private Long theMovieDbId;

	@Column(name = "original_name")
	private String originalName;
	
	@Column(name = "first_air_date")
	private Date firstAirDate;

	@Override
	public String toString() {
		return "TV [id=" + id + ", name=" + name + ", posterPath=" + posterPath + ", overview=" + overview
				+ ", productionCompanies=" + productionCompaniesTV + ", voteAverage=" + voteAverage + ", voteCount="
				+ voteCount + ", genres=" + genres + ", theMovieDbId=" + theMovieDbId + ", originalName=" + originalName + ", firstAirDate=" + firstAirDate
				+ ", hashCode()=" + hashCode() + "]";
	}

}
