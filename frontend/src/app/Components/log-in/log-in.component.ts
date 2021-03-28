import { Component, OnInit } from '@angular/core';
import { logInData } from 'src/app/models/logInData';

import { FormControl,FormGroup,Validators } from '@angular/forms';
import { LogInService } from 'src/app/Services/logInService/log-in.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  logInData : logInData = {
    userName : "",
    emailId : "",
    password : ""
  }

  constructor(private logInService : LogInService, private router : Router) { }

  ngOnInit(): void {
  }

  logInForm = new FormGroup({
    password : new FormControl('',[Validators.required,Validators.pattern("")]),
    userName : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$")]),
    emailId : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
  });

  get userName(){
    return this.logInForm.get('userName') as FormControl;
  }

  get emailId(){
    return this.logInForm.get('emailId') as FormControl;
  }

  get password(){
    return this.logInForm.get('password') as FormControl;
  }

  onLogIn() {
    this.logInService.postLogInData(this.logInData).subscribe((data : any) => {
      if(data.success) {
        localStorage.setItem("userName", data.data.userName);
        console.log(data)
        this.router.navigate(["/dashBoard"]);
      }
      else {
        Swal.fire("SongShareApp","This User Is Not Registered Or Credentials Are Not Appropriate", "error");
      }
    })
  }

}
