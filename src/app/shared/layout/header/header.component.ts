import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../core/services/http.service';
import { AppSession } from '../../../core/config/app-session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  menu: any;
  userDetails: any;
  loading: boolean = false;
  
  constructor(private router: Router, private service: HttpService) {
  }

  ngOnInit() {
    this.menu = AppSession.getSessionStorage("UserMenu") ? AppSession.getSessionStorage("UserMenu") : null;
    this.userDetails = AppSession.getSessionStorage("UserInfo") ? AppSession.getSessionStorage("UserInfo") : null;
  }

  signOut(){
    AppSession.clearSessionStorage("UserInfo");
    AppSession.clearSessionStorage("UserMenu");
    this.router.navigateByUrl('login');
  }

  isDashboard(): boolean{
    return (this.menu.Dashboard && this.menu.Dashboard.length > 0) ? true : false;
  }

  isMenu(): boolean{
    return (this.menu.Menu && this.menu.Menu.length > 0) ? true : false;
  }

  isAdmin(): boolean{
    return (this.menu.Admin && this.menu.Admin.length > 0) ? true : false;
  }

  isUserDetail(): boolean{
    return this.userDetails ? true : false;
  }

}