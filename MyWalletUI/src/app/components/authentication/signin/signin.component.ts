import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { CommonService } from './../../../services/common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss', './logincss/main.less'],
	providers: [AuthenticationService, CommonService]
})

export class SigninComponent implements OnInit {
	isAuthenticateSpinner: any = false;
	private notification: any = {};
	private password: any;
	private login = {};
	private fieldErrors: any = {};
	private isFormSubmitted: any = false;
	private clearToast: any = false;

	@ViewChild('signinForm') signinForm: any;
	public form: FormGroup;
	constructor(
		private AuthenticationService: AuthenticationService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, public toastr: ToastsManager, public vcr: ViewContainerRef, private CommonService: CommonService) {
		// this.toastr.setRootViewContainerRef(vcr);
		// if(localStorage.getItem('issignup') === 'true'){
		// 	this.toastr.success('Link has been sent to your Email.Please Verify your Email address.');
		// 	localStorage.setItem('issignup','false')
		// }

		this.toastr.setRootViewContainerRef(vcr);
		// if(localStorage.getItem('isforgotpassword') === 'true'){
		// 	this.toastr.success('Link has been sent to your Email.Please Verify your Email address.');
		// 	localStorage.setItem('isforgotpassword','false')
		// }

	}

	ngOnInit() {

	}

	// login submit
	loginSubmit() {
		this.isFormSubmitted = true;
		//this.router.navigate ( [ '/dashboard' ] );

		if (!this.signinForm.valid) {
			return;
		}
		this.isAuthenticateSpinner = true;
		this.AuthenticationService.userLogin(this.login).subscribe(
			success => {

				console.log(success);
				if(success.data.lastLogin == null){
					success.data.lastLogin={}
					success.data.lastLogin.loginIP = "0.0.0.0"
				    success.data.lastLogin.loginTime="first login"
				}
				localStorage.setItem('loginIP', success.data.lastLogin.loginIP);
				localStorage.setItem('loginTime', success.data.lastLogin.loginTime);
				localStorage.setItem('email', success.data.email);
				localStorage.setItem('roleName', success.data.role.roleName);
				localStorage.setItem('userId', success.data.userId);
				localStorage.setItem('profileImgUrl', success.data.upLoadProfilePic);

				this.isFormSubmitted = false;
				this.toastr.success(success.message);
				this.router.navigate(['/dashboard']);

				//  if(success.data.token){
				// 	this.CommonService.setToken(success.data.token);
				// 	this.router.navigate ( [ '/dashboard' ] );
				// }
			},
			error => {
				console.log("inside erroor ");
				if (error.status === 0) {
					this.toastr.error("Server is not responding.");
					this.isAuthenticateSpinner = false;
					return;
				}
				this.isAuthenticateSpinner = false;
				this.isFormSubmitted = false;
				error = JSON.parse(error._body);
				this.toastr.error(error.message, null, { toastLife: 900 });
				this.login = {};

			}
		)
	}


	// max length validation
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

	trimLeadingAndTrailing() {
		if (this.signinForm.email) {
			this.signinForm.email = this.signinForm.email.trim();
		}
	}
}
