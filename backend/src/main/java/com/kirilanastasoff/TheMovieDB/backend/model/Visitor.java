package com.kirilanastasoff.TheMovieDB.backend.model;

import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "visitor", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Visitor {

	@Id
	@GeneratedValue
	private Long id;

	@Size(max = 20)
	@Column(name = "username")
	private String username;

	@Size(max = 40)
	@Column(name = "email")
	private String email;

	@Size(max = 80)
	@Column(name = "password")
	private String password;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "visitor_2_role",
			joinColumns = @JoinColumn(name = "id_visitor"),
			inverseJoinColumns = @JoinColumn(name = "id_role")
	)
	private Set<Role> roles = new HashSet<>();

	public Visitor( @Size(max = 20) String username, @Size(max = 40) String email,
				 @Size(max = 80) String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", roles="
				+ roles + ", hashCode()=" + hashCode() + "]";
	}

}
