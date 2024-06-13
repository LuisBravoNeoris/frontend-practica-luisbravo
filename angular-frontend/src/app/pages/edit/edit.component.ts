import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { CanComponentDeactivate } from '../../services/guards/route-change.guard';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface role {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    standalone: true,
    imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgFor, MatButtonModule, MatSnackBarModule]
})
export class EditComponent implements OnInit, CanComponentDeactivate {

  public user = {
    username: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    rol: ''
  }

  action: string | undefined;

  selectedValue: string | undefined;
  roles: role[] = [
    { value: 'NORMAL', viewValue: 'Recepcionista' },
    { value: 'ADMIN', viewValue: 'Admin' },
  ];

  constructor(private userService: UserService, private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  canDeactivate(): boolean {
    return true;
  }

  ngOnInit(): void {

    if (!localStorage.getItem("usertmp")) {
      console.log('Elemento usertmp no encontrado en localStorage, redirigiendo a otra ruta');
      this.router.navigate(['/dashboard']);
    }

    this.reloadForm();
  }

  reloadForm() {
    let tmpUser = this.loginService.getTmpUser();
    this.user.username = tmpUser.username;
    this.user.name = tmpUser.name;
    this.user.lastname = tmpUser.lastname;
    this.user.email = tmpUser.email;
    this.user.phone = tmpUser.phone;
    this.user.rol = tmpUser.authorities && tmpUser.authorities.length > 0 ? tmpUser.authorities[0].authority : "NORMAL";
    this.selectedValue = this.user.rol;
  }

  deleteUser() {
    this.userService.deleteUser(this.loginService.getTmpUser().id)
  }

  redirect() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  formSubmit(updateUserForm: NgForm) {

    if (updateUserForm.valid) {
      if (this.action === 'save') {
        console.log(updateUserForm);

        if (this.user.username == '' || this.user.username == null) {
          this.snack.open('El nombre de usuario es requerido', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['mat-toolbar', 'mat-warn']
          });
          return;
        }

        this.userService.updateUser(this.user).subscribe(
          (data: any) => {
            console.log(data);
            this.loginService.setUser(data);
            this.snack.open('Usuario guardado exitosamente', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mat-toolbar', 'mat-success-snack']
            });
          }, (error: any) => {
            console.error(error);
            this.snack.open('Ha ocurrido un error en el sistema', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
        )

        this.loginService.getCurrentUser().subscribe((user: any) => {
          localStorage.removeItem("user");
          this.loginService.setUser(user);
        })

        this.redirect();

      } else if (this.action === 'delete') {

        this.userService.deleteUser(this.loginService.getTmpUser().id).subscribe(
          () => {
            this.snack.open('Usuario eliminado exitosamente', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mat-toolbar', 'mat-success-snack']
            });
          }, (error: any) => {
            console.error(error);
            this.snack.open('Ha ocurrido un error en el sistema', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
        )

        this.redirect();
      }

    }

  }

}
