import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginData = { email: '', password: '' };

  constructor( private authService: Auth, private router: Router ) {}

  login() {
    this.authService.loginUser(this.loginData).subscribe(
      (response) => {
        if (response.valid) {
          const userProfile = { ...response};
          delete userProfile.password;
          localStorage.setItem('currentUser', JSON.stringify(userProfile));

      this.router.navigate(['/profile']);
    }  
  },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}

