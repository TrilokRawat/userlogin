import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { loginForm } from '../forms';
import { Router } from '@angular/router';
import { ApiServiceService, SharedService } from '../services/index';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  submitted = false;
  message = '';
  constructor(private fb: FormBuilder,
              private router: Router,
              private apiService: ApiServiceService,
              private toastr: ToastrService ) { }

  ngOnInit() {
    this.loginForm = loginForm;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get loginData() {
    return this.loginForm.controls;
  }

  // login form
  onSubmit(data) {
    if (this.loginForm.invalid) {
      this.submitted = true;
      return false;
      }

    this.apiService.fetchData('login', data, 'POST').subscribe(res => {
      if (res['error'] == false) {
        this.message = res['message'];
        this.router.navigate(['/user'], {queryParams: {
					ver: Math.random().toString(36).substr(2, 5),
					nocache: 1
        }});
        this.toastr.success('Login succesfull...!');
        localStorage.setItem('loginUser', JSON.stringify(res['data']));
      } else {
        this.message = res['message'];
        this.toastr.error(res['message']);
      }
      });
    // stop here if form is invalid
    // display form values on success
  }

}
