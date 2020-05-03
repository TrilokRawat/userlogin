import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService, SharedService } from '../services/index';
import { AddEdituserComponent } from './add-edituser/add-edituser.component'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(AddEdituserComponent, { static: false }) private addEditUser: AddEdituserComponent;
  p = 1;
  userList;
  userDetail;

  constructor(private apiService: ApiServiceService,
              private toastr: ToastrService,
              public shared: SharedService) { }

  ngOnInit() {
    this.getAllUser();
  }

  // get all user record
  getAllUser() {
    this.apiService.fetchData('user', {}, 'GET').subscribe(res => {
      console.log(res);
      if (res['error'] == false) {
        this.userList = res['data'];
      } else {
        this.userList = [];
      }
    });
  }

  //  delete user.
  deleteUser(id) {
    if (window.confirm('Are you sure the action can not be reverted.')) {
      this.apiService.fetchData('user/deleteUser/' + id, {}, 'DELETE').subscribe(res => {
        console.log(res);
        if (res['error'] == false) {
         this.getAllUser();
         this.toastr.success('user deleted succesfully.');
        } else {
          this.userList = [];
          this.toastr.success(res['message']);
        }
      });
    }
  }

  //  open add/edit child component.
  onAddEditUser(key, data) {
    console.log(key, data);
    console.log(this.addEditUser);
    this.addEditUser.key = key;
    this.addEditUser.userObj = data;
    this.addEditUser.openAddEditModel();
  }

  viewUser(id) {
    console.log(id);
    this.userDetail = undefined;
    this.apiService.fetchData('user/' + id, {}, 'GET').subscribe(
      res => {
        if (res['error'] == false) {
          this.userDetail = res['data'][0];
        } else {
          this.userDetail = {};
        }
      }
    );
  }

}
