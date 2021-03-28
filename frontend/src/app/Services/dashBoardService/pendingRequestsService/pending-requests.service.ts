import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestsService {

  constructor(private http : HttpClient) { }

  getPendingrequests() : Observable<any> {
    let header = new HttpHeaders();
    let userName = localStorage.getItem("userName");
    if(userName != null) {
      header = header.set("userName", userName);
    }
    return this.http.get("http://localhost:8000/getPendingRequestList", {headers : header});
  }

}
