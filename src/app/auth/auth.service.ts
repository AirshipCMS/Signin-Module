import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { RequestOptions, Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';

// import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthService {
  status: Observable<boolean>;
  user;
  id_token : string = localStorage.getItem('id_token');
  access_token : string = localStorage.getItem('access_token');
  private observer: Observer<boolean>;
  private options = {
    clientID: environment.auth0ClientID,
    domain: environment.auth0Domain,
    responseType: 'token id_token',
    redirectUri: environment.auth0RedurectUri,
    scope: 'openid profile email',
  };
  auth0Login = new auth0.WebAuth(this.options);

  constructor(private http: Http) {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.status = new Observable(observer =>
      this.observer = observer
    ).share();
  }

  changeState(newState: boolean) {
    if (this.observer !== undefined) {
      this.observer.next(newState);
    }
  }

  public login() {
    this.changeState(false);
    localStorage.clear();
    this.auth0Login.authorize();
  };

  public signUp() {
    this.changeState(false);
    localStorage.clear();
    this.auth0Login.authorize({ mode: 'signUp' });
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

  handleAuthentication() {
    return this.auth0Login.parseHash((err, authResult) => {
      if (err) {
        console.error(err);
        window.history.pushState(
          '',
          '',
          '/' +
            window.location.href
              .substring(window.location.href.lastIndexOf('/') + 1)
              .split('#')[0]
        );
        return err;
      }

      window.location.hash = '';
      window.history.pushState(
        '',
        '',
        '/' +
          window.location.href
            .substring(window.location.href.lastIndexOf('/') + 1)
            .split('#')[0]
      );
      this.setSession(authResult);
      this.getProfile(null);
      return authResult;
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    this.id_token = authResult.idToken;
    localStorage.setItem('expires_at', expiresAt);
  }

  public getProfile(callback) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      return profile;
    }
    return this.auth0Login.client.userInfo(
      localStorage.getItem('access_token'),
      (err, profile) => {
        if (err) {
          console.error('no user profile');
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        this.changeState(true);
        return callback ? callback(err, profile) : null;
      }
    );
  }

  getAirshipUser() {
    let headers = new Headers({
      'Authorization': `Bearer ${this.id_token}`
    });
    let options = new RequestOptions({ headers });
    return this.http.get(`${environment.domain}/api/account/profile`, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAccount() {
    let headers = new Headers({
      'Authorization': `Bearer ${this.id_token}`
    });
    let options = new RequestOptions({ headers });
    return this.http.get(`${environment.domain}/api/account`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getToken() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers });
    let url = `https://${environment.auth0Domain}/oauth/token`;
    let body = {
      'grant_type': 'client_credentials',
      'client_id': environment.auth0ApiClientID,
      'client_secret': environment.auth0ApiSecret,
      'audience': `https://${environment.auth0Domain}/api/v2/`
    };

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public resendVerification(token) {
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers });
    let body = { 
      user_id: JSON.parse(localStorage.getItem('profile')).user_id,

    };
    let url = `https://${environment.auth0Domain}/api/v2/jobs/verification-email`;

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }

}
