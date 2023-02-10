package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

	@Override
	default Iterable<Project> findAllById(Iterable<Long> ids) {
		// TODO Auto-generated method stub
		return null;
	}
	
	Iterable<Project> findAllByProjectLeader(String username);
	
	Project findByprojectIdentifier(String projectId); //jpa repository automatically returns project by identifier
	//not necessary to define declaration as these methods are already accessible by projectrepository object
	
}
