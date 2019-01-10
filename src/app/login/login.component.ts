import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {
  verified: boolean;
  noAccess: boolean;
  loading: boolean = true;

  constructor(public auth: AuthService, private router: Router) {
    this.auth.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    let profile = JSON.parse(window.localStorage.getItem('profile'));
    this.handleAuthentication();
    if (!this.auth.authenticated()) {
      this.auth.status.subscribe(status => {
        if (status) {
          if (status && (profile === null || profile.email_verified === null)) {
            profile = JSON.parse(window.localStorage.getItem('profile'));
          }
          status ? (this.verified = profile.email_verified) : null;
          if (profile.email_verified) {
            this.getUser();
          } else {
            this.router.navigate(['/confirm-account']);
          }
        }
      });
    } else {
      this.auth.getProfile((err, res) => {
        profile = res;
      });
      if (profile.email_verified) {
        this.getUser();
      }
    }
  }

  handleAuthentication() {
    if (window.location.hash.includes('token')) {
      return this.auth.handleAuthentication();
    }
  }

  login() {
    localStorage.clear();
    this.auth.login();
  }

  signUp() {
    localStorage.clear();
    this.auth.signUp();
  }

  getUser() {
    this.auth.getAirshipUser()
      .then(user => {
        if (user.error && (user.error.status === 403 || user.error.status === 401)) {
          this.noAccess = true;
          this.loading = false;
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          this.auth.user = user;
          this.loading = false;
          this.auth.getAccount()
            .subscribe(
              account => localStorage.setItem('account', JSON.stringify(account)),
              error => console.error(error)
            );
        }
      }).catch(err => {
        console.error(err);
      });
  }

}
