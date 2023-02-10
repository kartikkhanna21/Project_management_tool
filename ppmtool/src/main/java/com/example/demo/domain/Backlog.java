package com.example.demo.domain;

import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class Backlog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer PTsequence=0;
	private String projectIdentifier;
	
	//One to one with project
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="project_id",nullable = false)
	@JsonIgnore
	//jsonignore helps in preventing an infinite recursion between parent and child in relationship
	private Project project;
	//the variable name "project" above is same as mapped by attribute in Project model
	
	//one to many with projecttask
	@OneToMany(fetch=FetchType.EAGER,cascade = CascadeType.REFRESH,mappedBy = "backlog",orphanRemoval = true)
	private List<ProjectTask> projectTasks= new ArrayList<>();
	
	
	public List<ProjectTask> getProjectTasks() {
		return projectTasks;
	}
	public void setProjectTasks(List<ProjectTask> projectTasks) {
		this.projectTasks = projectTasks;
	}
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getPTsequence() {
		return PTsequence;
	}
	public void setPTsequence(Integer pTsequence) {
		PTsequence = pTsequence;
	}
	public String getProjectIdentifier() {
		return projectIdentifier;
	}
	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}
	
	public Backlog() {
		// TODO Auto-generated constructor stub
	}

	
	
}
