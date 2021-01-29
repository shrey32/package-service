package com.jagex.packageservice.store;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

import com.jagex.packageservice.pojo.Package;

/**
 * 
 * Dummy Data Store
 * 
 * @author Shrey
 *
 */
public class PackageStore {

	private static List<Package> packages = new ArrayList<>();

	public static List<Package> allPackages() {
		return packages;
	}

	public static Package get(String id) {
		for (Package pkg : packages) {
			if (id.equals(pkg.getId()))
				return pkg;
		}
		return null;
	}

	public static Package add(Package pkg) {
		pkg.setId(UUID.randomUUID().toString());
		packages.add(pkg);
		return pkg;
	}

	public static Package update(Package pkg) {
		Package found = get(pkg.getId());
		if (found != null) {
			found.setDescription(pkg.getDescription());
			found.setName(pkg.getName());
			found.setProducts(pkg.getProducts());
			return found;
		}
		return null;
	}

	public static boolean delete(String id) {
		for (Package pkg : packages) {
			if (id.equals(pkg.getId())) {
				packages.remove(pkg);
				return true;
			}
		}
		return false;
	}

}
