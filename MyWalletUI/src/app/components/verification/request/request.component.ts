import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  constructor(private router: Router,  private modalService: NgbModal) {}
  private forgingtoggle:any = false;
  ngOnInit() {
  }
  
verifyingRequests = [
    {
        name: "Agency",
        date: "12 May 2017",
		ip: "180.151.230.10",
		agentinfo: "demo"	
	},
	{
        name: "Agency",
        date: "16 May 2017",
		ip: "180.151.230.10",
		agentinfo: "demo"		
	},
	{
        name: "Agency",
        date: "17 Oct 2017",
		ip: "180.151.230.10",
		agentinfo: "demo"		
	},
	{
        name: "Agency",
        date: "1 April 2017",
		ip: "180.151.230.10",
		agentinfo: "demo"	
	},
	{
        name: "Agency",
        date: "20 Oct 2017",
		ip: "180.151.230.10",
		agentinfo: "demo"			
	}
  ];
 
}
