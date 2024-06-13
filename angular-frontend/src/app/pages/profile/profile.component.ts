import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: true,
    imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule]
})
export class ProfileComponent implements OnInit {

  public user = {
    username : '',
    name : '',
    lastname : '',
    email : '',
    phone : ''
  }


  constructor(private userService:UserService, private snack:MatSnackBar, private loginService:LoginService, private router: Router) { }

  ngOnInit(): void {
    this.reloadForm();
  }

  reloadForm(){
    this.user.username = this.loginService.getUser().username;
    this.user.name = this.loginService.getUser().name;
    this.user.lastname = this.loginService.getUser().lastname;
    this.user.email = this.loginService.getUser().email;
    this.user.phone = this.loginService.getUser().phone;
  }

  formSubmit(updateUserForm: NgForm) {

    console.log(updateUserForm);

    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es requerido', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      //Swal.fire('Error','Hubo un error','error');
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

    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    }); 
  
  }

}
