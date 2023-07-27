package com.cooksys.groupfinal.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Entity
@Table(name = "user_table")
@NoArgsConstructor
@Data
public class User {
	
	@Id
	@GeneratedValue
	private Long id;

  @Embedded
  @Column(nullable = false)
  private Credentials credentials;
	
  @Embedded
  @Column(nullable = false)
  private Profile profile;
	
	private boolean active = true;

	private boolean admin = false;
	
	private String status = "PENDING";
	
	@OneToMany(mappedBy = "author")
	@EqualsAndHashCode.Exclude
	private Set<Announcement> announcements = new HashSet<>();
	
	@ManyToMany
	@JoinTable(
			name = "company_employees",
			joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id")
	)
	@EqualsAndHashCode.Exclude
	private Set<Company> companies = new HashSet<>();
	
	@ManyToMany(mappedBy = "teammates")
	@EqualsAndHashCode.Exclude
	private Set<Team> teams = new HashSet<>();

}
