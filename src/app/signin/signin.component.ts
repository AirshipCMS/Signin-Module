import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth';

declare var window;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
  verified : boolean;
  user : any;
  loginType : string;
  profile;
  loginTypes : Array<any>;

  constructor(public auth: AuthService, private router: Router) {
    this.loginTypes = [
      { type: 'Auth0' },
      { type: 'Facebook' },
      { type: 'GitHub' },
      { type: 'Google' }
    ]
  }

  ngOnInit() {
    this.getAccessToken();
    this.profile = this.auth.getProfile();
    this.verified = this.profile ? this.profile.email_verified : false;
    if(this.auth.authenticated()) {
      this.getUser();
    } else {
      this.auth.status.subscribe(status => {
        this.profile = this.auth.getProfile();
        status ? this.verified = this.profile.email_verified : null;
        this.verified = this.profile ? this.auth.getProfile().email_verified : false;
        this.getUser();
      });
    }
  }

  signIn() {
    localStorage.clear();
    this.auth.signIn();
  }

  getUser() {
    this.auth.getAirshipUser()
      .subscribe(
        user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
          let email = user['auth0_user'].email;
          this.auth.user = this.user;
          if(!this.verified) {
            this.router.navigate(['/confirm-account']);
          } else {
            this.loginType = this.loginTypes.find((item) => item.type.toLowerCase() === this.user.auth0_user.auth0_id.split('|')[0]).type;
            if(window.airshipToggleStatus) {
              window.airshipToggleStatus(email);
            }
          }
        }, err => {
          console.error(err);
          if(err.status === 401) {
            this.router.navigate(['/error']);
          }
        }
      );
  }

  getAccessToken() {
    let code = location.search.split('code=')[1];
    if(code !== undefined) {
      localStorage.setItem('code', code);
      this.auth.getAccessToken(code)
        .subscribe(
          res => {
            this.auth.saveToken(res['id_token']);
            this.auth.lock._events.authenticated();
            window.history.pushState("", "", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
          }, err => {
            console.log(err);
            window.history.pushState("", "", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
          }
      );
    }
  }

}
