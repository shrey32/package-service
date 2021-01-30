package com.shrey.packageservice.pojo;

/**
 * 
 * @author Shrey
 *
 */
public enum PriceEnum {

	USD("usd"), EURO("euro"), POUND("pound");

	private String type;

	PriceEnum(String type) {
		this.type = type;
	}

	public String getType() {
		return this.type;
	}
}
