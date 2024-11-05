import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertifyService } from '../../../services/alertify.service';
import { LoginDto } from '../../../models/dtos/loginDto';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  operationContinues: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.operationContinues = true;
      let loginDto: LoginDto = Object.assign({}, this.loginForm.value);
      this.authService.login(loginDto).subscribe(
        (response) => {
          if (response.success) {
            this.operationContinues = false;
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('userName', loginDto.username);
            this.alertifyService.success(response.message);
            this.router.navigate(['/']);
          } else {
            this.operationContinues = false;
            this.alertifyService.alert('Hata', response.message);
          }
        },
        (error) => {
          this.operationContinues = false;
          this.alertifyService.alert('Hata', error.error.message);
        }
      );
    }
  }

  resetForm() {
    this.loginForm.reset();
  }
}
