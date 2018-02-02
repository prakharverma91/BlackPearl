import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { NgSwitchCase, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from './../../../services/main.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CountryDocumentMapping } from './kyc-doc-entity';

@Component({
  selector: 'app-country-of-document',
  templateUrl: './country-of-document.component.html',
  styleUrls: ['./country-of-document.component.scss'],
  providers: [MainService]
})
export class CountryOfDocumentComponent {
  constructor(private router: Router, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef, private MainService: MainService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  @ViewChild('addCountryDocumentMap') addCountryDocumentMap: any;
  @ViewChild('editDocument') editDocument: any;

  public isEdit: boolean = false;
  public isSave: boolean = false;
  private forgingtoggle: any = false;
  private numberOfPage = 5;
  private currentPage = 1;
  private isNew = true;
  private isFormSubmitted: any = false;
  private fieldErrors: any = {};
  y = -1;
  countryList: any;
  documentName: any;
  kycdocumenttype: any;
  kycdoc

  countryDocumentMappingArray = [];
  
  countryArray: any = [];
  documentTypeArray: any = [];
  documentMetaArray: any = [];

  // country:any={};
  // kycDocMeta:any={};
  // kycDocType:any={};

  countryDocumentMapping: any = {
    countryId: String,
    kycDocumentMetaId: String,
    kycDocumentTypeId: String,
    isMandatory : false
  }

  kycDocArray: any = [];

  ngOnInit() {
    this.getCountryDocumentMappingArray();
    this.getAllCountries();
    this.getAllDocumentMetas();
    this.getAllDocumentTypes();

  }

  private kycDocumentTypeObj = {};
  public kycDocumentMetaObj: any = {};

  open(modal, selectedData) {
  //  console.log(selectedData)
    this.countryDocumentMapping = {};
    if (selectedData) {
      this.isNew = false;
      this.countryDocumentMapping.countryID = selectedData.country.countryID;
      this.countryDocumentMapping.documentMetaID = selectedData.kycDocumentMeta.kycDocumentMetaID;
      this.countryDocumentMapping.documentTypeID = selectedData.kycDocumentType.kycDocumentTypeID;
      this.countryDocumentMapping.countryDocMappingId = selectedData.countryDocMappingId;
    } else {
      this.isNew = true;
    }
    this.modalService.open(modal);
    this.isEdit = false;
    this.isSave = true;
  }

  getAllCountries() {
    this.MainService.getAllCountries().subscribe(
      success => {
        this.countryArray = success.data;
       // this.countryDocumentMapping.country = this.countryArray[0].countryName;
      },
      error => {
        console.log(error);
      }
    )
  }
  getAllDocumentTypes() {
    this.MainService.getAlldocumenttypes().subscribe(
      success => {
        this.documentTypeArray = success.data;
       // this.countryDocumentMapping.kycDocType = this.documentTypeArray[0].documentType;
      },
      error => {
        console.log(error);
      }
    )
  }
  getAllDocumentMetas() {
    this.MainService.getAllDocumentMetas().subscribe(
      success => {
        this.documentMetaArray = success.data;
       // this.countryDocumentMapping.kycDocMeta = this.documentMetaArray[0].documentName;
      },
      error => {
        console.log(error);
      }
    )
  }

  addCountryDocumentMapping(countryDocumentMapping, form, cb) {
    this.isFormSubmitted = true;
    console.log("data to be send for addd", form.invalid);

    if (form.invalid) {
        return;
    }
    console.log("data  send ", this.countryDocumentMapping);
    this.MainService.addCountryDocumentMapping(this.countryDocumentMapping).subscribe(
      success => {
        cb();

        console.log(success);
        this.isFormSubmitted = false;
        this.toastr.success(success.message);
        this.countryDocumentMappingArray.push(success.data);
        this.getCountryDocumentMappingArray();
      },
      error => {
        console.log(error);
        this.toastr.clearAllToasts();
         this.countryDocumentMapping = {};
        this.isFormSubmitted = false;
        error = JSON.parse(error._body);
        this.toastr.error(error.message);

      }
    )
  }

  getCountryDocumentMappingArray() {
    this.MainService.getCountryDocumentMappingArray().subscribe(success => {
      this.countryDocumentMappingArray = success.data.countryDocMappingArray;
    })
  }

  editCountryDocumentMapping(editData, form, cb) {
    this.isFormSubmitted = true;
   // console.log('Edit data ', editData);
    if (form.invalid) {
      return;
    }
    this.MainService.editCountryDocumentMapping(editData.countryDocMappingId,editData).subscribe(
      success => {
        console.log(success.data);
        this.isFormSubmitted = false;
        this.toastr.success(' Edit successfully')
        this.ngOnInit()
      },
      error => {
        this.isFormSubmitted = false;

      }
    )

  }


}

