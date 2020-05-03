import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent} from './user-list/user-list.component';
import { AuthGuard } from './Gaurd/auth.guard';

const routes: Routes = [
 { path: '',   redirectTo: '/user', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserListComponent, canActivate: [AuthGuard]   },
  { path: '**',  redirectTo: '/user', pathMatch: 'full', canActivate: [AuthGuard]   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
