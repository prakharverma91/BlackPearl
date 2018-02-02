import { Component  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent  {
  isToken:any = window.localStorage.getItem('token');
  private activeurl:any;
  private verifyToken:any
  private queryParams:any = {};
  constructor(translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
	
	 setTimeout(()=>{
	 this.activatedRoute.queryParams.subscribe(params => {
			let length  = Object.keys(params).length;
			if(length > 0)
			{
				if(params['token'] != undefined)
				{
					this.queryParams = params['token'];
					this.isTokenParams();
				}
				else{
					this.isLoggedIn();
				}
			}
			else{
					this.isLoggedIn();
				} 
			
        });
	 },500)	
  }
  
 isTokenParams()
 {
	 
 }
  isLoggedIn()
	{
		 if(this.isToken == null && this.isToken == undefined)
		{
			 setTimeout(() => {
				  window.localStorage.clear();
				  this.router.navigate ( [ '' ] );
				}, 200);
		}
		 
	}
  
}
