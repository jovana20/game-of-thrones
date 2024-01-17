import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private authUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  signIn(body: { email: string, password: string }) {
  }

  login( body: { username: string, password: string }, isLoggin = true) {

    if(isLoggin) {
      return this.http.post(`${this.authUrl}/login`, body);

    } else {
      return this.http.post(`${this.authUrl}/signup`, body);

    }

  }

}
