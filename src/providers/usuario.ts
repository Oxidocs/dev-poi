import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UsuarioModel } from '../models/usuario';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Usuario provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Usuario {
url = "http://poitour.com";
//192.168.8.102:8000/api/api-token-auth/
  constructor(public http: Http) {
    console.log('Hello Usuario Provider');
  }

login(user,password): Observable<UsuarioModel[]>{
  var json = JSON.stringify({ username: user, password:password});
  var params = json;
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  console.log(this.url);
  return this.http.post(`${this.url}/api/api-token-auth/`,
  params, {
  headers: headers
  })
  .map(res => <UsuarioModel[]>res.json());
}

}
