import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { generateData} from '../shared/chartData';
import { MainService } from './../../services/main.service';
import { MenuItems } from '../shared/menu-items/menu-items';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MainService,MenuItems]
})

export class DashboardComponent implements OnInit {
  graph: {
    links: any[],
    nodes: any[]
  };
  dateData: any[];
  dateDataWithRange: any[];
  range = false;
  private options:any;
  private users:any = {};
  private startDate: Date;
	private endDate: Date;
	private order:any;
  private date:any;
  private userData:any = {};
  private countUsers:any = {};
  private chartUsers:any = [];
  private chartCat:any = [];
  private startMinDate:any;
  private maxDate:any;
  private startDateVald:any = false;
  private endDateVald:any = false;
  private orderVald:any = false;
	private lastLogin:any={};
	public roleName:any;
	private userId:any;
  private isTblLoadingDone = false;
  private userdocumentdata: any = [];
  private wallet:any;
  private profileImgUrl:any;
	private data: any = {};
	private	usersCount:any={};

  constructor(private MainService: MainService, private modalService: NgbModal,private menuItems:MenuItems) {
    this.dateData = generateData(5, false);
	this.dateDataWithRange = generateData(2, true);
    }

    getdateDataWithOrWithoutRange() {
		if (this.range) {
		  return this.dateDataWithRange;
		} else {
		  return this.dateData;
		}

  }

   ngOnInit() {

		this.lastLogin.loginIP = localStorage.getItem('loginIP');
		this.lastLogin.loginTime = localStorage.getItem('loginTime');
		
		this.roleName = localStorage.getItem('roleName');
		//this.id = localStorage.getItem('uid');
		this.userId=localStorage.getItem('userId');
		this.menuItems.dash();

		if(this.roleName == 'admin'){
		this.usersCount.merchantUsers=0;
		this.usersCount.totalUsers=0;
		this.usersCount.activeUsers=0;
		this.getTotalUsersCount();
		}
		let d = new Date();
		let beforeDay = new Date(d.setDate(d.getDate() - 1));
		//let yesDate = new Date().setDate(beforeDay);
		
		//var endDate = beforeDay.getFullYear() + '-'+beforeDay.getMonth() + '-'+ beforeDay.getDate();
		//console.log(endDate)
	  //this.getTotalUsers();
		// let initDate = new Date();
		let initDate = new Date();
	  initDate.setMonth(0);
		initDate.setDate(1);
		//if()
	  let initUserData = {
		startDate : initDate,
		// endDate : new Date(),
		endDate :beforeDay,
		order : "month"
	  }
	  //this.getUsersbyOrder(initUserData);
    //this.getuploadKycUsersDocument();
		this.getProfile(this.userId);
	 }

  getProfile(id) {

    this.isTblLoadingDone = false;
    this.MainService.userProfile(id).subscribe(
      success => {
        this.data = success.data;
        this.data.address = this.data.address  || {};
        this.wallet = success.data.wallet || {};
        this.profileImgUrl = success.data.upLoadProfilePic ;
        this.isTblLoadingDone = true;
      },
      error => {
        this.isTblLoadingDone = false;
      }
    )

	}
	getImageUrlForHosting(imgpath: any) {
		let tmp = ""+imgpath;
		var index = tmp.indexOf("assets");
		var tmpPath = "";

	 if (index != -1) {
			tmpPath = imgpath.substring(index);
			return tmpPath;
		}
				//assets/images/
			}
	///to get old date 
	oldDate(){
			var date = new Date();
			// console.log('date should be in past');
			date.setDate(date.getDate()-1);
			// date.getFullYear() + '-'+(date.getMonth()+1)+ '-'+date.getDate();
		}

  //  get total users
  getTotalUsers() {
	  this.MainService.getUsers().subscribe (
		success => {
			this.users = success.data;
		},
		error => {

		}
	  )
	}
	
	getTotalUsersCount(){

		this.MainService.getTotalUsersCount().subscribe (
			success => {
				this.usersCount = success.data;
			},
			error => {
	
			}
			)
	}


  getuploadKycUsersDocument() {
    this.isTblLoadingDone = false;
    this.MainService.showDocument().subscribe(
      success => {
        this.userdocumentdata = success.data;
        this.isTblLoadingDone = true;
      },
      error => {
        this.isTblLoadingDone = false;
      }
    )
  }

  // show users in chart
   getUsersbyOrder(userDate) {
	  if(userDate && !userDate.startDate) {
		  this.startDateVald = true;
		  return;
	  }
	   if(userDate && !userDate.endDate) {
		  this.endDateVald = true;
		  return;
	  }
	   if(userDate && !userDate.order) {
		  this.orderVald = true;
		  return;
	  }
	  let payload = Object.assign({}, userDate);
	  payload.startDate = this.dateFormat(payload.startDate);
		payload.endDate = this.dateFormat(payload.endDate);
		payload.order = payload.order;
		
	  this.MainService.getUsersinMonth(payload).subscribe (
		success => {
			this.chartCat = [];
			this.chartUsers = [];
			this.countUsers = success.data;
			for (let i = 0; i < this.countUsers.length; i++) {
				this.chartUsers.push(parseInt(this.countUsers[i].users || '0'));
				if(userDate.order == 'month'){
					this.chartCat.push(this.countUsers[i].month_name + ' ' + this.countUsers[i].year);
				}
				else if(userDate.order == 'day'){
					this.chartCat.push(this.countUsers[i].date);
				}
				else if(userDate.order == 'year'){
					this.chartCat.push(this.countUsers[i].years);
				}
			}
			this.options = {
			chart: {
				type: 'column',
				zoomType: 'x'
			},
			title : { text : '' },
			xAxis: {
				categories: this.chartCat,
			},
			colors: ['#9a9a9a'],
			series: [{
				showInLegend: false,
                data: this.chartUsers
            }]
        }
		},
		error => {

		}
	  )
  }
  dateFormat(inputDate) {
	  if(!inputDate || !(inputDate instanceof Date)){
		  return null;
	  }
	 return inputDate.getFullYear() + '-' + ((inputDate.getMonth()+1) < 10? ('0'+ (inputDate.getMonth()+1)): (inputDate.getMonth()+1)) + '-' + (inputDate.getDate() < 10? ('0' + inputDate.getDate()): inputDate.getDate());
  }


  open(modal){
	this.modalService.open(modal);
  }


  //chart data
	single = [
  {
    name: 'Germany',
    value: 40
  },
  {
    name: 'USA',
    value: 49
  },
  {
    name: 'France',
    value: 36
  },
  {
    name: 'United Kingdom',
    value: 36
  },
  {
    name: 'Spain',
    value: 33
  },
  {
    name: 'Italy',
    value: 35
  }
	];


	

	onMetaSelect(meta:any){

		console.log("Inside onMetaSelect");
		
	}

	private tmp={};

	

  // datatable

	// documentData = [
	// 	{
	// 		sno: "1",
	// 		date: "1 Jan 2016",
	// 		status: "Pending",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "2",
	// 		date: "24 Nov 2016",
	// 		name: "Passport",
	// 		status: "Completed",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "3",
	// 		date: "6 Aug 2017",
	// 		name: "DL",
	// 		status: "Rejected",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "4",
	// 		date: "19 Oct 2016",
	// 		name: "Photo",
	// 		status: "Pending",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "5",
	// 		date: "1 Jan 2016",
	// 		name: "Pan Card",
	// 		status: "Inprocess",
	// 		action: ""
	// 	}
	//
	// ]		name: "Pan Card",
	// 		status: "Pending",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "2",
	// 		date: "24 Nov 2016",
	// 		name: "Passport",
	// 		status: "Completed",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "3",
	// 		date: "6 Aug 2017",
	// 		name: "DL",
	// 		status: "Rejected",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "4",
	// 		date: "19 Oct 2016",
	// 		name: "Photo",
	// 		status: "Pending",
	// 		action: ""
	// 	},
	// 	{
	// 		sno: "5",
	// 		date: "1 Jan 2016",
	// 		name: "Pan Card",
	// 		status: "Inprocess",
	// 		action: ""
	// 	}
	//
	// ]


}
