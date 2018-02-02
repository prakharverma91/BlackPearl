import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  constructor(private router: Router,  private modalService: NgbModal) {}
  private forgingtoggle:any = false;
  ngOnInit() {
  }

  
verifyingAgency = [
    {
        name: "Agency",
        date: "12 May 2017",
		details: "dfjdfh"		
	},
	{
        name: "Agency",
        date: "16 May 2017",
		details: "dfjdfh"		
	},
	{
        name: "Agency",
        date: "17 Oct 2017",
		details: "dfjdfh"		
	},
	{
        name: "Agency",
        date: "1 April 2017",
		details: "dfjdfh"		
	},
	{
        name: "Agency",
        date: "20 Oct 2017",
		details: "dfjdfh"		
	}
  ];
 
}
