import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  checkUserRole() {
    let user = localStorage.getItem('loginUser');
    user = user ? JSON.parse(user) : '';
    if (Array.isArray((user)) && user[0].role == 'super_admin') {
      return true;
    } else {
      return false;
    }
  }
}
