import { Component ,OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from './../../services/main.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CommonService } from './../../services/common.service';


@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	providers: [MainService, CommonService]
})

export class UsersComponent implements OnInit
{
	private isTblLoadingDone = true;
	private userArray=[]

	private numberOfPage = 5;
	private currentPage = 1;

	constructor(private modalService: NgbModal, private CommonService: CommonService, public toastr: ToastsManager, private MainService: MainService) {

	}
	
	ngOnInit() {
		console.log("Inside ng init.. of get all users");
		this.isTblLoadingDone = false;
		this.MainService.getAllUsers().subscribe(success => {
			this.userArray = success.data;
			this.isTblLoadingDone = true;
		}, error => {
			error = JSON.parse(error._body);
			this.toastr.error(error.message);
			this.isTblLoadingDone = true;
		})
	}

	open(modal) {
		this.modalService.open(modal);
	}

	usersData = [
		{
			sno: "1",
			name: "John",
			wallet: "sdgfgfdcgf1g2ff",
			status: "Activate",
			action: ""
		},
		{
			sno: "2",
			name: "Rock",
			wallet: "dsfgsfsdfgvds5f1v0d",
			status: "Activate",
			action: ""
		},
		{
			sno: "3",
			name: "Mark",
			wallet: "sfdcdfcd4fd21f0ddf",
			status: "Deactivate",
			action: ""
		},
		{
			sno: "4",
			name: "Joe",
			wallet: "fd24fd152f41dfd",
			status: "Activate",
			action: ""
		},
		{
			sno: "5",
			name: "Jock",
			wallet: "24102f01d0fdf",
			status: "Deactivate",
			action: ""
		},
		{
			sno: "6",
			name: "Devin",
			wallet: "x24f102d4f10d2f1d0f",
			status: "Deactivate",
			action: ""
		},
	]

}
