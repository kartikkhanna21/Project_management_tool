package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Backlog;
import com.example.demo.domain.Project;
import com.example.demo.domain.ProjectTask;
import com.example.demo.exceptions.ProjectNotFoundException;
import com.example.demo.repositories.BacklogRepository;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectService projectService;
	
	public ProjectTask addProjectTask(String projectIdentifier,ProjectTask projectTask , String username) {
        //Exceptions: Project not found

			
            //PTs to be added to a specific project, project != null, BL exists
            Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier,username).getBacklog();
            //set the bl to pt
            projectTask.setBacklog(backlog);
            //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
            Integer BacklogSequence = backlog.getPTsequence();
            // Update the BL SEQUENCE
            BacklogSequence++;

            backlog.setPTsequence(BacklogSequence);

            //Add Sequence to Project Task
            projectTask.setProjectSequence(backlog.getProjectIdentifier()+"-"+BacklogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            //INITIAL priority when priority null

            //INITIAL status when status is null
            if(projectTask.getStatus()==""|| projectTask.getStatus()==null){
                projectTask.setStatus("TO_DO");
            }

            if(projectTask.getPriority()==null ||projectTask.getPriority()==0){ //In the future we need projectTask.getPriority()== 0 to handle the form
                projectTask.setPriority(3);
            }

            return projectTaskRepository.save(projectTask);
        }
  


		
	
	
	public Iterable<ProjectTask> findBacklogById(String id,String username){
		projectService.findProjectByIdentifier(id, username);
		
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
	}
	
	public ProjectTask findPtByProjectSequence(String backlog_id,String pt_sequence,String username) {
		projectService.findProjectByIdentifier(backlog_id, username);
		
		ProjectTask projectTask=projectTaskRepository.findByProjectSequence(pt_sequence);
		
		if(projectTask==null) {
			throw new ProjectNotFoundException("Project Task '"+ pt_sequence+"' not found");
		}
		
		if(!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("Project Task '"+pt_sequence+"' does not exist in project '"+backlog_id+"'.");
		}
		return projectTask;
	}
	
	public ProjectTask updateByProjectSequence(ProjectTask updatedProjectTask,String backlog_id,String pt_sequence,String username) {
		ProjectTask projectTask=findPtByProjectSequence(backlog_id, pt_sequence,username);
		projectTask=updatedProjectTask;
		return projectTaskRepository.save(projectTask);
	}
	
	public void deletePTByProjectSequence(String backlog_id,String pt_sequence,String username) {
		ProjectTask projectTask=findPtByProjectSequence(backlog_id, pt_sequence,username);
		projectTaskRepository.delete(projectTask);
	}
}
