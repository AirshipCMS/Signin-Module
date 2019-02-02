import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../auth';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../app.component.css', './forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  @Input() email:string = '';
  private processing:boolean;
  private requested:boolean;
  private error:boolean;

  constructor(public auth: AuthService, private router: Router, private builder: FormBuilder) {
    this.form = this.builder.group({ email: '' });
  }

  ngOnInit(){}

  resetPassword() {
    this.processing = true;
    this.error = false;
    this.auth.requestChangePassword(this.email)
      .then(res => {
        this.processing = false;
        this.requested = true;
      }).catch(err => {
        this.processing = false;
        this.error = true;
      })
      
  }


}
