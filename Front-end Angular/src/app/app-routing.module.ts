import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RastrearComponent } from './components/rastrear/rastrear.component';
import { PagaloComponent } from './components/pagalo/pagalo.component';
import { AgenciasComponent } from './componentsAdmin/agencias/agencias.component';
import { TarifasComponent } from './components/tarifas/tarifas.component';
import { AgenciaDetalleComponent } from './componentsAdmin/agencia-detalle/agencia-detalle.component';
import { FlotaInfoComponent } from './componentsAdmin/flota-info/flota-info.component';
import { EnvioCrearComponent } from './components/envio-crear/envio-crear.component';
import { RutasHorariosComponent } from './componentsAdmin/rutas-horarios/rutas-horarios.component';
import { EnvioHistorialComponent } from './components/envio-historial/envio-historial.component';
import { ComunicateComponent } from './components/comunicate/comunicate.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { DashboardAdminComponent } from './componentsAdmin/dashboard-admin/dashboard-admin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AgenciasAdminComponent } from './componentsAdmin/agencias-admin/agencias-admin.component';
import { ServiciosComponent } from './componentsAdmin/servicios/servicios.component';
import { EmpleadoDashboardComponent } from './componentsEmpleado/empleado-dashboard/empleado-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin-dashboard', component: DashboardAdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'rutas-horarios', component: RutasHorariosComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }  },
  { path: 'servicios', component: ServiciosComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'agencias-admin', component: AgenciasAdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'envio-historial', component: EnvioHistorialComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'flota-info', component: FlotaInfoComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'empleado-dashboard', component: EmpleadoDashboardComponent, canActivate: [AuthGuard], data: { roles: ['empleado'] }  },

  { path: 'envio-crear', component: EnvioCrearComponent, canActivate: [AuthGuard] },
  { path: 'rastrear', component: RastrearComponent, canActivate: [AuthGuard] },
  { path: 'pagalo', component: PagaloComponent, canActivate: [AuthGuard] },
  { path: 'agencias', component: AgenciasComponent, canActivate: [AuthGuard] },
  { path: 'agencia-detalle/:id', component: AgenciaDetalleComponent, canActivate: [AuthGuard] },
  { path: 'tarifas', component: TarifasComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, 
  { path: 'comunicate', component: ComunicateComponent, canActivate: [AuthGuard] },
  { path: 'company-info', component: CompanyInfoComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
