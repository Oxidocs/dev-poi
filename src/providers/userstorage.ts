import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Userstorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserStorage {

	image_facebook: any;
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(public events: Events, public http: Http, private storage: Storage) {}

  getImageFacebook(){
  	return this.image_facebook;
  }

  setImageFacebook(image_facebook){
  	this.image_facebook = image_facebook;
  }

  getToken() {
    return this.storage.get('token').then((value) => {
      return value;
    });
  };

  setToken(token){
    this.storage.set('token', token);
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  setUsername(username){
    this.storage.set('username', username);
  }

  getEmail() {
    return this.storage.get('email').then((value) => {
      return value;
    });
  };

  setEmail(email){
    this.storage.set('email', email);
  }

  getFirstName() {
    return this.storage.get('first_name').then((value) => {
      return value;
    });
  };

  setFirstName(first_name){
    this.storage.set('first_name', first_name);
  }

  getLastName() {
    return this.storage.get('last_name').then((value) => {
      return value;
    });
  };

  setLastName(last_name){
    this.storage.set('last_name', last_name);
  }

  getImage() {
    return this.storage.get('imagen').then((value) => {
      return value;
    });
  };

  setImage(imagen){
    this.storage.set('imagen', imagen);
  }

  login(username, token, id_usuario) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setToken(token);
    this.events.publish('user:login');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('first_name');
    this.storage.remove('last_name');
    this.storage.remove('email');
    this.storage.remove('token');
    this.events.publish('user:logout');
  };

}
