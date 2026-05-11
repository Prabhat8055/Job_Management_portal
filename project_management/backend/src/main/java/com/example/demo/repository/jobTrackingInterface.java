package com.example.demo.repository;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.jobTrackingModel;

@Repository
public interface jobTrackingInterface extends JpaRepository<jobTrackingModel, Long>{

    @Query(value = """
        SELECT 
          COUNT(*) AS total,
          SUM(CASE WHEN status = 'APPLIED' THEN 1 ELSE 0 END) AS applied,
          SUM(CASE WHEN status = 'INTERVIEW' THEN 1 ELSE 0 END) AS interviewing,
          SUM(CASE WHEN status = 'OFFER' THEN 1 ELSE 0 END) AS offers,
          SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) AS rejected
        FROM job_applications
        """, nativeQuery = true)
    Map<String, Object> getDashboardStats();
}
