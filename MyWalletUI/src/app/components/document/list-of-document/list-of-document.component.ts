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

@Component({
  selector: 'app-list-of-document',
  templateUrl: './list-of-document.component.html',
  styleUrls: ['./list-of-document.component.scss'],
  providers: [MainService]
})
export class ListOfDocumentComponent {
 
  @ViewChild('addKyctype') addKyctype: any;
  @ViewChild('editDocument') editDocument: any;
  constructor(private router: Router, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef, private MainService: MainService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  private isFormSubmitted: any = false;
  private fieldErrors: any = {};
  private forgingtoggle: any = false;
  private numberOfPage = 5;
  private currentPage = 1;
  private document: any = {};
  public documentTypeArray: any = [];
  public documentTypeObj: any = {};
  private addKYCDocumentTypes = {};
  private isNew = true;
  public form: FormGroup;
  private falgclose: any;
  ngOnInit() {
    this.MainService.getAlldocumenttypes().subscribe(
      success => {
        this.documentTypeArray = success.data;
      },
      error => {
        error = JSON.parse(error._body);
        this.toastr.error(error.message);
      }
    )

  }

  open(modal, x) {
   // documentTypeObj
    this.documentTypeObj = {};
   console.log("x isssssssssss"+x);
    if (x) {
      this.isNew = false;
      this.documentTypeObj = x;

    } else {
      this.isNew = true;
    }
    this.modalService.open(modal);
  }

  
  addDocumentType(KYCDocumentType, form, cb) {
    this.isFormSubmitted = true;
    if (form.invalid) {
      return;
    }
  
    this.MainService.addDocumentType(KYCDocumentType).subscribe(
      success => {
        cb();
        this.isFormSubmitted = false;
        this.toastr.success(success.message)
        this.ngOnInit()
      },
      error => {
        // console.log(error);
        error = JSON.parse(error._body);
        this.toastr.clearAllToasts();
         this.documentTypeObj = {};
        this.toastr.error(error.message);
        this.isFormSubmitted = false;

      }

    )

  }

  checkMaxLength(length, data, messageId) {
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

  editKycDocumentType(editData, form, cb) {
    // console.log('Edit data ', editData);
    if (form.invalid) {
      return;
    }
    let id = editData.documentTypeID;
    //delete editData['id'];
    this.MainService.editDocumentType(id, editData).subscribe(
      success => {
        // console.log(success.data);
        this.isFormSubmitted = false;
        this.toastr.success(' Edit successfully')
        this.ngOnInit()
      },
      error => {
        this.isFormSubmitted = false;
        error = JSON.parse(error._body);
        this.toastr.error(error.message);
      }
    )

  }

}

