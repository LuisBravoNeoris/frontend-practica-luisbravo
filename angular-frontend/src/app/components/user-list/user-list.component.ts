import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user/user.service';
import { LoginService } from './../../services/login/login.service';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

export interface users {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

const DATA: users[] = [];

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: true,
    imports: [MatTableModule, NgIf, MatButtonModule, RouterLink, MatIconModule]
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'phone', 'actions'];
  dataSource = DATA;

  isLoggedIn = false;
  isAdmin = false;
  user: any = null;

  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.userService.getAllUser().subscribe(
      (data: any) => {
        this.dataSource = data;
      })

    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.isAdmin = this.loginService.isAdmin();

  }

  onEditClick(row: any): void {
    console.log('Usuario de la lista:', row);
    this.loginService.setTmpUser(row);
  }

}
