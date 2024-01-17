import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  isLoggin: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  changeSignIn() {
    this.isLoggin = !this.isLoggin;
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.authService.login({username: this.loginForm.value.email, password: this.loginForm.value.password}, this.isLoggin).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/books']); 
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
