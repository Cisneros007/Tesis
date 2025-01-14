import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './componentsAdmin/sidebar/sidebar.component';
import { RastrearComponent } from './components/rastrear/rastrear.component';
import { FormsModule } from '@angular/forms';
import { PagaloComponent } from './components/pagalo/pagalo.component';
import { AgenciasComponent } from './componentsAdmin/agencias/agencias.component';
import { TarifasComponent } from './components/tarifas/tarifas.component';
import { AgenciaDetalleComponent } from './componentsAdmin/agencia-detalle/agencia-detalle.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { FlotaInfoComponent } from './componentsAdmin/flota-info/flota-info.component';
import { RutasHorariosComponent } from './componentsAdmin/rutas-horarios/rutas-horarios.component';
import { ServiciosTerrestreComponent } from './componentsAdmin/servicios-terrestre/servicios-terrestre.component';
import { ServiciosAereoComponent } from './componentsAdmin/servicios-aereo/servicios-aereo.component';
import { EnvioCrearComponent } from './components/envio-crear/envio-crear.component';
import { EnvioHistorialComponent } from './components/envio-historial/envio-historial.component';
import { ComunicateComponent } from './components/comunicate/comunicate.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { MapaComponent } from './mapa/mapa.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    RastrearComponent,
    PagaloComponent,
    AgenciasComponent,
    TarifasComponent,
    AgenciaDetalleComponent,
    FlotaInfoComponent,
    RutasHorariosComponent,
    ServiciosTerrestreComponent,
    ServiciosAereoComponent,
    EnvioCrearComponent,
    EnvioHistorialComponent,
    ComunicateComponent,
    CompanyInfoComponent,
    MapaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),


    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
