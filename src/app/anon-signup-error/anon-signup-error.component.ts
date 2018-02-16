import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anon-signup-error',
  templateUrl: './anon-signup-error.component.html',
  styleUrls: ['./anon-signup-error.component.css']
})
export class AnonSignupErrorComponent implements OnInit {

  email: string;
  constructor() { }

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('profile')).email;
  }

}
