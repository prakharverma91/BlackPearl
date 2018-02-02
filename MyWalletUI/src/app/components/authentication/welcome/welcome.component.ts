// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';


// @Component({
//   selector: 'app-welcome',
//   templateUrl: './welcome.component.html',
//   styleUrls: ['./welcome.component.scss']
// })
// export class WelcomeComponent implements OnInit {
//   private welcome:any = {};

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss', './logincss/main.less'],
	providers: []
})
export class WelcomeComponent implements OnInit {
	private notification: any = {};
	private isSuccess: any;
private login:any={};
private fieldErrors:any = {};
private isFormSubmitted:any = false;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, public toastr: ToastsManager, public vcr: ViewContainerRef, private modalService: NgbModal) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	open(modal) {
		this.modalService.open(modal);
	}

	submit() {
		console.log("print");
	}


	ngOnInit() {

	}
// max length validation
checkMaxLength(length, data, messageId){
	if(data && data.length) {
		if(data.length >= length) {
			this.fieldErrors[messageId] = true;
		}
		else{
			this.fieldErrors[messageId] = false;
		}
	}
	else{
		this.fieldErrors[messageId] = false;
	}
}
	trimLeadingAndTrailing() {
		// if(this.signinForm.email){
		//  this.signinForm.email = this.signinForm.email.trim();
		// }
	}
}
