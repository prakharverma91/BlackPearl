import { Injectable } from '@angular/core';
import { Http, Response}  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import {config} from './../../config';
import { CommonService } from './../../services/common.service';

@Injectable()
export class AuthenticationService {
	 constructor (private http: Http, private router:Router, private CommonService: CommonService) {}
	

	 tmp(){
		 console.log("insdei api");
		return this.http.get(config.host+'roles').map(res => res.json());
		
	 }
	
	//login
	userLogin(loginData:any) {
		return this.http.post(config.host+'login', loginData).map(res => res.json());
	}
	
	//signup
	userSignup(signupData:any) {
		console.log(signupData)
		return this.http.post(config.host+'signup', signupData,this.CommonService.getRequestOptions()).map(res => res.json());
	}

	//role//changed
	// userRole(roleData:any) {
	// 	console.log("transfering request : : : : : : ");
	// 	return this.http.post(config.host+'addRole', roleData ,this.CommonService.getRequestOptions()).map(res => res.json());
	// }

	
	//emailverification
	//12.
	emailVerify(token:String) {
		return this.http.patch(config.host+'/users/email/verify/'+token,null).map(res => res.json());
	}
	
	//forgot password
	//10.updatePassword
	forgotPassword(forgotEmail:any) {
		return this.http.patch(config.host+'/users/email/reset', forgotEmail).map(res => res.json());
	}	
	
	//reset password
	//11.
	updatePassword(token:any, updatePassword:any) {
		return this.http.patch(config.host+'/users/reset/password/'+ token+'', {password:updatePassword.confirmPassword}).map(res => res.json());
	}
	//change Password
	changepassword(userId:any,passwordRenewal:any) {
		return this.http.patch(config.host+'password/'+userId, passwordRenewal, this.CommonService.getRequestOptions()).map(res => res.json());
	}	

}