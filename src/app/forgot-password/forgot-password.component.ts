import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean;
  emailInvalid: boolean;
  forgot_password: FormGroup;
  submitting: boolean;

  constructor(private auth:AuthService, private builder:FormBuilder) {
    this.forgot_password = this.builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.emailInvalid = !this.forgot_password.valid;
    if(!this.emailInvalid) {
      this.submitting = true;
      this.auth.getToken()
        .subscribe(
          res => {
            this.auth.requestPasswordReset(res['access_token'], this.forgot_password.value.email)
              .subscribe(
                res => {
                  this.submitted = true;
                  this.submitting = false;
                },
                err => {
                  if(err.status === 200) {
                    this.submitted = true;
                  } else {
                    console.error(err);
                  }
                  this.submitting = false;
                }
              );
          }, err => {
            console.error(err);
            this.submitting = false;
          }
        );
    }
  }

}
