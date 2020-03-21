import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from './../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  public handleError = (controlName: string, errorName: string) => {
    return this.signinForm.controls[controlName].hasError(errorName);
  }

  loginUser() {
    if(this.signinForm.valid){
      this.apiService.signIn(this.signinForm.value)
    }
    else{
      alert('Please enter correct username and password');
    }
    
  }
}
