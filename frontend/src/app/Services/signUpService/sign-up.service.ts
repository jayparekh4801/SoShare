import { Injectable } from '@angular/core';
import { signUpData } from 'src/app/models/signUpData';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http : HttpClient) { }

  postSignUpData(data : signUpData) {
    return this.http.post("http://localhost:8000/signUp", data);
  }
}
