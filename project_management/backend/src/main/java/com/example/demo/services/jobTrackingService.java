package com.example.demo.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.jobTrackingModel;
import com.example.demo.repository.jobTrackingInterface;

@Service
public class jobTrackingService {
	@Autowired
	jobTrackingInterface jobTrackingInterface;
	
	public void createDb(jobTrackingModel model) {
		jobTrackingInterface.save(model);
	}
	
	//getting all data form db
	public List<jobTrackingModel> getAllJobs(){
		return jobTrackingInterface.findAll();
	}
	
	//delete data by id
	public void delete(long id) {
		jobTrackingInterface.deleteById(id);
	}

	//getting numbers
	public Map<String, Object> getDashboardStats() {
        return jobTrackingInterface.getDashboardStats();
    }
	
}
