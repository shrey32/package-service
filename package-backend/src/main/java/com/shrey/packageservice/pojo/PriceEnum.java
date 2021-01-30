package com.shrey.packageservice.pojo;

/**
 * 
 * @author Shrey
 *
 */
public enum PriceEnum {

	USD("USD"), EURO("EUR"), GBP("GBP");

	private String type;

	PriceEnum(String type) {
		this.type = type;
	}

	public String getType() {
		return this.type;
	}
}
