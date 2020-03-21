import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from './../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  roles: any = ['admin'];

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }
  

  ngOnInit() { }

  registerUser() {
    this.apiService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset()
        this.router.navigate(['log-in']);
      }
    })
  }
}
