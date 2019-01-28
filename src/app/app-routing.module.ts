import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './components/dashboard/dashboard.routes';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes, // Un array de rutas
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  // Se usa forRoot cuando es el archivo de rutas principal
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
