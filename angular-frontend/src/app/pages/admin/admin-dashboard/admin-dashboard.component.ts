import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { UserListComponent } from '../../../components/user-list/user-list.component';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    standalone: true,
    imports: [UserListComponent],
})

export class AdminDashboardComponent implements OnInit {

  isLoggedIn = false;
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
  }



}
