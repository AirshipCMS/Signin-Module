import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth';

declare var window;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user;
  verified: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getAccessToken();
    this.verified = this.auth.getProfile() ? this.auth.getProfile().email_verified : false;
    if(this.auth.authenticated()) {
      this.getUser();
    } else {
      this.auth.status.subscribe(status => {
        status ? this.verified = this.auth.getProfile().email_verified : null;
        this.verified = this.auth.getProfile() ? this.auth.getProfile().email_verified : false;
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
          if(!this.verified) {
            this.router.navigate(['/confirm-account']);
          } else {
            if(window.airshipToggleStatus) {
              window.airshipToggleStatus(user.email);
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
            this.auth.saveToken(res.id_token);
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
