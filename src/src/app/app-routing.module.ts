import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
  canActivate: [AuthGuardService]
},{
  path: 'login',
  component: LoginComponent,
  pathMatch: 'full'
},{
  path: 'register',
  component: RegisterComponent,
  pathMatch: 'full'
},
{
  path: '',
  //component: AraujoLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      canActivate: [AuthGuardService]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
