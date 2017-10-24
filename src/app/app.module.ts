import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import  { appRoutingProviders, routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmAccountComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
