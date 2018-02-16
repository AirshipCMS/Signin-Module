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

  user;
  processing: boolean;
  showResendVerification: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.auth.user;
    this.auth.lock.getProfile(localStorage.getItem('id_token'), (err, profile) => {
      if (err) { return console.error(err); }
      localStorage.setItem('profile', JSON.stringify(profile));
      if(profile.email_verified) {
        this.router.navigate(['/signin']);
      }
    });
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/signin']);
  }

  checkStatus() {
    this.processing = true;
    this.auth.getToken()
      .subscribe(
        res => {
          this.auth.getAuth0User(this.user.auth0_user.email, res['access_token'])
            .subscribe(
              res => {
                if(res[0].email_verified) {
                  this.router.navigate(['/signin']);
                } else {
                  this.showResendVerification = true;
                  this.processing = false;
                }
              }, err => {
                console.error(err);
                this.processing = false;
              }
            );
        }, err => {
          console.error(err);
          this.processing = false;
        }
      );
  }

  resendConfirmation() {
    this.auth.getToken()
      .subscribe(
        res => {
          this.auth.resendVerification(res['access_token'])
            .subscribe(
              res => {
                this.confirmationEmailSent = true;
                setTimeout(() =>this.confirmationEmailSent = false, 3000);
              }, err => console.error(err)
            );
        }, err => console.error(err)
      );
  }

}
