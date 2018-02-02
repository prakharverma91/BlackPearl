import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { CommonService } from './../../../services/common.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.scss'],
  providers: [AuthenticationService, CommonService]
})
export class EmailVerificationComponent implements OnInit {
	private notification:any = {};
	private isSuccess:any;
	private emailMessage:any;
	private isAuthenticateSpinner:any = false;
  constructor(private AuthenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute, private CommonService: CommonService, public toastr: ToastsManager, public vcr: ViewContainerRef) {
	  this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // email verify
	this.isAuthenticateSpinner = true;
	 this.activatedRoute.queryParamMap.subscribe((search: any) => {
        if(search.params.token) {
			this.AuthenticationService.emailVerify(search.params.token+'').subscribe(
			success =>{
				this.isAuthenticateSpinner = false;
				this.emailMessage = success.message;
				this.toastr.success(success.message);
				this.isSuccess = true;
			},
			error => {
				this.isAuthenticateSpinner = false;
				this.isSuccess = false;
				error = JSON.parse(error._body);
				//todo
				this.emailMessage=error.message;
				this.toastr.error(error.message);
			}
		)
	  }
    });
  }

 
}
