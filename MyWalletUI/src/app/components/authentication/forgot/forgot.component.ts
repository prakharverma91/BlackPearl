import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthenticationService } from './../authentication.service';
import { CommonService } from './../../../services/common.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss','./../signin/logincss/main.less'],
  providers: [AuthenticationService, CommonService]
})
export class ForgotComponent implements OnInit {
  private forgot:any = {};
  private notification:any = {};
  private isFormSubmitted:any = false;
  private isAuthenticateSpinner:any = false;
  private resetPassword:any = false;
  private isPasswordMatched:any;
  private resetPasswordToken:any;
  private isError = false;
  private changePassword:any = {}
	private fieldErrors:any = {};

  @ViewChild('forgotPasswordFrom') forgotPasswordFrom:any;
  @ViewChild('updatePasswordFrom') updatePasswordFrom:any;
  public form: FormGroup;
  constructor(private AuthenticationService: AuthenticationService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, public toastr: ToastsManager, public vcr: ViewContainerRef, private CommonService: CommonService) {
	  this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.resetPasswordToken = '';
	this.activatedRoute.queryParamMap.subscribe((search: any) => {
		this.resetPasswordToken = search.params.token;
		if(search.params.token) {
			this.resetPassword = true;
		};
    });
	this.fieldErrors = {
		'newPassword': false
	}
  }

  passwordUpdate() {

		console.log('run')
		console.log(this.changePassword);
		this.isFormSubmitted = true;
		if(!this.updatePasswordFrom.valid || !this.checkpasswrd()){
			return;
		} 
	  this.isAuthenticateSpinner = true;
	  this.AuthenticationService.updatePassword(this.resetPasswordToken, this.changePassword).subscribe(
		success => {
		
			
			this.isAuthenticateSpinner = false;
			this.toastr.success(success.message);

			this.changePassword = {};
			this.isFormSubmitted = false;
			
	
			// setTimeout(()=>{    
			
			// 	this.router.navigateByUrl('/');
			// 	 },2000);
				 
			// this.router.navigateByUrl('/')
		
			
			setTimeout(()=>{  
				 	this.router.navigateByUrl('/')
				  this.isAuthenticateSpinner = false;
			 },2000);
			
		},

		error => {
			if(error.status === 0){
				this.toastr.error("Server is not responding.");
				this.isAuthenticateSpinner = false;
				return;
			}
			error = JSON.parse(error._body);
			this.toastr.error(error.message);
			
//used for routing when token get expired
			setTimeout(()=>{  
				this.router.navigateByUrl('/')
			this.isAuthenticateSpinner = false;
			},2000);
//finished
			this.changePassword = {};
			this.isFormSubmitted = false; 
		}
			
		
	)
  }
  
  forgotSubmit() {
 this.isError = false;
	this.isFormSubmitted = true;
	if(!this.forgotPasswordFrom.valid){
		return;
	} 
	this.isAuthenticateSpinner = true;
    this.AuthenticationService.forgotPassword(this.forgot).subscribe(
		success => {
			this.isAuthenticateSpinner = false;
			this.forgot = {};
			this.isFormSubmitted = false;
			localStorage.setItem('isforgotpassword','true'	)	
		
			this.router.navigateByUrl('/')
		},
		error => {
			this.isError = true;
			if(error.status === 0){
				this.toastr.error("Server is not responding.");
				this.isAuthenticateSpinner = false;
				return;
			}
			error = JSON.parse(error._body)
			this.toastr.error(error.message);
			this.isAuthenticateSpinner = false;
			this.forgot = {};
			this.isFormSubmitted = false;
		}
	)
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
  
   // for password match
  checkpasswrd()
    {
     this.isPasswordMatched =  this.changePassword.newPassword == this.changePassword.confirmPassword;
	 return this.isPasswordMatched;
    }
	
	trimLeadingAndTrailing() {
		if (this.forgotPasswordFrom.email) {
			this.forgotPasswordFrom.email = this.forgotPasswordFrom.email.trim();
		}
	}
	

}
