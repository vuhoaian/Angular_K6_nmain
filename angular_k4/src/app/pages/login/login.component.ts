import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);

  loginUser = {
    email: '',
    password: '',
  };

  handleLogin() {
    sessionStorage.setItem('token', 'token');
    // validate required all + email
    // call api login
    this.router.navigate(['/admin/products']);
  }
}
