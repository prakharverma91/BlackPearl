package com.mywallet.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer addressId;
	
	@NotNull(message="country cannot be null")
	@NotEmpty(message="country can not be empty")
	private String country;
	
	@NotNull(message="state cannot be null")
	@NotEmpty(message="state can not be empty")
	private String state;
	
	@NotNull(message="city cannot be null")
	@NotEmpty(message="city can not be empty")
	private String city;
	
	private String street;
	
	@NotNull(message="addressLine cannot be null")
	@NotEmpty(message="addressLine can not be empty")
	private String addressLine;
	
	@NotNull(message="pincode cannot be null")
	@NotEmpty(message="pincode can not be empty")
	private String pincode;
	
	@Pattern(regexp="^(0|[1-9][0-9]*)$",message="contactNo is not valid format")
	@Size(min=9,message="contactNo must be atleast 9 characters !")
	@NotNull(message="contactNo cannot be null")
	@NotEmpty(message="contactNo can not be empty")
	private String contactNo;
	
	
	@ManyToOne
	private User user;
	
	public Address(){
		
	}
	
    public Address(String country,User user){
    	this.country = country;
    	this.user = user;
	}

	public Address(String country, String state, String city, String street, String addressLine,String pincode, String contactNo){
		this.country = country;
		this.state = state;
		this.city = city;
		this.street = street;
		this.addressLine = addressLine;
		this.pincode = pincode;
		this.contactNo = contactNo;	
	}
	
	public Address(String country, String state, String city, String street, String addressLine,String pincode, String contactNo, User user) {
			
		this.country = country;
		this.state = state;
		this.city = city;
		this.street = street;
		this.addressLine = addressLine;
		this.pincode = pincode;
		this.contactNo = contactNo;
		this.user = user;
	}

	public Integer getAddressId() {
		return addressId;
	}

	public void setAddressId(Integer addressId) {
		this.addressId = addressId;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getAddressLine() {
		return addressLine;
	}

	public void setAddressLine(String addressLine) {
		this.addressLine = addressLine;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	

}
