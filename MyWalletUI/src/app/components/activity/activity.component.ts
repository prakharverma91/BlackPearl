import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './../../services/common.service';
import { MainService } from './../../services/main.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.scss'],
	providers: [MainService, CommonService]
})

export class ActivityComponent implements OnInit {

	private isTblLoadingDone = false;
	private numberOfPage = 5;
	private currentPage = 1;
	private viewData: any = {};
	actionArray: any = []
	constructor(private modalService: NgbModal, private CommonService: CommonService, public toastr: ToastsManager, private MainService: MainService) {
	}

	ngOnInit() {
		console.log("Inside ng init..");
		this.isTblLoadingDone = false;
		this.MainService.getAllActions().subscribe(success => {
			this.actionArray = success.data.actionArray;
			this.isTblLoadingDone = true;
		}, error => {
			error = JSON.parse(error._body);
			this.toastr.error(error.message);

		})

	}
	open(modal, x) {
		this.viewData = x;
		this.modalService.open(modal);
		console.log('aa', this.viewData)
	}

}
