import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

declare var window;

@Injectable()
export class AuthService {
  status;
  user;
  id_token : string = localStorage.getItem('id_token');
  loginTypes : Array<any>;
  private observer: Observer<boolean>;
  private options = {
    closable: true,
    initialScreen: 'login',
    allowLogin: true,
    allowForgotPassword: false,
    allowSignUp: false,
    allowedConnections: ['Username-Password-Authentication', 'github', 'facebook', 'google-oauth2'],
    auth: {
      redirectUrl: environment.auth0RedurectUri,
      responseType: 'code'
    },
    theme: {
      primaryColor: '#7C8390',
      logo: 'https://res.cloudinary.com/airship/image/upload/v1492152050/auth0.png'
    }
  };
  lock = new Auth0Lock(environment.auth0ClientID, environment.auth0Domain, this.options);

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loginTypes = [
      { type: 'Auth0' },
      { type: 'Facebook' },
      { type: 'GitHub' },
      { type: 'Google' }
    ]

    this.status = new Observable(observer =>
      this.observer = observer
    ).share();

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(this.id_token, (error, profile) => {
        if (error) {
          console.error('no user profile');
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        this.changeState(true);
        return;
      });
    });
  }

  changeState(newState: boolean) {
    if (this.observer !== undefined) {
      this.observer.next(newState);
    }
  }

  saveToken(token: string) {
    this.id_token = token;
    localStorage.setItem('id_token', token);
  }

  getLoginType(auth0_id: string) {
    return this.loginTypes.find((item) => item.type.toLowerCase() === auth0_id.split('|')[0]).type;
  }

  public signIn() {
    this.options.initialScreen = 'login';
    this.options.allowLogin = true;
    this.options.allowSignUp = false;
    this.lock = new Auth0Lock(environment.auth0ClientID, environment.auth0Domain, this.options);
    this.lock.show();
  };

  public signUp() {
    this.options.allowSignUp = true;
    this.options.allowLogin = false;
    this.options.initialScreen = 'signUp';
    this.lock = new Auth0Lock(environment.auth0ClientID, environment.auth0Domain, this.options);
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  };

  public signOut() {
    delete localStorage.id_token;
    delete localStorage.profile;
    delete localStorage.account;
    delete localStorage.user;
    delete localStorage.code;
    if(window.airshipToggleStatus) {
      window.airshipToggleStatus();
    }
  };

  public getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  getAirshipUser() {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.id_token}`
    });
    return this.http.get(`/api/account/profile`, { headers });
  }

  getAccessToken(code: string) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    let body = {
      'client_id': environment.auth0ClientID,
      'redirect_uri': `https://${environment.domain}/api/auth0/`,
      'client_secret': environment.auth0Secret,
      'grant_type': 'authorization_code',
      code
    }
    return this.http.post(`https://${environment.auth0Domain}/oauth/token`, body, { headers });
  }

  getAccount() {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.id_token}`
    });
    return this.http.get(`/api/account`, { headers });
  }

  getToken() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `https://${environment.auth0Domain}/oauth/token`;
    let body = {
      'grant_type': 'client_credentials',
      'client_id': environment.auth0ApiClientID,
      'client_secret': environment.auth0ApiSecret,
      'audience': `https://${environment.auth0Domain}/api/v2/`
    };

    return this.http.post(url, body, { headers });
  }

  getAuth0User(email: string, token: string) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`https://${environment.auth0Domain}/api/v2/users?q=email.raw:${encodeURIComponent(email)}`, { headers });
  }

  public resendVerification(token) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let body = { 
      user_id: JSON.parse(localStorage.getItem('profile')).user_id
    };
    let url = `https://${environment.auth0Domain}/api/v2/jobs/verification-email`;

    return this.http.post(url, body, { headers });
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }

}
