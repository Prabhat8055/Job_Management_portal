package com.example.demo.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@OpenAPIDefinition(
		info =@Info(
				title = "Job Tracking Application.",
				description= "A unit place where you can list all your applied jobs and change the status. With inbuild Auth application",
				contact= @Contact(
							name= "Prabhat Bhasme",
							url = "https://portfolio-react-bits-so4n.vercel.app/",
							email ="prabhatbhasme@gmail.com"
						),
						version ="1.0",
						summary = "Backend Completed"
				
				),
		security = {
				@SecurityRequirement(
						name="bearerAuth"
						)
		}
		)
@SecurityScheme(
		name="bearerAuth",
		type=SecuritySchemeType.HTTP,
		scheme = "bearer",
		bearerFormat = "JWT"
		)

public class APIDocConfig {

}
