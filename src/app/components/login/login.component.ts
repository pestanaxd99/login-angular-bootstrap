import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'angular-8-registration-login-example-ByCris';

  userForm: FormGroup;

  private validationMessages: {
    [key: string]: { [key: string]: string | { [key: string]: string } };
  };

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      username: {
        required: "Please enter your username"
      },
      password: {
        required: "Please enter your password",
      }
    };
  }
  
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    console.log(this.userForm);
  }

  register(){
    
  } 
}