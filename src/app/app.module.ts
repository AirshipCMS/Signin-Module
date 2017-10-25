import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import  { appRoutingProviders, routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { AuthService } from './auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
