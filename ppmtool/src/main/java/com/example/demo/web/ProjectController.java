package com.example.demo.web;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Project;
import com.example.demo.services.MapValidationErrorService;
import com.example.demo.services.ProjectService;

@CrossOrigin
@RestController
@RequestMapping("/api/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MapValidationErrorService  mapValidationErrorService;
	
	@PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result,Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Project project1 = projectService.saveOrUpdateProject(project,principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }
	
	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectById(@PathVariable String projectId,Principal principal){
		Project project=projectService.findProjectByIdentifier(projectId,principal.getName());
		return new ResponseEntity<Project>(project,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<Project> getAllProjects(Principal principal){
		return projectService.findAllProjects(principal.getName());
	}
	
	@DeleteMapping("/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal){ 
		projectService.deleteProjectByIdentifier(projectId,principal.getName());
		return new ResponseEntity<String>("The project with ID '"+projectId.toUpperCase()+"' was deleted successfully.",HttpStatus.OK);
	}
	
	
//	this update logic works but we dont have to code as jpa automaticatically detects a change in Project object if we pass the id of object as a post request to "/api/project".
//	@PutMapping("/{projectId}")
//	public ResponseEntity<?> updateProject(@Valid  @RequestBody Project updatedProject,@PathVariable String projectId){
//		Project project = projectService.updateProjectByIdentifier(updatedProject,projectId);
//		return new ResponseEntity<Project>(project,HttpStatus.OK);
//		
//	}

}
