import { Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from './../../authentication/authentication.service';
import { CommonService } from './../../../services/common.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
    providers: [AuthenticationService, CommonService]
})
export class ChangepasswordComponent implements OnInit {
  private isFormSubmitted:any = false;
  isAuthenticateSpinner:any = false;
  private passwordRenewal = {};
  private fieldErrors = {};

  @ViewChild('passwordRenewalFrom') passwordRenewalFrom:any;
  constructor(private router: Router, private AuthenticationService: AuthenticationService, public toastr: ToastsManager, public vcr: ViewContainerRef, private CommonService: CommonService) {
	  this.toastr.setRootViewContainerRef(vcr);
  }

	ngOnInit() {
	  
	}

	passwordChange(form)
	{
	this.isFormSubmitted = true;
	if(!this.passwordRenewalFrom.valid){
		console.log('hello')
		return;
	}
	this.isAuthenticateSpinner = true;
	var userId=localStorage.getItem('userId');
	console.log("User id is "+userId);
	if(userId == null || userId == undefined){
		this.toastr.success('User is not login');
		return;
	}
	this.AuthenticationService.changepassword(userId,this.passwordRenewal).subscribe(
	success => {
			this.isAuthenticateSpinner = false;
			//  this.toastr.success(success.message);
			this.toastr.success('password change succesfully', null, {toastLife:350});
		},
		error => {
			
			this.isAuthenticateSpinner = false;
			//this.isFormSubmitted = false;
			error = JSON.parse(error._body);
			this.toastr.error(error.message);
		}
	)
	}

	checkMaxLength(v,t, w){
		if(!t)
			return;
		if(v === t.length){
			this.fieldErrors[w] = true;
		} else {
			this.fieldErrors[w] = false;
		}
	}

}

