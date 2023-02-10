package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Backlog;
import com.example.demo.domain.Project;
import com.example.demo.domain.User;
import com.example.demo.exceptions.ProjectIdException;
import com.example.demo.exceptions.ProjectNotFoundException;
import com.example.demo.repositories.BacklogRepository;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Project saveOrUpdateProject(Project project,String username) {
		if(project.getId()!=null) {
			Project existingProject=projectRepository.findByprojectIdentifier(project.getProjectIdentifier());
			if(existingProject!=null && (!existingProject.getProjectLeader().equals(username))) {
				throw new ProjectNotFoundException("Project does not belong to your account");
			}
			else if(existingProject==null) {
				throw new ProjectNotFoundException("Project With ID: '"+project.getProjectIdentifier()+"' cannot be updated because it does not exist");
			}
		}
		
		//logic
		try {
			User user = userRepository.findByUsername(username);
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
			
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			//condition when project object is created
            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }
            
            //condition when project object is updated
            if(project.getId() != null){ 
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }
			
			return projectRepository.save(project);	
			
		}
		catch(Exception e) {
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists" );
		}

	}
	
	public Project findProjectByIdentifier(String projectId, String username) {
		  //Only want to return the project if the user looking for it is the owner

        Project project = projectRepository.findByprojectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Project ID '"+projectId+"' does not exist");

        }

        if(!project.getProjectLeader().equals(username)){
            throw new ProjectNotFoundException("Project not found in your account");
        }



        return project;
	}
	
	public Iterable<Project> findAllProjects(String username){
		return projectRepository.findAllByProjectLeader(username);
	}
	
	public void deleteProjectByIdentifier(String projectId,String username) {

		projectRepository.delete(findProjectByIdentifier(projectId,username));
	}
	
//	public Project updateProjectByIdentifier(Project updatedProject,String projectId) {
//		Project existingProject=projectRepository.findByprojectIdentifier(projectId);
//		if(existingProject==null) {
//			throw new ProjectIdException("Cannot Update Project with ID '"+projectId+"'. The project doesn't exist");
//		}
//		
//		existingProject.setDescription(updatedProject.getDescription());
//		existingProject.setProjectName(updatedProject.getProjectName());
//		
//		return projectRepository.save(existingProject);
//	}

}
