import { LoginService } from './../../services/login/login.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterLink, NgIf, MatIconModule]
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;
  user: any = null;

  constructor(public login: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      () => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )

   // window.addEventListener("beforeunload", () => localStorage.clear());
  }


  public logout() {
    this.login.logout();
    window.location.href = '/';
  }

}
