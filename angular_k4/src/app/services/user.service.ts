import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiAdminUrl = 'https://hoadv-nodejs.vercel.app/students'; // khai bao apiUrl
  http = inject(HttpClient); // inject bien http

  constructor() {}

  getUserListAdmin(seacrh?: string): Observable<UserResponse> {
    const apiUrl = seacrh
      ? `${this.apiAdminUrl}?search=${seacrh}`
      : this.apiAdminUrl;
    return this.http.get<UserResponse>(apiUrl); //axios.get(apiUrl)
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiAdminUrl}/${id}`);
  }
}
