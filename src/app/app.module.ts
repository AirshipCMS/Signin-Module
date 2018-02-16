import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import  { appRoutingProviders, routing } from './app.routes';

import { AppComponent } from './app.component';
import { SignInComponent } from './signin/signin.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { AuthService, CanActivateViaAuthGuard } from './auth';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ConfirmAccountComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders, AuthService, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
