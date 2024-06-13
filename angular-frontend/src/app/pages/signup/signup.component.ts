import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

interface role {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    standalone: true,
    imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgFor, MatButtonModule, MatSnackBarModule]
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    name : '',
    lastname : '',
    email : '',
    phone : '',
    rol: ''
  }

  selectedValue: string | undefined;
  roles: role[] = [
    { value: 'NORMAL', viewValue: 'Recepcionista' },
    { value: 'ADMIN', viewValue: 'Admin' },
  ];

  constructor(private userService:UserService, private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(signupForm: NgForm){

    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido', '',{
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      //Swal.fire('Error','Hubo un error','error');
      return;
    }

    if(this.user.password == '' || this.user.password == null){
      this.snack.open('La contraseña es requerida', '',{
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      //Swal.fire('Error','Hubo un error','error');
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        this.snack.open('Usuario guardado exitosamente', '',{
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['mat-toolbar', 'mat-success-snack']
        });
      },(error: any) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema', '',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    )

    signupForm.resetForm();

    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    }); 

  }

}
