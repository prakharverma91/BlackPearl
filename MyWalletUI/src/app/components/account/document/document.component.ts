import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from './../../authentication/authentication.service';
import { CommonService } from './../../../services/common.service';
import { MainService } from './../../../services/main.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-document',
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.scss'],
	providers: [AuthenticationService, CommonService, MainService]
})
export class DocumentComponent implements OnInit {
	private isFormSubmitted: any = false;
	isAuthenticateSpinner: any = false;
	private fieldErrors = {};
	private userDocumentArray: any = [];
	private doc: any = {};
	private uploaded = false;
	private userId: any;
	public form: FormGroup;
	private isTblLoadingDone = false;
	private formData: any = {};
	private imgurl: any;
	myInputVariable: any;

	constructor(private router: Router, private MainService: MainService, private AuthenticationService: AuthenticationService, public toastr: ToastsManager, public vcr: ViewContainerRef, private CommonService: CommonService, private modalService: NgbModal) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		this.userId = localStorage.getItem('userId');
		this.getUserDocuments(this.userId);

		// this.userDocumentArray = [

		// 			{
		// 				"uploadedAt": "Mon Nov 06 12:31:07 IST 2017",
		// 				"status": "Pending",
		// 				"verifiedBy": null,
		// 				"documentId": 6,
		// 				"url": "assets/images/flat-avatar.png"
		// 			}];
	}

	open(modal) {
		this.modalService.open(modal);
	}


	getUserDocuments(userId: any) {
		this.MainService.getUsersDocuments(userId).subscribe(success => {
			this.userDocumentArray = success.data.documentArray;
			//todo
			this.isTblLoadingDone = true;
		})
	}

	uploadSubmit(doc, id) {

		this.MainService.uploadDoc(this.userId, this.formData).subscribe(
			success => {
				this.isFormSubmitted = true;
				let documentObj: any = success.data;
				this.userDocumentArray.push(documentObj);
				this.toastr.success(success.message);
				//this.getuploadKycUsersDocument();
				this.getUserDocuments(this.userId);
				
			},

			error => {
				error = JSON.parse(error._body);
				this.toastr.error(error.message);

			})
	}

	fileChange(event, uploadfile) {
		console.log("ghh");
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			var fileSize = fileList[0].size;
			if (fileSize / 1000 > 2048) {
				this.toastr.error("File must be less than 2 MB.");
				this.myInputVariable.nativeElement.value = "";

				//event.target.files = [];

			}
			this.uploaded = true;
			var reader = new FileReader();

			reader.onload = (event: any) => {
				this.imgurl = event.target.result;
			}

			reader.readAsDataURL(event.target.files[0]);
			let file: File = fileList[0];
			this.formData = new FormData();
			this.formData.append('file', file);

		}
	}

	getImageUrlForHosting(imgpath: any) {
			let tmp = ""+imgpath;
			var index = tmp.indexOf("assets");
			var tmpPath = "";
		
			if (index != -1) {
			  tmpPath = imgpath.substring(index);
			  return tmpPath;
			}
			//assets/images/
		}

}

