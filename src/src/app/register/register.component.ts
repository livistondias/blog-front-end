import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidation } from '../shared/validations/password-validation';
import { RegisterService } from './register.service';
import { UserModel } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  loading = false;
  user: UserModel;
  constructor(public router: Router, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private service: RegisterService) { }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidation.strong]],
      confirmpassword: ['']
    },
      {
        validator: PasswordValidation.MatchPassword
      });
  }

  onRegister() {
    this.loading = true;
    this.markFormGroupTouched(this.formRegister);
    if (this.formRegister.valid) {
      this.user = this.formRegister.value;      
      this.service.Register(this.user).subscribe(data => {
        this.snackBar.open("Registro efetuado com sucesso", null, {
          verticalPosition: 'bottom', horizontalPosition: 'left', panelClass: ['sucess-snackbar'], duration: 5000
        });
        this.router.navigate(['login']);
      }, error => {
        this.snackBar.open("Erro ao efetuar registro", null, {
          verticalPosition: 'top', horizontalPosition: 'center', panelClass: ['error-snackbar'], duration: 5000
        });
        this.loading = false;
      })
    }
    else {
      this.loading = false;
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
