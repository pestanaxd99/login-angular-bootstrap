import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './services/routing/app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AuthGuard } from './services/guards/auth.guard';
import { NotLogguedComponent } from './components/not-loggued/not-loggued.component';
import { DarklightThemeComponent } from './components/darklight-theme/darklight-theme.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProyectComponent } from './components/proyect/proyect.component';


@NgModule({
  declarations: [
    AppComponent,

    //Components
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavigationComponent,
    FooterComponent,
    NotLogguedComponent,
    DarklightThemeComponent,
    CertificationsComponent,
    ContactComponent,
    ProyectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
