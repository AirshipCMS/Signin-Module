import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth';

@Component({
  selector: 'app-anon-signup-error',
  templateUrl: './anon-signup-error.component.html',
  styleUrls: ['./anon-signup-error.component.css']
})
export class AnonSignupErrorComponent implements OnInit {

  email: string;
  anonSignupDisabled: boolean;
  loginType: string;
  username: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    this.email = profile.email;
    this.username = profile.nickname;
    this.loginType = this.auth.getLoginType(profile.user_id);
    this.getUser();
  }

  getUser() {
    this.auth.getAirshipUser()
      .subscribe(
        res => {

        }, err => {
          this.anonSignupDisabled = err['status'] === 401;
        }
      );
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

}
