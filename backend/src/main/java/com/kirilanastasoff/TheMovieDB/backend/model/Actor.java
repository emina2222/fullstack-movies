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
@Table(name = "actor")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Actor {

	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "adult")
	private boolean adult;

	@ElementCollection
	@CollectionTable(name = "known_as", joinColumns = @JoinColumn(name = "known_as_id"))
	@Column(name = "also_known_as")
	private List<String> productionCompanies;

	@Column(name = "biography", length= 4092)
	private String biography;

	@Column(name = "birth_day")
	private Date birthDay;

	@Column(name = "death_day")
	private Date deadthDay;

	@Column(name = "image")
	private String image;

	@Column(name = "gender")
	private int gender;

	@Column(name = "homepage")
	private String homepage;

	@Column(name = "id_movie_db")
	private Long idMovieDb;

	@Column(name = "id_imdb")
	private String idImdb;

	@Column(name = "known_for_department")
	private String knownForDepartment;

	@Column(name = "name")
	private String name;

	@Column(name = "place_of_birth")
	private String placeOfBirth;

	@Column(name = "popularity")
	private double popularity;

	@Column(name = "profile_path")
	private String profilePath;

	@Override
	public String toString() {
		return "People [id=" + id + ", adult=" + adult + ", productionCompanies=" + productionCompanies + ", biography="
				+ biography + ", birthDay=" + birthDay + ", deadthDay=" + deadthDay + ", image=" + image + ", gender="
				+ gender + ", homepage=" + homepage + ", idMovieDb=" + idMovieDb + ", idImdb=" + idImdb
				+ ", knownForDepartment=" + knownForDepartment + ", name=" + name + ", placeOfBirth=" + placeOfBirth
				+ ", popularity=" + popularity + ", profilePath=" + profilePath + ", hashCode()=" + hashCode() + "]";
	}

}
