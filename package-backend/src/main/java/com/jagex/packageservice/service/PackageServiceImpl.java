package com.jagex.packageservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jagex.packageservice.dao.PackageDao;
import com.jagex.packageservice.pojo.Package;

@Service
public class PackageServiceImpl implements PackageService {

	private PackageDao packageDao;

	@Autowired
	public PackageServiceImpl(PackageDao packageDao) {
		this.packageDao = packageDao;
	}

	@Override
	public Optional<Package> create(Optional<Package> optionalPkg) {
		if (optionalPkg.isEmpty())
			return Optional.empty();
		return packageDao.create(optionalPkg);
	}

	@Override
	public Optional<Package> get(String id) {
		return packageDao.get(id);
	}

	@Override
	public Optional<Package> update(Optional<Package> optionalPkg) {
		if (optionalPkg.isEmpty())
			return Optional.empty();
		return packageDao.update(optionalPkg);
	}

	@Override
	public boolean delete(String id) {
		return packageDao.delete(id);
	}

	@Override
	public List<Package> list() {
		return packageDao.list();
	}

}
