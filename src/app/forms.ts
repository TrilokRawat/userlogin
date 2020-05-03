import { FormControl, FormGroup } from '@angular/forms';



export const loginForm = new FormGroup({
  username: new FormControl(''),
  password: new FormControl(''),
});

export const userForm = new FormGroup({
  name: new FormControl(''),
  email: new FormControl(''),
  username: new FormControl(''),
  password: new FormControl(''),
  role: new FormControl(''),
  address: new FormControl(''),
  city: new FormControl(''),
  state: new FormControl(''),
});


