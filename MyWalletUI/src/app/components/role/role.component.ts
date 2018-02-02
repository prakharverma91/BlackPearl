import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { NgSwitchCase, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { CommonService } from './../../services/common.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from './../../services/main.service';
import { BsDropdownModule } from 'ngx-bootstrap';


@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styleUrls: ['./role.component.scss'],
	providers: [MainService, CommonService]
})

export class RoleComponent implements OnInit {
	public editData: any;
	//public activityArray: any = [];
	public actionArray: any = [];

	dropdownList = [];
	dropdownSettings = {};
	private NgbdPaginationBasic = {};
	private role: any = {};
	private multiselect: any = {};
	private addrole: any = {};
	private viewData: any = {};
	private selectedItemsInAdd: any = [];
	private viewActivity: any = {};
	private isFormSubmitted: any = false;
	private modal;
	private isAuthenticateSpinner: any = false;
	private fieldErrors: any = {};
	private roleData: any = [];
	private numberOfPage = 5;
	private currentPage = 1;
	public form: FormGroup;
	private isTblLoadingDone = false;
	private activityData: any;

	private selectedItems: any = [];

	@ViewChild('addRole') addRole: any;
	@ViewChild('editRole') editrole: any;
	@ViewChild('assignActionsToRole') assignActionsToRole: any;

	constructor(private fb: FormBuilder, private router: Router, public toastr: ToastsManager, public vcr: ViewContainerRef, private CommonService: CommonService, private MainService: MainService, private modalService: NgbModal) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {

		this.getAllActionList()
		this.getAllRoles();
		this.dropdownSettings = {
			singleSelection: false,
			text: "Select Actions",
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
			classes: "myclass custom-class"
		};
		this.isTblLoadingDone = false;
		this.isAuthenticateSpinner = true;
	}

	open(modal, x) {
		this.selectedItemsInAdd = [];
		this.viewData = x;
		this.modalService.open(modal);
	}

	/*  ADD ROLE*/

	addroleSubmit(isValid, cb) {
		this.isFormSubmitted = true;
		if (this.role.roleName == null || this.role.roleName == "") {
			return;
		} else if (this.role.roleDescription == null || this.role.roleDescription == "") {
			return;
		}
		if (this.role.isActive == null)
			this.role.isActive = false;

		this.isAuthenticateSpinner = true;
		this.isTblLoadingDone = false;
		this.MainService.addRoles(this.role).subscribe(
			success => {
				this.isAuthenticateSpinner = false;
				cb();
				this.isFormSubmitted = false;
				this.role = {};
				this.roleData.push(success.data)
				this.isTblLoadingDone = true;
			},
			error => {
				if (error.status === 0) {
					this.toastr.error("Server is not responding.");
					this.isAuthenticateSpinner = false;
					return;
				}
				this.isFormSubmitted = false;
				error = JSON.parse(error._body);
				this.toastr.error(error.message);
				this.isAuthenticateSpinner = false;
				this.role = {};
				this.isTblLoadingDone = true;

			}
		)
	}


	deleteRole(role) {
		console.log(role);
		this.isAuthenticateSpinner = true;
		this.isTblLoadingDone = false;
		this.MainService.deleteRole(role).subscribe(
			success => {
				this.isAuthenticateSpinner = false;
				this.isFormSubmitted = false;
				this.role = {};
				this.roleData.remove(role);
				this.isTblLoadingDone = true;
			},
			error => {
				if (error.status === 0) {
					this.toastr.error("Server is not responding.");
					this.isAuthenticateSpinner = false;
					return;
				}
				this.isFormSubmitted = false;
				error = JSON.parse(error._body);
				this.toastr.error(error.message);
				this.isAuthenticateSpinner = false;
				//	this.role = {};
				this.isTblLoadingDone = true;

			}
		)
	}

	/* EDIT ROLE*/
	editroleSubmit(data, cb) {
		this.isFormSubmitted = true;
		if (this.viewData.roleDescription == null || this.viewData.roleDescription == "") {
			return;
		}
		var req: any = {};
		req.roleName = data.roleName;
		req.roleDescription = data.roleDescription;
		if (data.isActive == null) {
			req.isActive = false;
		} else {
			req.isActive = data.isActive;
		}
		console.log("inside update role " + data);

		this.MainService.updateRole(data.roleId, req).subscribe(
			success => {
				cb();
				this.isFormSubmitted = false;
				this.editData = success.data;
				this.toastr.success(success.message);
			},
			error => {
				console.log("inside error");
				error = JSON.parse(error._body);
				this.toastr.error(error.message);
				this.isFormSubmitted = false;
			}
		)
	}

	/* get action by role */
	getActionByRole(roleData) {
		console.log("inside getActionByRole..");
		var actions: any = [];

		this.MainService.getActionByRole(roleData.roleId).subscribe(
			success => {
				actions = success.data.actionArray;
				this.selectedItems = [];
				let allData = [];
				for (let i = 0; i < actions.length; i++) {
					var actionObj:any=actions[i];
					actionObj.id=actionObj.actionId;
					actionObj.itemName=actionObj.actionName;
					this.selectedItems.push(actionObj);
				}
},
			error => {
				this.selectedItems = [];

			}
		)
	}

	/* Assign action to role */
	assignActionToRole(data, cb) {

		var request: any = {};
		request.RoleId = data.roleId;
		var tmpRoleActionIds = [];
		console.log("seleected item is..");
		console.log(this.selectedItems);
		this.selectedItems.forEach(action => {
			tmpRoleActionIds.push(action.actionId || action.id);
		});

		request.activityIdArray = tmpRoleActionIds;
		this.MainService.assignActionToRole(request).subscribe(
			success => {
				console.log("inside success");
				this.toastr.success(success.message);
				this.isFormSubmitted = false;
				this.editData = success.data;
				cb();
			},
			error => {
				error = JSON.parse(error._body);
				this.toastr.error(error.message);
				this.isFormSubmitted = false;
				cb();
			}
		)
	}

	/* GET All ACTION LIST*/
	getAllActionList() {
		this.MainService.getAllActions().subscribe(
			success => {
				this.actionArray = success.data.actionArray;
				this.actionArray.forEach(action => {
					action.itemName = action.actionName;
					action.id = action.actionId;
				});
			}, error => {
				error = JSON.parse(error._body);
				this.toastr.error(error.message);
			})
	}

	/*GET ALL ROLES*/
	getAllRoles() {
		this.MainService.getAllRole().subscribe(
			success => {
				this.isAuthenticateSpinner = false;
				this.roleData = success.data.roleArray;
				this.isTblLoadingDone = true;
			},
			error => {
				error = JSON.parse(error._body);
				this.toastr.error(error.message);
						this.isTblLoadingDone = true;
			}
		)
	}

	checkMaxLength(length, data, messageId) {
		if (data && data.length) {
			if (data.length >= length) {
				this.fieldErrors[messageId] = true;
			}
			else {
				this.fieldErrors[messageId] = false;
			}
		}
		else {
			this.fieldErrors[messageId] = false;
		}
	}

	onItemSelect(item: any) {
		console.log(item);
		console.log(this.selectedItems)
	}

	OnItemDeSelect(item: any) {
		this.selectedItems = this.selectedItems.filter(function (i) {
			if (i.id !== item.id) {
				return i;
			}
		})
	}
	onSelectAll(items: any) {
		// console.log(items);
		for (let i = 0; i < items.length; i++) {

			this.onItemSelect(items[i]);
		}
	}

	onDeSelectAll(items: any) {
		this.selectedItems = [];
	}
}


