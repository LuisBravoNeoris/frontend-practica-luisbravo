import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../../../components/user-list/user-list.component';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css'],
    standalone: true,
    imports: [UserListComponent]
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
