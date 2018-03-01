import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import  { appRoutingProviders, routing } from './app.routes';

import { AppComponent } from './app.component';
import { SignInComponent } from './signin/signin.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { AuthService, CanActivateViaAuthGuard } from './auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AnonSignupErrorComponent } from './anon-signup-error/anon-signup-error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ConfirmAccountComponent,
    SignUpComponent,
    AnonSignupErrorComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [appRoutingProviders, AuthService, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
