import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { logInData } from 'src/app/models/logInData';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http : HttpClient) { }

  postLogInData(data : logInData) {
    return this.http.post("http://localhost:8000/logIn", data);
  }
}
