import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';
  error = false;

  private users = [
    { email: '123@gmail.com', password: '123456' },
    { email: 'test@gmail.com', password: 'test123' },
    { email: 'admin@gmail.com', password: 'admin123'}
  ]

  constructor( private router: Router ) {}

  login() {
    const user = this.users.find(u => u.email === this.email && u.password === this.password);
    if (user) {
      console.log('Login successful, navigating to profile');
      this.router.navigate(['/profile']);
    } else {
      console.log('Login failed');
      this.error = true;
    }
  }

}

