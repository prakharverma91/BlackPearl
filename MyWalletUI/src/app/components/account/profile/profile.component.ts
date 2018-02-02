
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewContainerRef, ViewChild,NgModule } from '@angular/core';
import { NgSwitchCase } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { CommonService } from './../../../services/common.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MainService } from './../../../services/main.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MainService]
})

export class ProfileComponent implements OnInit {
  
  private isAuthenticateSpinner: any = false;
  private selected: any;
  private loginHistoryData: any;
  private addressArray:any=[];
  private formData: any = {};
  public imgurl: any;
  private isTblLoadingDone = false;
  private isEdited = false;
  private uploaded = false;
  
  private data: any = {};
  private countryArray: any = [];
  private userId: any;
  private isFormSubmitted: any = false;
  private fieldErrors: any = {};
  public form: FormGroup;
 
  private newAddress:any ={}
  public address = {"country":"IN","city":"Varnasi","street":"Pan gali","state":"Uttar Pradesh","addressLine":"Indra nagar","addressId":2}


  @ViewChild('updateProfile') addKyctype: any;
  @ViewChild('myInput')
  @ViewChild('addAddress') addAddress: any;
  myInputVariable: any;
  
 
  // constructor(private MainService: MainService, private fb: FormBuilder, public toastr: ToastsManager, public vcr: ViewContainerRef, private router: Router, private modalService: NgbModal) {
  //   this.toastr.setRootViewContainerRef(vcr);
  // }
  constructor(private fb: FormBuilder, private router: Router, public toastr: ToastsManager, public vcr: ViewContainerRef, private CommonService: CommonService, private MainService: MainService, private modalService: NgbModal) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  open(modal) {
    this.modalService.open(modal);
  }
  // open(modal, x) {
	// 	this.selectedItemsInAdd = [];
	// 	this.viewData = x;
	// 	this.modalService.open(modal);
	// }

  selectedIdx: number =0;
  listOfItems: Array<any>
  private numberOfPage = 5;
	private currentPage = 1;

  ngOnInit() {
     this.selectedIdx = 0
    this.fieldErrors = {
      'name': false,
      'password': false
    }
    this.getAllCountries();
     this.userId = localStorage.getItem('userId');
    this.getProfile(this.userId);
  }

  isNextShow(){
    if((this.selectedIdx+1) == this.addressArray.length ){
    return false;
  }
    return true;
 }
 
 isPerviousShow(){
  if(this.selectedIdx != 0){
    return true;
  }
    return false;
 }
 
reloadProfile(){
  let userId = localStorage.getItem('userId');
  this.getProfile(userId);
 }

  getProfile(userId) {
    this.isEdited = false;
    this.isTblLoadingDone = false;
    this.MainService.userProfile(userId).subscribe(
      success => {
        this.data = success.data;
        this.loginHistoryData = this.data.loginHistoryArray;
        this.addressArray = this.data.addressArray || [];
        // this.addressArray.push({"pincode":"23304","contactNo":"8285026150","country":"IN","city":"Kanpur","street":"new colony gali","state":"Uttar Pradesh","addressLine":"balck","addressId":2});
        // this.addressArray.push({"pincode":"23304","contactNo":"8285026150","country":"IN","city":"Varnasi","street":"Pan gali","state":"Uttar Pradesh","addressLine":"Indra nagar","addressId":2});
        // this.addressArray.push({"pincode":"233304","contactNo":"8285026150","country":"IN","city":"GUrGaon","street":"mamtasweet","state":"Haryana","addressLine":"park hospital","addressId":2});
        this.isTblLoadingDone = true;
      },
      error => {
        this.isTblLoadingDone = false;
      }
    )
  }

  edit() {
    this.isEdited = true;
  }

  upload(data, selectedCountry,form) {
    this.isFormSubmitted = true;
    if (form.invalid) {
      return;
    }
 let request:any={};
 request.addressLine=selectedCountry.addressLine;
 request.street=selectedCountry.street;
 request.city=selectedCountry.city;
 request.state=selectedCountry.state;
 request.pincode=selectedCountry.pincode;
 request.contactNo=selectedCountry.contactNo;
 request.country=selectedCountry.country;
 request.addressId=selectedCountry.addressId;
 request.userName=data.userName;

    this.MainService.updateProfile(request, this.userId).subscribe(
      success => {
        this.isFormSubmitted = false;
        this.data = success.data;
        this.toastr.success('Profile updated successfully', null, { toastLife: 900 });
        this.isEdited = false;
      },
      error => {
        this.isFormSubmitted = false;
        error = JSON.parse(error._body);
        this.toastr.error(error.message);
      }
    )
  }

  addNewAddress(isValid, c){    
    this.isFormSubmitted = true;
    if (isValid.invalid) {
      return;
    }
    this.MainService.addNewAddress(this.newAddress, this.userId).subscribe(
      success => {
        this.isFormSubmitted = false;
        this.toastr.success('Address Added successfully', null, { toastLife: 900 });
       this.addressArray.push(success.data);
      },
      error => {
        this.isFormSubmitted = false;
        error = JSON.parse(error._body);
        this.toastr.error(error.message);
      }
    )

  }
 
  getAllCountries() {
     this.countryArray = this.MainService.getCountryArray();
    // this.MainService.getAllCountrys().subscribe(
    //   success => {
    //     this.countryArray = success.data;
    //     // console.log("this.countryArray",this.countryArray);
    //     //this.country = this.countryArray[0].countryName;
    //   },
    //   error => {
    //   }
    // )
  }

 

  checkMaxLength(length, data, messageId) {
    if(data == undefined)
    return true;
    if (data && data.length) {
      if (data.length >= length) {
        this.fieldErrors[messageId] = true;
      }
      else {
        this.fieldErrors[messageId] = false;
      }
    }
    else {
      this.fieldErrors[messageId] = false;
    }
  }

}
