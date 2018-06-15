import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../_models/user.model';

@Injectable()
export class AuthService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private url = environment.accountApiUrl;
  public loggedIn = false;
  public privateKey: string;
  public publicKey: string;
  public crt: string;
  public token: string;
  public user: User;

  constructor(private http: HttpClient) {

  }

  public login(username: string, password: string) {
    return this.http.post(
      this.url + '/login',
      {'username' : username, 'password': password},
      {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        this.setSession(
          response.token,
          response.crt.cert,
          response.crt.private,
          response.crt.public,
          response.user.username,
          response.user.slogan,
          response.user.email
        );
        this.loggedIn = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    delete this.privateKey;
    delete this.publicKey;
    delete this.crt;
    delete this.token;
  }

  setSession(token, certificate, privateKey, publicKey, username, slogan, email) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.token = token;
    this.crt = certificate;

    console.log(this.privateKey);
    console.log(this.crt);

    this.user = new User(username, slogan, email);
  }

  isAuthenticated() {
    if (this.token) {
      return this.loggedIn;
    } else {
      return false;
    }
  }
}
