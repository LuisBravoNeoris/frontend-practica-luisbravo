import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.css'],
    standalone: true,
    imports: [MatIconModule]
})
export class UnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
