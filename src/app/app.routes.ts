import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmAccountComponent } from './confirm-account';
import { LoginComponent } from './login';
import { CanActivateViaAuthGuard } from './auth';

const AppRoutes : Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/confirm-account', component: ConfirmAccountComponent, canActivate: [CanActivateViaAuthGuard] }
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(AppRoutes);