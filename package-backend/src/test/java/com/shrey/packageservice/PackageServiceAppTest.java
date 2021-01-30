package com.shrey.packageservice;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shrey.packageservice.controller.PackageController;

/**
 * 
 * @author Shrey
 *
 */
@SpringBootTest
public class PackageServiceAppTest {

	@Autowired
	private PackageController packageController;

	@Test
	public void contextLoads() throws Exception {
		assertThat(packageController).isNotNull();
	}
}
