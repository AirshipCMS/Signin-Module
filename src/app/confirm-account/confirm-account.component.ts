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
    this.auth.lock.getProfile(localStorage.getItem('access_token'), (err, profile) => {
      if (err) { return console.error(err); }
      localStorage.setItem('profile', JSON.stringify(profile));
      if(profile.email_verified) {
        this.router.navigate(['/']);
      }
    });
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
