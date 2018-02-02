import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { RequestOptions, Headers }  from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
	 constructor () {}
	 
	 setToken(token:string){
		var data =window.btoa(token.trim());
		localStorage.setItem('token', data);
	 };
	 
	 getToken(token:string){
		 var data = localStorage.getItem('token');
		 data= window.atob(data);
	     return data;
	 };
	 
	//  getRequestOptions(){
	// 	var data =localStorage.getItem('token');
	// 	console.log(data)
	// 	var authToken = window.atob(data);
	// 	let headers = new Headers({ 'Accept': 'application/json' });
	// 	headers.append('belrium-token', authToken);
	// 	let options = new RequestOptions({ headers: headers });
	// 	return options;
	//  }

	 getRequestOptions(){
		//var data =localStorage.getItem('token');
		//var authToken = window.atob(data);
		let headers = new Headers({ 'Accept': 'application/json' });
	// 	headers.append('belrium-token',  authToken);
	// 	headers.append('Access-Control-Allow-Origin','*');
	// 	headers.append("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    // //    headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
    //     headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     headers.append("Access-Control-Allow-Credentials", 'true');
     
		let options = new RequestOptions({ headers: headers });
		return options;
		}
}
