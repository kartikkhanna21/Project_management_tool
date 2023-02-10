package com.example.demo.web;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.ProjectTask;
import com.example.demo.services.MapValidationErrorService;
import com.example.demo.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,BindingResult result,
																			@PathVariable String backlog_id,Principal principal){
		ResponseEntity<?> errorMap=mapValidationErrorService.MapValidationService(result);
		if(errorMap!=null) {
			return errorMap;
		}
		
		ProjectTask projectTask1=projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());
		
		 return new ResponseEntity<ProjectTask>(projectTask1,HttpStatus.CREATED);
	}
	@GetMapping("/{backlog_id}")
	public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id,Principal principal){
		return projectTaskService.findBacklogById(backlog_id,principal.getName());
	}
	
	@GetMapping("/{backlog_id}/{pt_sequence}")
	public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id,@PathVariable String pt_sequence,Principal principal){
		ProjectTask projectTask=projectTaskService.findPtByProjectSequence(backlog_id, pt_sequence,principal.getName());
		return new ResponseEntity<ProjectTask>(projectTask,HttpStatus.OK);
	}
	
	@PatchMapping("/{backlog_id}/{pt_sequence}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask,BindingResult result,
											@PathVariable String backlog_id,@PathVariable String pt_sequence,Principal principal){
		ResponseEntity<?> errorMap=mapValidationErrorService.MapValidationService(result);
		if(errorMap!=null) {
			return errorMap;
		}
		
		ProjectTask updatedTask=projectTaskService.updateByProjectSequence(projectTask, backlog_id, pt_sequence,principal.getName());
		return new ResponseEntity<ProjectTask>(updatedTask,HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlog_id}/{pt_sequence}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id,@PathVariable String pt_sequence,Principal principal){
		projectTaskService.deletePTByProjectSequence(backlog_id, pt_sequence,principal.getName());
		return new ResponseEntity<String>("Project Task "+ pt_sequence+" was deleted Successfully",HttpStatus.OK);
	}
}
