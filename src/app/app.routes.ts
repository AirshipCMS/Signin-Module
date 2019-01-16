import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmAccountComponent } from './confirm-account';
import { LoginComponent } from './login';
import { ForgotPasswordComponent } from './forgot-password';
import { CanActivateViaAuthGuard } from './auth';

const AppRoutes : Routes = [
  { path: '', component: LoginComponent },
  { path: 'confirm-account', component: ConfirmAccountComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(AppRoutes);