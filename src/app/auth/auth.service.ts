import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { RequestOptions, Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';

import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  status;
  private observer: Observer<boolean>;
  private options = {
    closable: true,
    initialScreen: 'login',
    allowedConnections: ['Username-Password-Authentication'],
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

  constructor(private http: Http) {
    this.status = new Observable(observer =>
      this.observer = observer
    ).share();

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(localStorage.getItem('id_token'), (error, profile) => {
        if (error) {
          console.log('no user profile');
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

  public login() {
    this.options.initialScreen = 'login';
    this.lock = new Auth0Lock(environment.auth0ClientID, environment.auth0Domain, this.options);
    this.changeState(false);
    this.lock.show();
  };

  public signUp() {
    this.options.initialScreen = 'signUp';
    this.lock = new Auth0Lock(environment.auth0ClientID, environment.auth0Domain, this.options);
    this.changeState(false);
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  };

  public logout() {
    // Remove token from localStorage
    localStorage.clear();
  };

  public getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  getAirshipUser() {
    let headers = new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    });
    let options = new RequestOptions({ headers });
    return this.http.get(environment.domain + '/api/account/profile', options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAccessToken(code: string) {
    let headers = new Headers({
      'Content-type': 'application/json'
    });
    let options = new RequestOptions({ headers });
    let body = {
      'client_id': environment.auth0ClientID,
      'redirect_uri': environment.domain + '/api/auth0/',
      'client_secret': environment.auth0Secret,
      'grant_type': 'authorization_code',
      code
    }
    return this.http.post('https://' + environment.auth0Domain + '/oauth/token', body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAccount() {
    let headers = new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    });
    let options = new RequestOptions({ headers });
    return this.http.get(environment.domain + '/api/account', options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getToken() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers });
    let url = 'https://' + environment.auth0Domain + '/oauth/token';
    let body = {
      "grant_type":"client_credentials",
      "client_id": environment.auth0ApiClientID,
      "client_secret": environment.auth0ApiSecret,
      "audience": "https://" + environment.auth0Domain + "/api/v2/"
    };

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public resendVerification(token) {
    let headers = new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers });
    let body = { 
      user_id: JSON.parse(localStorage.getItem('profile')).user_id,

    };
    let url = 'https://' + environment.auth0Domain + '/api/v2/jobs/verification-email';

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }

}
