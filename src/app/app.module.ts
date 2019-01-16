import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import  { appRoutingProviders, routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { AuthService, CanActivateViaAuthGuard } from './auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmAccountComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [appRoutingProviders, AuthService, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
