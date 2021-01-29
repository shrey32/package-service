package com.jagex.packageservice.store;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;

import com.jagex.packageservice.pojo.Package;
import com.jagex.packageservice.pojo.Product;

/**
 * 
 * Dummy Data Store
 * 
 * @author Shrey
 *
 */
public class DataStore {

	private static List<Package> packages = new ArrayList<>();
	private static Map<String, Product> map = new HashMap<>();

	static {
		productMap();
	}

	public static List<Package> allPackages() {
		if (!packages.isEmpty())
			return packages;
		Package pkg1 = new Package(UUID.randomUUID().toString(), "Weapons Package", "Test Weapons Package");
		pkg1.setProducts(Arrays.asList(map.get("Axe"), map.get("Sword"), map.get("Knife")));
		pkg1.setPrice(sum(pkg1.getProducts()));

		Package pkg2 = new Package(UUID.randomUUID().toString(), "Safety Package", "Test Safety Package");
		pkg2.setProducts(Arrays.asList(map.get("Shield"), map.get("Helmet")));
		pkg2.setPrice(sum(pkg2.getProducts()));

		Package pkg3 = new Package(UUID.randomUUID().toString(), "Coin Package", "Test Coin Package");
		pkg3.setProducts(Arrays.asList(map.get("Platinum"), map.get("Gold"), map.get("Silver")));
		pkg3.setPrice(sum(pkg3.getProducts()));

		Package pkg4 = new Package(UUID.randomUUID().toString(), "Ultra Package", "Test Ultra Package");
		pkg4.setProducts(Arrays.asList(map.get("Shield"), map.get("Helmet"), map.get("Gold")));
		pkg4.setPrice(sum(pkg4.getProducts()));

		Package pkg5 = new Package(UUID.randomUUID().toString(), "Savings Package", "Test Savings Package");
		pkg5.setProducts(Arrays.asList(map.get("Shield"), map.get("Bow"), map.get("Knife")));
		pkg5.setPrice(sum(pkg5.getProducts()));

		Package pkg6 = new Package(UUID.randomUUID().toString(), "Premium Package", "Test Premium Package");
		pkg6.setProducts(Arrays.asList(map.get("Sword"), map.get("Axe"), map.get("Gold")));
		pkg6.setPrice(sum(pkg6.getProducts()));

		packages.add(pkg1);
		packages.add(pkg2);
		packages.add(pkg3);
		packages.add(pkg4);
		packages.add(pkg5);
		packages.add(pkg6);
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

	private static double sum(List<Product> products) {
		return products.stream().map(Product::getPrice).collect(Collectors.summingDouble(Double::doubleValue));
	}

	private static void productMap() {
		map.put("Shield", new Product("VqKb4tyj9V6i", "Shield", 1149));
		map.put("Helmet", new Product("DXSQpv6XVeJm", "Helmet", 999));
		map.put("Sword", new Product("7dgX6XzU3Wds", "Sword", 899));
		map.put("Axe", new Product("PKM5pGAh9yGm", "Axe", 799));
		map.put("Bow", new Product("IJOHGYkY2CYq", "Bow", 649));
		map.put("Knife", new Product("7Hv0hA2nmci7", "Knife", 349));
		map.put("Gold", new Product("500R5EHvNlNB", "Gold Coin", 249));
		map.put("Platinum", new Product("IP3cv7TcZhQn", "Platinum Coin", 399));
		map.put("Silver", new Product("8anPsR2jbfNW", "Silver Coin", 50));
	}

}
