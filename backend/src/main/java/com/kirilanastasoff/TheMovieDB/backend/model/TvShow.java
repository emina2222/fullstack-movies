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
	@CollectionTable(name = "directors_company_tv", joinColumns = @JoinColumn(name = "id_tv_director"))
	@Column(name = "production_company_tv")
	private List<String> productionCompaniesTV;
	
	@Column(name = "vote_average")
	private double voteAverage;

	@Column(name = "vote_count")
	private int voteCount;

	@ElementCollection
	@CollectionTable(name = "tv_genre", joinColumns = @JoinColumn(name = "id_tv"))
	@Column(name = "genre")
	private List<String> genres;

	@Column(name = "id_movie_db")
	private Long idMovieDb;

	@Column(name = "original_name")
	private String originalName;
	
	@Column(name = "first_air_date")
	private Date firstAirDate;

	@Override
	public String toString() {
		return "TV [id=" + id + ", name=" + name + ", posterPath=" + posterPath + ", overview=" + overview
				+ ", productionCompanies=" + productionCompaniesTV + ", voteAverage=" + voteAverage + ", voteCount="
				+ voteCount + ", genres=" + genres + ", idMovieDb=" + idMovieDb + ", originalName=" + originalName + ", firstAirDate=" + firstAirDate
				+ ", hashCode()=" + hashCode() + "]";
	}

}
