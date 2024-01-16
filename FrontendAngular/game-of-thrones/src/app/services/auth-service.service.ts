import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private authUrl = 'http://localhost:3000'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  signIn(userData: { email: string, password: string }) {
    return this.http.post(`${this.authUrl}/signin`, userData);
  }

  login( body: { username: string, password: string }) {
    return this.http.post(`${this.authUrl}/signup`, body)
      .subscribe((res: any) => {
          localStorage.setItem('token', res.token);
        })
      ;
  }
  
  // ... other methods
}
