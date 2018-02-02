import { Component, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { TranslateService } from '@ngx-translate/core';

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  currentLang = 'en';
  options: Options;
  theme = 'light';
  showSettings = false;
  isDocked = false;
  isBoxed = false;
  isOpened = true;
  mode = 'push';
  _mode = this.mode;
  _autoCollapseWidth = 991;
  width = window.innerWidth;
  public profileImgUrl :any=null;

  @ViewChild('sidebar') sidebar;

  constructor (
    public menuItems: MenuItems,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private modalService: NgbModal,
    private titleService: Title) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {

    this.profileImgUrl = localStorage.getItem('profileImgUrl');
     
    if(this.profileImgUrl === undefined || this.profileImgUrl == "undefined"){
      this.profileImgUrl = "assets/images/avatar.jpg";
    }else{
      this.profileImgUrl = this.getImageUrlForHosting(this.profileImgUrl);
    }

    if (this.isOver()) {
      this._mode = 'over';
      this.isOpened = false;
    }

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      // Scroll to top on view load
      document.querySelector('.main-content').scrollTop = 0;

      if (this.isOver() || event.url === '/maps/fullscreen') {
        this.isOpened = false;
      }

      this.route.children.forEach((route: ActivatedRoute) => {
        let activeRoute: ActivatedRoute = route;
        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }
        this.options = activeRoute.snapshot.data;
      });

      if (this.options.hasOwnProperty('heading')) {
        /* this.setTitle(this.options.heading); */
      } 
    });
  }
	getImageUrlForHosting(imgpath: any) {
    
		let tmp = ""+imgpath;
		var index = tmp.indexOf("assets");
		var tmpPath = "";

	 if (index != -1) {
			tmpPath = imgpath.substring(index);
			return tmpPath;
    }
    return "assets/images/avatar.jpg";
				//assets/images/
      }
      
  ngOnDestroy() {
    this._router.unsubscribe();
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( 'Belrium - Bootstrap 4 Angular Admin Template | ' + newTitle );
  }

  toogleSidebar(): void {
    if (this._mode !== 'dock') {
      this.isOpened = !this.isOpened;
    }
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 991px)`).matches;
  }

  openSearch(search) {
    this.modalService.open(search, { windowClass: 'search', backdrop: false });
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'basic-webpage-txt',
      children: [
        {state: 'menu', name: 'MENU'},
        {state: 'menu', name: 'MENU'},
        {state: 'menu', name: 'MENU'}
      ]
    });
  }
 

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.width === event.target.innerWidth) { return false; }
    if (this.isOver()) {
      this._mode = 'over';
      this.isOpened = false;
    } else {
      this._mode = this.mode;
      this.isOpened = true;
    }
    this.width = event.target.innerWidth;
  }
  
  // left nav signout
  forSignOut(name) {
	  if(name == 'Signout') {
		this.signOut();
	  }
  }
  
  //signout 
   signOut() {
	  window.localStorage.clear();
	  this.router.navigate ( [ '' ] );
  }
  
  navItem(name) {
	  
  }
  
}
