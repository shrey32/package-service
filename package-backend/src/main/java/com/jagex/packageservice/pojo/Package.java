package com.jagex.packageservice.pojo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.LinkedList;

/**
 * 
 * @author Shrey
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Package {

	private String id;
	private String name, description;
	private List<Product> products = new LinkedList<>();
	private double price;

	public Package() {
	}

	public Package(String name, String description) {
		this.name = name;
		this.description = description;
	}

	public Package(String id, String name, String description) {
		this.id = id;
		this.name = name;
		this.description = description;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Package other = (Package) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
