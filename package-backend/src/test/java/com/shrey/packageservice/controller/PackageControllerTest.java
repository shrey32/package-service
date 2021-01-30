package com.shrey.packageservice.controller;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.shrey.packageservice.pojo.Package;
import com.shrey.packageservice.pojo.PackageResponse;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

/**
 * 
 * @author Shrey
 *
 */
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class PackageControllerTest {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void createTest() throws Exception {
		ResponseEntity<PackageResponse> pkgResponse = this.restTemplate.postForEntity(
				"http://localhost:" + port + "/package/create", Optional.of(new Package("Package 1", "Test Package")),PackageResponse.class);
		assertThat(pkgResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(pkgResponse).isNotNull();
		assertThat(pkgResponse.getBody().getPkg().getId()).isNotNull();
	}

	@Test
	public void listTest() throws Exception {
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/package/list", Package[].class))
				.isEmpty();
	}

}
