package com.jagex.packageservice;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 
 * @author Shrey
 *
 */
@SpringBootApplication
public class PackageServiceApp {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(PackageServiceApp.class);
		app.setBannerMode(Banner.Mode.OFF);
		app.run(args);
	}

}
