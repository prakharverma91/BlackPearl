import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthenticationService]
})
export class headerComponent implements OnInit {
	private notification:any = {};
	private toggleMenu:any;
  constructor(private AuthenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

  }

  toggleResponsiveNav(){
	  this.toggleMenu = !this.toggleMenu;
  }
 
}
