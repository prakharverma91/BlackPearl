import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './../../../services/main.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.component.html',
  styleUrls: ['./profilepic.component.scss'],
  providers: [MainService]
})
export class ProfilepicComponent implements OnInit {
  isAuthenticateSpinner: any = false;
  private pic: any = {};
  private selected: any;
  private formData: any = {};
  private picList: any = [];
  public imgurl: any;
  private isTblLoadingDone = false;
  private uploaded = false;
  private isEdited = false;
  private data: any = {};
  private wallet = null;
  private userId:any;
  @ViewChild('myInput')
  myInputVariable: any;
  constructor(private MainService: MainService, public toastr: ToastsManager, public vcr: ViewContainerRef, private router: Router, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getProfile(this.userId);
  }
  fileChange(event,id) {
      let tmpImage = this.imgurl;
    let fileList: FileList = event.target.files;
   
    if (fileList.length > 0) {
      var fileSize = fileList[0].size;
      if (fileSize / 1000 > 2048) {
        this.toastr.error("File must be less that 2 MB.");
          this.myInputVariable.nativeElement.value = "";
        //event.target.files = [];
        return;
      }
      
      this.uploaded = true;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgurl = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      let file: File = fileList[0];
      this.formData = new FormData();
      this.formData.append('file', file);
      this.MainService.uploadpic(this.formData,this.userId).subscribe(
        success => {
          this.imgurl=success.data.uploadProfilePic;
          this.toastr.success(success.message);

        },
        error => {
          error = JSON.parse(error._body);
          this.toastr.error(error.message);
         this.imgurl = tmpImage;    
          //this.getProfile(id);
        })
    }
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

  getProfile(id) {
    this.isTblLoadingDone = false;
    this.MainService.userProfile(id).subscribe(
      success => {
        this.data = success.data;
        this.wallet = success.data.wallet;
        if(this.wallet == undefined || this.wallet == null){
          this.wallet = {walletAddress:'N/A'};
        }
        this.uploaded = true;
        this.imgurl = success.data.upLoadProfilePic;
        if(this.imgurl == undefined || this.imgurl == null){
        this.imgurl="assets/images/flat-avatar.png";
        }
        this.isTblLoadingDone = true;
      },
      error => {
        this.isTblLoadingDone = false;
      }
    )

  }

}