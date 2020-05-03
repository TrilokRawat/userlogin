import { Component, OnInit } from '@angular/core';
import { userForm } from '../../forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiServiceService } from '../../services/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edituser',
  templateUrl: './add-edituser.component.html',
  styleUrls: ['./add-edituser.component.css']
})
export class AddEdituserComponent implements OnInit {
  key = '';
  userObj;
  userForm = userForm;
  submitted = false;
  constructor(private fb: FormBuilder,
              private apiService: ApiServiceService,
              private Toastr: ToastrService) { }

  ngOnInit() {
  }

  openAddEditModel() {
    this.submitted = false;
    this.userForm.reset();
    this.addVailidation();
    document.getElementById('add-edit-model-open').click();
    if (this.key == 'Edit') {
      this.setFormValue();
    }
  }

  //  add/edit user
  addUser(data) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    if ( this.key == 'Add') {
      this.apiService.fetchData('user/addUser', data, 'POST')
      .subscribe( res => {
        if (res['error'] == false) {
          this.Toastr.success('User created succesfully.')
          document.getElementById('get-all-user').click();
          document.getElementById('close-model').click();
        } else {
          this.Toastr.error(res['message']);
          this.submitted = false;
        }
      });
    }

    if (this.key == 'Edit') {
      delete data['password'];
      delete data['email'];
      delete data['username'];
      this.apiService.fetchData('user/updateUser/' + this.userObj._id, data, 'POST')
      .subscribe( res => {
        if (res['error'] == false) {
          this.Toastr.success('User updated succesfully.');
          document.getElementById('get-all-user').click();
          document.getElementById('close-model').click();
        } else {
          this.Toastr.error(res['message']);
          this.submitted = false;
        }
      });
    }
  }

  // add vailidation
  addVailidation() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      address: ['', ''],
      city: ['', ''],
      state: ['', ''],
    });
  }

// get form value.
  get f() { return this.userForm.controls; }

//  set form value form edit user.
  setFormValue() {
    this.userForm.patchValue({
      name: this.userObj.name,
      username: this.userObj.username,
      password: this.userObj.password,
      email: this.userObj.email,
      role: this.userObj.role,
      address: this.userObj.address,
      city: this.userObj.city,
      state: this.userObj.state,
    });
  }
}
