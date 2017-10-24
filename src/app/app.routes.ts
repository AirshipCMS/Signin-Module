import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmAccountComponent } from './confirm-account';
import { LoginComponent } from './login';

const AppRoutes : Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login#confirm-account', component: ConfirmAccountComponent }
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(AppRoutes);