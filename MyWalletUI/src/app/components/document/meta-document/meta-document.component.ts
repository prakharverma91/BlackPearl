import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { NgSwitchCase, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from './../../../services/main.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsDropdownModule } from 'ngx-bootstrap';

@Component({
	selector: 'app-meta-document',
	templateUrl: './meta-document.component.html',
	styleUrls: ['./meta-document.component.scss'],
	providers: [MainService]
})
export class MetaDocumentComponent {
	
	@ViewChild('addKyc') addKyc: any;
	@ViewChild('editDocument') editDocument: any;
	
	constructor(private router: Router, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef, private MainService: MainService) {
		this.toastr.setRootViewContainerRef(vcr);
	}
	public form: FormGroup;
	private isFormSubmitted: any = false;
	private fieldErrors: any = {};
	private forgingtoggle: any = false;
	private numberOfPage = 5;
	private currentPage = 1;
	public documentMetaArray: any = [];
	public documentMetaObj: any = {};
	private isNew = true;
   
	ngOnInit() {
		this.MainService.getAllDocumentMetas().subscribe(
			success => {
				this.documentMetaArray = success.data;
			},
			error => {
				error = JSON.parse(error._body);
				this.toastr.error(error.message);			 
			}
		)
	}

	open(modal, x) {
		this.documentMetaObj = {};
		if (x) {
			this.isNew = false;
			this.documentMetaObj = x;

		} else {
			this.isNew = true;
		}
		this.modalService.open(modal);
	}

	addDocumentMeta(kycDocumentMeta, form, cb) {
		this.isFormSubmitted = true;
		// console.log("data to be send for addd", form.invalid);
		if (form.invalid) {
			return;
		}
		// console.log(kycDocumentMeta);
		let requestData = {
			documentName: kycDocumentMeta.documentName,
			description: kycDocumentMeta.description
		};
		this.MainService.addDocumentMeta(requestData).subscribe(
			success => {
				cb();
				this.isFormSubmitted = false;
				this.toastr.success(success.message)
				this.ngOnInit()
	                
			},
			error => {
				this.documentMetaObj = {};
				this.isFormSubmitted = false;
				error = JSON.parse(error._body);
				this.toastr.clearAllToasts();
				this.toastr.error(error.message);
			}
		)

	}

	editDocumentMeta(editData, form, cb) {
		this.isFormSubmitted = true;
		// console.log('Edit data ', editData);
		if (form.invalid) {
			return;
		}
		let id = editData.documentMetaID;
		let requestData = {
			documentName: editData.documentName,
			description: editData.description
		};
		//delete editData['kycDocumentMetaID'];
		this.MainService.editDocumentMeta(id, requestData).subscribe(
			success => {
				// console.log(success.data);
				this.isFormSubmitted = false;
				this.toastr.success(success.message);
				this.ngOnInit()
			},
			error => {
				// console.log(error);
				this.isFormSubmitted = false;
				error = JSON.parse(error._body);
				this.toastr.error(error.message);
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


}
