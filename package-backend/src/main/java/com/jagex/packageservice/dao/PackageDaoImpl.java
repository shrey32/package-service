package com.jagex.packageservice.dao;

import java.util.List;
import java.util.Optional;
import com.jagex.packageservice.pojo.Package;
import com.jagex.packageservice.store.DataStore;

import org.springframework.stereotype.Repository;

/**
 * 
 * @author Shrey
 *
 */
@Repository
public class PackageDaoImpl implements PackageDao {

	@Override
	public Optional<Package> create(Optional<Package> optionalPkg) {
		Package pkg = optionalPkg.get();
		return Optional.of(DataStore.add(pkg));
	}

	@Override
	public Optional<Package> get(String id) {
		Package pkg = DataStore.get(id);
		return Optional.ofNullable(pkg);
	}

	@Override
	public Optional<Package> update(Optional<Package> optionalPkg) {
		Package pkg = optionalPkg.get();
		return Optional.ofNullable(DataStore.update(pkg));
	}

	@Override
	public boolean delete(String id) {
		return DataStore.delete(id);
	}

	@Override
	public List<Package> list() {
		return DataStore.allPackages();
	}

}
