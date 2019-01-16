import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['../app.component.css', './confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  confirmationEmailSent : boolean;

  constructor(private auth: AuthService, private router: Router) { }
  
  ngOnInit() {
    let profile = JSON.parse(window.localStorage.getItem('profile'));
    this.handleAuthentication();
    if (!this.auth.authenticated()) {
      this.auth.status.subscribe(status => {
        if (status) {
          if (status && (profile === null || profile.email_verified === null)) {
            profile = JSON.parse(window.localStorage.getItem('profile'));
          }
          if (profile.email_verified) {
            this.router.navigate(['/']);
          }
        }
      });
    } else {
      this.auth.getProfile((err, res) => {
        profile = res;
      });
      if (profile.email_verified) {
        this.router.navigate(['/']);
      }
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  handleAuthentication() {
    if (window.location.hash.includes('token')) {
      return this.auth.handleAuthentication();
    }
  }

  resendConfirmation() {
    this.auth.getToken()
      .then(res => {
        this.auth.resendVerification(res.access_token)
          .then(res => {
            this.confirmationEmailSent = true;
            setTimeout(() =>this.confirmationEmailSent = false, 3000);
          }).catch(err => console.error(err));
      }).catch(err => console.error(err));
  }

  refresh() {
    window.location.reload();
  }

}
