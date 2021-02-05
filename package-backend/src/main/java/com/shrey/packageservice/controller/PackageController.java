package com.shrey.packageservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shrey.packageservice.pojo.Package;
import com.shrey.packageservice.pojo.PackageResponse;
import com.shrey.packageservice.service.PackageService;

@RestController()
@RequestMapping("/package")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PackageController {

	private PackageService packageService;

	@Autowired
	public PackageController(PackageService packageService) {
		this.packageService = packageService;
	}

	@PostMapping("/create")
	public ResponseEntity<PackageResponse> create(@RequestBody Optional<Package> pkg) {
		Optional<Package> optionalCreatedPkg = packageService.create(pkg);

		if (optionalCreatedPkg.isPresent()) {
			PackageResponse response = new PackageResponse(optionalCreatedPkg.get(), "created");
			return new ResponseEntity<PackageResponse>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<PackageResponse>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<Package> get(@PathVariable String id) {
		Optional<Package> optionalretrievedPackage = packageService.get(id);

		if (optionalretrievedPackage.isPresent())
			return new ResponseEntity<Package>(optionalretrievedPackage.get(), HttpStatus.OK);
		return new ResponseEntity<Package>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/update")
	public ResponseEntity<PackageResponse> update(@RequestBody Optional<Package> pkg) {
		Optional<Package> optionalUpdatedPackage = packageService.update(pkg);

		if (optionalUpdatedPackage.isPresent()) {
			PackageResponse response = new PackageResponse(optionalUpdatedPackage.get(), "updated");
			return new ResponseEntity<PackageResponse>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<PackageResponse>(HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Boolean> delete(@PathVariable String id) {
		boolean isDeleted = packageService.delete(id);

		if (isDeleted) {
			return new ResponseEntity<Boolean>(isDeleted, HttpStatus.OK);
		} else {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/list")
	public ResponseEntity<List<Package>> list() {
		List<Package> packages = packageService.list();
		return new ResponseEntity<List<Package>>(packages, HttpStatus.OK);
	}

}
