import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import { UserModel } from '../models/user.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  user: UserModel;
  hidden = true;

  constructor(public router: Router, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private service: LoginService) { }

  ngOnInit() {
    this.service.Logout();
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onRegister() {
    this.router.navigate(['register']);
  }
  onLogin() {
    this.loading = true;
    this.hidden = true;
    this.markFormGroupTouched(this.formLogin);
    if (this.formLogin.valid) {
      this.user = this.formLogin.value;
      this.service.Login(this.user).subscribe(data => {
        if (data) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.router.navigate(['home']);
        }
        else {
          this.loading = false;
          this.hidden = false;
        }
      }, error => {
        this.snackBar.open("Erro ao efetuar login", null, {
          verticalPosition: 'top', horizontalPosition: 'center', panelClass: ['error-snackbar'], duration: 5000
        });
        this.loading = false;
        this.hidden = false;
      })
    }
    else {
      this.loading = false;
      this.hidden = false;
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
