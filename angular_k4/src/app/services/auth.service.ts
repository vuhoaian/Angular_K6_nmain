import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, responseDataLogin } from '../types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://hoadv-nodejs.vercel.app/auth';
  
  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

  private getHeaders(): HttpHeaders {
    if (!sessionStorage.getItem('token_admin')) this.route.navigateByUrl("/login");
    const token = sessionStorage.getItem('token_admin');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    })
  }

  registerAccount(account: Omit<User, "_id" | "role">): void {
    this.http.post<User>(`${this.apiUrl}/register`, account).subscribe(data => {
      const { email, password } = account;
      this.loginAccount({ email, password });
    }, (error) => {
      console.log(error);
      this.toastr.warning("Register failed!", "", {

      });
    }
    );
  }

  createUser(account: Omit<User, "_id" | "role">): void {
    this.http.post<User>(`${this.apiUrl}`, account).subscribe(data => {
      this.route.navigateByUrl("/admin/users");
    }, (error) => {
      console.log(error);
      this.toastr.warning("Create failed!", "", {
      });
    }
    );
  }

  getDetailUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(accout: User): void {
    const options = {
      headers: this.getHeaders(),
    }
    this.http.put<User>(`${this.apiUrl}/${accout}`, accout, options).subscribe(() => {
      this.route.navigateByUrl("/admin/users");
      this.toastr.success("Updated accout successfully!", "");
    }, error => {
      console.log(error);
      this.toastr.error("Error updating...");
    });
  }

  loginAccount(account: Omit<User, "fullname" | "_id" | "role">): void {
    this.http.post<responseDataLogin>(`${this.apiUrl}/login`, account).subscribe((data) => {
      
      
        this.route.navigateByUrl("/admin/products");
        sessionStorage.setItem("token", data.token);
    
    }, (error) => {
      this.toastr.warning("Email or password incorrect!", "");
    }
    )
  }

  getAllUsers(): Observable<Omit<User, "role">[]> {
    const options = {
      headers: this.getHeaders(),
    }
    return this.http.get<Omit<User, "role">[]>(this.apiUrl, options);
  }

  removeUser(id: number): Observable<User> {
    const options = {
      headers: this.getHeaders(),
    }
    return this.http.delete<User>(`${this.apiUrl}/${id}`, options);
  }
}