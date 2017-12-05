import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {
  verified : boolean;
  user : any;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.getAccessToken();
    this.verified = this.auth.getProfile() ? this.auth.getProfile().email_verified : false;
    if(!this.verified && this.auth.authenticated) {
      this.router.navigate(['/signin/confirm-account']);
    }
    if(this.auth.authenticated() && this.auth.getProfile().email_verified) {
      this.getUser();
    } else {
      this.auth.status.subscribe(status => {
        status ? this.verified = this.auth.getProfile().email_verified : null;
        this.verified = this.auth.getProfile() ? this.auth.getProfile().email_verified : false;
        if(!this.verified) {
          this.router.navigate(['/signin/confirm-account']);
        }
        else if((this.user === null || this.user === undefined) && this.verified) {
          this.getUser();
        }
      });
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
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
        this.auth.getAccount()
          .subscribe(
            account => localStorage.setItem('account', JSON.stringify(account)),
            error => console.error(error)
          );
      }).catch(err => {
        console.error(err);
      });
  }

  getAccessToken() {
    let code = location.search.split('code=')[1];
    if(code !== undefined) {
      localStorage.setItem('code', code);
      this.auth.getAccessToken(code)
        .then(res => {
          this.auth.saveToken(res.id_token);
          this.auth.lock._events.authenticated();
          window.history.pushState("", "", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
        }).catch(err => {
          console.log(err);
          window.history.pushState("", "", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
        });
    }
  }

}
