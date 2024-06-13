import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatIconModule, MatButtonModule, MatSnackBarModule]
})
export class LoginComponent implements OnInit {

  hide = true;
  centered = true;

  loginData = {
    "username": '',
    "password": '',
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    if (this.loginService.isAdmin()) {
      this.router.navigate(['admin']);
    }

    if(this.loginService.isNormal()){
      this.router.navigate(['dashboard']);
    }

  }

  formSubmit(loginForm: NgForm) {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('El nombre de usuario es requerido', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('La contraseña es requerida', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.loginUser(data.token);
          this.loginService.setUser(user);
          console.log(user);
          if (this.loginService.getUserRole() == "ADMIN") {
            // Dashboard admin
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if (this.loginService.getUserRole() == "NORMAL") {
            // Dashboard normal
            //window.location.href = '/dashboard';
            this.router.navigate(['dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else {
            this.loginService.logout();
          }

        })
      }, (error: any) => {
        console.log(error);
        this.snack.open('Datos invalidos, vuelva a intentarlo', '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    )

    //loginForm.resetForm();
  }

} 
