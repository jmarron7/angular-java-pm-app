package com.cooksys.groupfinal.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@Data
public class Project {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	
	private String description;
	
	private boolean active;
	
	@ManyToOne
	private Team team;

	private Timestamp date;

}