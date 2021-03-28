import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudioTryComponent } from './Components/audio-try/audio-try.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

const routes: Routes = [
  { path : "" , component : SignUpComponent },
  { path : "logIn", component : LogInComponent },
  { path : "dashBoard" , component :DashboardComponent },
  { path : "trial", component : AudioTryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
