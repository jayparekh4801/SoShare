import { Component, OnInit } from '@angular/core';
import { signUpData } from 'src/app/models/signUpData';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { SignUpService } from 'src/app/Services/signUpService/sign-up.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpData : signUpData = {
    name : "",
    emailId : "",
    userName : "",
    password : "",
  }

  constructor(private signUpService : SignUpService, private router : Router) { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
    password : new FormControl('',[Validators.required,Validators.pattern("")]),
    userName : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$")]),
    emailId : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
  });
  
  get name(){
    return this.signUpForm.get('name') as FormControl;
  }

  get userName(){
    return this.signUpForm.get('userName') as FormControl;
  }

  get emailId(){
    return this.signUpForm.get('emailId') as FormControl;
  }

  get password(){
    return this.signUpForm.get('password') as FormControl;
  }

  onSignUp() {
      this.signUpService.postSignUpData(this.signUpData).subscribe((data : any) => {
        if(data.success) {
          Swal.fire("SongShareApp", "You Have Registered Succesfullu, Welocme To SongShareApp Comunity", "success")
          .then(result => {
            if(result) {
              this.router.navigate(['/logIn'])
            }
          })
        }
        else {
          Swal.fire("SongShareApp", "This UserName And Password Is Already Used", "error");
        }
      });
  }

}
