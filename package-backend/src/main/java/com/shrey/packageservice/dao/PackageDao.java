package com.shrey.packageservice.dao;

import java.util.List;
import java.util.Optional;

import com.shrey.packageservice.pojo.Package;

/**
 * 
 * @author Shrey
 *
 */
public interface PackageDao {

	Optional<Package> create(Optional<Package> optionalPkg);

	Optional<Package> get(String id);

	Optional<Package> update(Optional<Package> optionalPkg);

	boolean delete(String id);

	List<Package> list();

}
