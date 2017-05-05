var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Userstorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var UserStorage = (function () {
    function UserStorage(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    UserStorage.prototype.getImageFacebook = function () {
        return this.image_facebook;
    };
    UserStorage.prototype.setImageFacebook = function (image_facebook) {
        this.image_facebook = image_facebook;
    };
    UserStorage.prototype.getToken = function () {
        return this.storage.get('token').then(function (value) {
            return value;
        });
    };
    ;
    UserStorage.prototype.setToken = function (username) {
        this.storage.set('username', username);
    };
    UserStorage.prototype.getUsername = function () {
        return this.storage.get('username').then(function (value) {
            return value;
        });
    };
    ;
    UserStorage.prototype.setUsername = function (username) {
        this.storage.set('username', username);
    };
    UserStorage.prototype.getEmail = function () {
        return this.storage.get('email').then(function (value) {
            return value;
        });
    };
    ;
    UserStorage.prototype.setEmail = function (email) {
        this.storage.set('email', email);
    };
    UserStorage.prototype.getFirstName = function () {
        return this.storage.get('first_name').then(function (value) {
            return value;
        });
    };
    ;
    UserStorage.prototype.setFirstName = function (first_name) {
        this.storage.set('first_name', first_name);
    };
    UserStorage.prototype.getLastName = function () {
        return this.storage.get('last_name').then(function (value) {
            return value;
        });
    };
    ;
    UserStorage.prototype.setLastName = function (last_name) {
        this.storage.set('last_name', last_name);
    };
    UserStorage.prototype.getImage = function () {
        return this.storage.get('imagen').then(function (value) {
            return value;
        });
    };
    ;
    UserStorage.prototype.setImage = function (imagen) {
        this.storage.set('imagen', imagen);
    };
    return UserStorage;
}());
UserStorage = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], UserStorage);
export { UserStorage };
//# sourceMappingURL=userstorage.js.map