import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './_services/auth-guard.service';
import {MainComponent} from './main/main.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},

  {path: '', canActivate: [AuthGuard], component: MainComponent, children: [
      {path: 'main', component: MainComponent}
    ]},

  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
  // providers: [UserResolver]
})

export class AppRoutingModule {

}