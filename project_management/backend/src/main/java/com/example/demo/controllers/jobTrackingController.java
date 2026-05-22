package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.jobTrackingModel;
import com.example.demo.services.jobTrackingService;

@RestController
@RequestMapping("/api/v1/jobs")
public class jobTrackingController {

	@Autowired
	jobTrackingService jobtrackingservice;

	//authrization
	@GetMapping("/basicauth")
	public String basicAuthCheck() {
		return "success";
	}
	

	@PostMapping("/add-data")
	public void submitData(@RequestBody jobTrackingModel model) {
		jobtrackingservice.createDb(model);
	}
	
	
	@GetMapping("/get-data")
	public  List<jobTrackingModel> getAllData(){
		 return  jobtrackingservice.getAllJobs();
	}
	
	@DeleteMapping("/delete-data/{id}")
	public void deleteData(@PathVariable long id) {
		jobtrackingservice.delete(id);
	}
	
	//getting numbers
	@GetMapping("/dashboard-stats")
	public Map<String, Object> getDashboardStats() {
	    return jobtrackingservice.getDashboardStats();
	}

}
