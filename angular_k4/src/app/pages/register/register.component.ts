import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent   {

  account = {
    fullname:"",
    email: "",
    password: "",
  }

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) { }

  valid = {
    fullname:"",
    email: "",
    password: "",
  };

  isLogin = false;

  

  handleValidInput() {
    if (this.account.email.trim().length === 0) {
      this.valid.email = "Email is required!";
      this.isLogin = false;
    }
    if (this.account.fullname.trim().length === 0) {
      this.valid.fullname = "fullname is required!";
      this.isLogin = false;
    }
    if (this.account.password.trim().length === 0) {
      this.valid.password = "Password is required!";
      this.isLogin = false;
    }
    if (this.account.email.trim().length === 0 && this.account.password.trim().length === 0 && this.account.fullname.trim().length === 0 ) this.isLogin = true;

    return this.isLogin;
  }

  handleSubmitLogin() {
    
    
    if (this.handleValidInput()) return;
    console.log("oke"); 
    this.auth.registerAccount(this.account)
   
    
  }

}