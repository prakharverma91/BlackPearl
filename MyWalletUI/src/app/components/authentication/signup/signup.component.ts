import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { NgSwitchCase, CommonModule  } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthenticationService } from './../authentication.service';
import { CommonService } from './../../../services/common.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MainService } from './../../../services/main.service';


const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss','../signin/logincss/main.less'],
  providers: [AuthenticationService, CommonService, MainService]
})
export class SignupComponent implements OnInit {
  private signup:any = {};
//   private countryId:any = {};
  private isFormSubmitted:any = false;
  private isPasswordMatched:any
  private isAuthenticateSpinner:any = false;
  private fieldErrors:any = {};
  private isCapatcha:any = false;
  //private captchaError = '';
  private isNumber = false;
  private isFormat = false;
  private countryArray: any = [];
  private id: any = {};
 
  

  //@ViewChild('captcha') captcha:any;
  @ViewChild('createAccount') createAccount:any;
  public form: FormGroup;
  
  constructor(private AuthenticationService: AuthenticationService, private fb: FormBuilder, private router: Router, public toastr: ToastsManager, public vcr: ViewContainerRef, private CommonService: CommonService, private MainService: MainService) {
	  this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
	  console.log("insiiiiiiiiiiii");
	this.getAllCountrys();
    this.fieldErrors = {
		'name':false,
		'password': false
	}
  }

  tmp(){
	  console.log("inside ..");
	  this.AuthenticationService.tmp().subscribe(
		success => {
			console.log("sucessssss");
			this.toastr.success('Link has been sent to your Email.Please Verify your Email address.');	
		},
		error => {
			console.log("sucessssss");
			
			error = JSON.parse(error._body);
			this.toastr.error(error.message);
			
		}
	)
	 
  }

  _keyPress(event: any) {
    const pattern = /[a-zA-Z\+\-\s]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
	  // invalid character, prevent input
	  this.isNumber = true;
	  event.preventDefault();
	  
    } else {
		this.isNumber = false;
	}
 }

formatCheck(){
	this.trimLeadingAndTrailing();

	const pattern = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
	if(!pattern.test(this.signup.name) && this.signup.name!="" && this.signup.name!=undefined){
		 this.isFormat = true; 
		
	}
	else{
		this.isFormat = false; 
	}
}
onFocus(){
	this.isFormat=false;
	
}

	trimLeadingAndTrailing() {
		if(this.signup.name){
			this.signup.name = this.signup.name.trim();
		}
	}
	
	showResponse(event) {
	//	this.captchaError = '';
	//	this.isCapatcha = true;
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
	
		
    signupSubmit(form:any, id:any) {
		this.isNumber = false;
	this.isFormSubmitted = true;
	if(!this.createAccount.valid || !this.checkpasswrd()){
        return;
	}
// if(!this.createAccount.valid || !this.checkpasswrd() || !this.isCapatcha){
// 		if(!this.isCapatcha){
// 			this.captchaError = 'Invalid Captcha.';
// 		}
// 		return;
// 	}
	this.isAuthenticateSpinner = true;
	this.signup.email = this.signup.email.toLowerCase();
	 console.log(this.signup);
	this.AuthenticationService.userSignup(this.signup).subscribe(
		success => {
			this.isFormSubmitted = false;
			this.isAuthenticateSpinner = false;
			localStorage.setItem('issignup','true'	)
			this.toastr.success(success.message);	
			this.signup = {};
			//this.captcha.reset();
			// this.router.navigateByUrl('/welcome')
			 
			// for prevent to redirect
			console.log("succes fully sign up");
			this.router.navigateByUrl('/dashboard')
		},
		error => {
			if(error.status === 0){
				this.toastr.error("Server is not responding.");
				this.isAuthenticateSpinner = false;
				return;
			}
			this.isFormSubmitted = false;
			error = JSON.parse(error._body);
			this.toastr.error(error.message);
			this.isAuthenticateSpinner = false;
			this.signup = {};
		//	this.captcha.reset();
			
		}
	)
    
  }
  
  // for password match
  checkpasswrd()
    {
     this.isPasswordMatched =  this.signup.password === this.signup.confirmPassword && this.signup.confirmPassword && this.signup.password;
	 return this.isPasswordMatched;
    }
	

	checkPasswordEmpty()
	{
	if(this.isFormSubmitted == true)
		this.form.reset();
	}
	isValid()
	{
		if(this.isFormSubmitted == false)
			this.form.reset();
	}

	getAllCountrys() {
		// this.MainService.getAllCountrys().subscribe(
		//   success => {
		// 	this.countryArray = success.data;
		// 	// console.log("this.countryArray",this.countryArray);
		// 	//this.country = this.countryArray[0].countryName;
		//   },
		//   error => {
		//   }
		// )
	
	
	this.countryArray = [ 
		{"name": "Afghanistan", "code": "AF"}, 
		{"name": "land Islands", "code": "AX"}, 
		{"name": "Albania", "code": "AL"}, 
		{"name": "Algeria", "code": "DZ"}, 
		{"name": "American Samoa", "code": "AS"}, 
		{"name": "AndorrA", "code": "AD"}, 
		{"name": "Angola", "code": "AO"}, 
		{"name": "Anguilla", "code": "AI"}, 
		{"name": "Antarctica", "code": "AQ"}, 
		{"name": "Antigua and Barbuda", "code": "AG"}, 
		{"name": "Argentina", "code": "AR"}, 
		{"name": "Armenia", "code": "AM"}, 
		{"name": "Aruba", "code": "AW"}, 
		{"name": "Australia", "code": "AU"}, 
		{"name": "Austria", "code": "AT"}, 
		{"name": "Azerbaijan", "code": "AZ"}, 
		{"name": "Bahamas", "code": "BS"}, 
		{"name": "Bahrain", "code": "BH"}, 
		{"name": "Bangladesh", "code": "BD"}, 
		{"name": "Barbados", "code": "BB"}, 
		{"name": "Belarus", "code": "BY"}, 
		{"name": "Belgium", "code": "BE"}, 
		{"name": "Belize", "code": "BZ"}, 
		{"name": "Benin", "code": "BJ"}, 
		{"name": "Bermuda", "code": "BM"}, 
		{"name": "Bhutan", "code": "BT"}, 
		{"name": "Bolivia", "code": "BO"}, 
		{"name": "Bosnia and Herzegovina", "code": "BA"}, 
		{"name": "Botswana", "code": "BW"}, 
		{"name": "Bouvet Island", "code": "BV"}, 
		{"name": "Brazil", "code": "BR"}, 
		{"name": "British Indian Ocean Territory", "code": "IO"}, 
		{"name": "Brunei Darussalam", "code": "BN"}, 
		{"name": "Bulgaria", "code": "BG"}, 
		{"name": "Burkina Faso", "code": "BF"}, 
		{"name": "Burundi", "code": "BI"}, 
		{"name": "Cambodia", "code": "KH"}, 
		{"name": "Cameroon", "code": "CM"}, 
		{"name": "Canada", "code": "CA"}, 
		{"name": "Cape Verde", "code": "CV"}, 
		{"name": "Cayman Islands", "code": "KY"}, 
		{"name": "Central African Republic", "code": "CF"}, 
		{"name": "Chad", "code": "TD"}, 
		{"name": "Chile", "code": "CL"}, 
		{"name": "China", "code": "CN"}, 
		{"name": "Christmas Island", "code": "CX"}, 
		{"name": "Cocos (Keeling) Islands", "code": "CC"}, 
		{"name": "Colombia", "code": "CO"}, 
		{"name": "Comoros", "code": "KM"}, 
		{"name": "Congo", "code": "CG"}, 
		{"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
		{"name": "Cook Islands", "code": "CK"}, 
		{"name": "Costa Rica", "code": "CR"}, 
		{"name": "Cote D\"Ivoire", "code": "CI"}, 
		{"name": "Croatia", "code": "HR"}, 
		{"name": "Cuba", "code": "CU"}, 
		{"name": "Cyprus", "code": "CY"}, 
		{"name": "Czech Republic", "code": "CZ"}, 
		{"name": "Denmark", "code": "DK"}, 
		{"name": "Djibouti", "code": "DJ"}, 
		{"name": "Dominica", "code": "DM"}, 
		{"name": "Dominican Republic", "code": "DO"}, 
		{"name": "Ecuador", "code": "EC"}, 
		{"name": "Egypt", "code": "EG"}, 
		{"name": "El Salvador", "code": "SV"}, 
		{"name": "Equatorial Guinea", "code": "GQ"}, 
		{"name": "Eritrea", "code": "ER"}, 
		{"name": "Estonia", "code": "EE"}, 
		{"name": "Ethiopia", "code": "ET"}, 
		{"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
		{"name": "Faroe Islands", "code": "FO"}, 
		{"name": "Fiji", "code": "FJ"}, 
		{"name": "Finland", "code": "FI"}, 
		{"name": "France", "code": "FR"}, 
		{"name": "French Guiana", "code": "GF"}, 
		{"name": "French Polynesia", "code": "PF"}, 
		{"name": "French Southern Territories", "code": "TF"}, 
		{"name": "Gabon", "code": "GA"}, 
		{"name": "Gambia", "code": "GM"}, 
		{"name": "Georgia", "code": "GE"}, 
		{"name": "Germany", "code": "DE"}, 
		{"name": "Ghana", "code": "GH"}, 
		{"name": "Gibraltar", "code": "GI"}, 
		{"name": "Greece", "code": "GR"}, 
		{"name": "Greenland", "code": "GL"}, 
		{"name": "Grenada", "code": "GD"}, 
		{"name": "Guadeloupe", "code": "GP"}, 
		{"name": "Guam", "code": "GU"}, 
		{"name": "Guatemala", "code": "GT"}, 
		{"name": "Guernsey", "code": "GG"}, 
		{"name": "Guinea", "code": "GN"}, 
		{"name": "Guinea-Bissau", "code": "GW"}, 
		{"name": "Guyana", "code": "GY"}, 
		{"name": "Haiti", "code": "HT"}, 
		{"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
		{"name": "Holy See (Vatican City State)", "code": "VA"}, 
		{"name": "Honduras", "code": "HN"}, 
		{"name": "Hong Kong", "code": "HK"}, 
		{"name": "Hungary", "code": "HU"}, 
		{"name": "Iceland", "code": "IS"}, 
		{"name": "India", "code": "IN"}, 
		{"name": "Indonesia", "code": "ID"}, 
		{"name": "Iran, Islamic Republic Of", "code": "IR"}, 
		{"name": "Iraq", "code": "IQ"}, 
		{"name": "Ireland", "code": "IE"}, 
		{"name": "Isle of Man", "code": "IM"}, 
		{"name": "Israel", "code": "IL"}, 
		{"name": "Italy", "code": "IT"}, 
		{"name": "Jamaica", "code": "JM"}, 
		{"name": "Japan", "code": "JP"}, 
		{"name": "Jersey", "code": "JE"}, 
		{"name": "Jordan", "code": "JO"}, 
		{"name": "Kazakhstan", "code": "KZ"}, 
		{"name": "Kenya", "code": "KE"}, 
		{"name": "Kiribati", "code": "KI"}, 
		{"name": "Korea, Democratic People\"S Republic of", "code": "KP"}, 
		{"name": "Korea, Republic of", "code": "KR"}, 
		{"name": "Kuwait", "code": "KW"}, 
		{"name": "Kyrgyzstan", "code": "KG"}, 
		{"name": "Lao People\"S Democratic Republic", "code": "LA"}, 
		{"name": "Latvia", "code": "LV"}, 
		{"name": "Lebanon", "code": "LB"}, 
		{"name": "Lesotho", "code": "LS"}, 
		{"name": "Liberia", "code": "LR"}, 
		{"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
		{"name": "Liechtenstein", "code": "LI"}, 
		{"name": "Lithuania", "code": "LT"}, 
		{"name": "Luxembourg", "code": "LU"}, 
		{"name": "Macao", "code": "MO"}, 
		{"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
		{"name": "Madagascar", "code": "MG"}, 
		{"name": "Malawi", "code": "MW"}, 
		{"name": "Malaysia", "code": "MY"}, 
		{"name": "Maldives", "code": "MV"}, 
		{"name": "Mali", "code": "ML"}, 
		{"name": "Malta", "code": "MT"}, 
		{"name": "Marshall Islands", "code": "MH"}, 
		{"name": "Martinique", "code": "MQ"}, 
		{"name": "Mauritania", "code": "MR"}, 
		{"name": "Mauritius", "code": "MU"}, 
		{"name": "Mayotte", "code": "YT"}, 
		{"name": "Mexico", "code": "MX"}, 
		{"name": "Micronesia, Federated States of", "code": "FM"}, 
		{"name": "Moldova, Republic of", "code": "MD"}, 
		{"name": "Monaco", "code": "MC"}, 
		{"name": "Mongolia", "code": "MN"}, 
		{"name": "Montenegro", "code": "ME"},
		{"name": "Montserrat", "code": "MS"},
		{"name": "Morocco", "code": "MA"}, 
		{"name": "Mozambique", "code": "MZ"}, 
		{"name": "Myanmar", "code": "MM"}, 
		{"name": "Namibia", "code": "NA"}, 
		{"name": "Nauru", "code": "NR"}, 
		{"name": "Nepal", "code": "NP"}, 
		{"name": "Netherlands", "code": "NL"}, 
		{"name": "Netherlands Antilles", "code": "AN"}, 
		{"name": "New Caledonia", "code": "NC"}, 
		{"name": "New Zealand", "code": "NZ"}, 
		{"name": "Nicaragua", "code": "NI"}, 
		{"name": "Niger", "code": "NE"}, 
		{"name": "Nigeria", "code": "NG"}, 
		{"name": "Niue", "code": "NU"}, 
		{"name": "Norfolk Island", "code": "NF"}, 
		{"name": "Northern Mariana Islands", "code": "MP"}, 
		{"name": "Norway", "code": "NO"}, 
		{"name": "Oman", "code": "OM"}, 
		{"name": "Pakistan", "code": "PK"}, 
		{"name": "Palau", "code": "PW"}, 
		{"name": "Palestinian Territory, Occupied", "code": "PS"}, 
		{"name": "Panama", "code": "PA"}, 
		{"name": "Papua New Guinea", "code": "PG"}, 
		{"name": "Paraguay", "code": "PY"}, 
		{"name": "Peru", "code": "PE"}, 
		{"name": "Philippines", "code": "PH"}, 
		{"name": "Pitcairn", "code": "PN"}, 
		{"name": "Poland", "code": "PL"}, 
		{"name": "Portugal", "code": "PT"}, 
		{"name": "Puerto Rico", "code": "PR"}, 
		{"name": "Qatar", "code": "QA"}, 
		{"name": "Reunion", "code": "RE"}, 
		{"name": "Romania", "code": "RO"}, 
		{"name": "Russian Federation", "code": "RU"}, 
		{"name": "RWANDA", "code": "RW"}, 
		{"name": "Saint Helena", "code": "SH"}, 
		{"name": "Saint Kitts and Nevis", "code": "KN"}, 
		{"name": "Saint Lucia", "code": "LC"}, 
		{"name": "Saint Pierre and Miquelon", "code": "PM"}, 
		{"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
		{"name": "Samoa", "code": "WS"}, 
		{"name": "San Marino", "code": "SM"}, 
		{"name": "Sao Tome and Principe", "code": "ST"}, 
		{"name": "Saudi Arabia", "code": "SA"}, 
		{"name": "Senegal", "code": "SN"}, 
		{"name": "Serbia", "code": "RS"}, 
		{"name": "Seychelles", "code": "SC"}, 
		{"name": "Sierra Leone", "code": "SL"}, 
		{"name": "Singapore", "code": "SG"}, 
		{"name": "Slovakia", "code": "SK"}, 
		{"name": "Slovenia", "code": "SI"}, 
		{"name": "Solomon Islands", "code": "SB"}, 
		{"name": "Somalia", "code": "SO"}, 
		{"name": "South Africa", "code": "ZA"}, 
		{"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
		{"name": "Spain", "code": "ES"}, 
		{"name": "Sri Lanka", "code": "LK"}, 
		{"name": "Sudan", "code": "SD"}, 
		{"name": "Suriname", "code": "SR"}, 
		{"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
		{"name": "Swaziland", "code": "SZ"}, 
		{"name": "Sweden", "code": "SE"}, 
		{"name": "Switzerland", "code": "CH"}, 
		{"name": "Syrian Arab Republic", "code": "SY"}, 
		{"name": "Taiwan, Province of China", "code": "TW"}, 
		{"name": "Tajikistan", "code": "TJ"}, 
		{"name": "Tanzania, United Republic of", "code": "TZ"}, 
		{"name": "Thailand", "code": "TH"}, 
		{"name": "Timor-Leste", "code": "TL"}, 
		{"name": "Togo", "code": "TG"}, 
		{"name": "Tokelau", "code": "TK"}, 
		{"name": "Tonga", "code": "TO"}, 
		{"name": "Trinidad and Tobago", "code": "TT"}, 
		{"name": "Tunisia", "code": "TN"}, 
		{"name": "Turkey", "code": "TR"}, 
		{"name": "Turkmenistan", "code": "TM"}, 
		{"name": "Turks and Caicos Islands", "code": "TC"}, 
		{"name": "Tuvalu", "code": "TV"}, 
		{"name": "Uganda", "code": "UG"}, 
		{"name": "Ukraine", "code": "UA"}, 
		{"name": "United Arab Emirates", "code": "AE"}, 
		{"name": "United Kingdom", "code": "GB"}, 
		{"name": "United States", "code": "US"}, 
		{"name": "United States Minor Outlying Islands", "code": "UM"}, 
		{"name": "Uruguay", "code": "UY"}, 
		{"name": "Uzbekistan", "code": "UZ"}, 
		{"name": "Vanuatu", "code": "VU"}, 
		{"name": "Venezuela", "code": "VE"}, 
		{"name": "Viet Nam", "code": "VN"}, 
		{"name": "Virgin Islands, British", "code": "VG"}, 
		{"name": "Virgin Islands, U.S.", "code": "VI"}, 
		{"name": "Wallis and Futuna", "code": "WF"}, 
		{"name": "Western Sahara", "code": "EH"}, 
		{"name": "Yemen", "code": "YE"}, 
		{"name": "Zambia", "code": "ZM"}, 
		{"name": "Zimbabwe", "code": "ZW"} 
		]

}
}

