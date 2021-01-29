package com.jagex.packageservice.pojo;

/**
 * 
 * @author Shrey
 *
 */
public class PackageResponse {

	private Package pkg;
	private String message;

	public PackageResponse() {

	}

	public PackageResponse(Package pkg, String message) {
		this.pkg = pkg;
		this.message = message;
	}

	public Package getPkg() {
		return pkg;
	}

	public void setPkg(Package pkg) {
		this.pkg = pkg;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
