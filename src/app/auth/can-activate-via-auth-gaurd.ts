import { Injectable  } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  status: boolean = false;

  constructor (private auth: AuthService, private router: Router) {}

  canActivate() {
    if (!this.auth.authenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
