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
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Usuario provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Usuario = (function () {
    //192.168.8.102:8000/api/api-token-auth/
    function Usuario(http) {
        this.http = http;
        this.url = "http://poitour.com";
        console.log('Hello Usuario Provider');
    }
    Usuario.prototype.login = function (user, password) {
        var json = JSON.stringify({ username: user, password: password });
        var params = json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(this.url);
        return this.http.post(this.url + "/api/api-token-auth/", params, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    return Usuario;
}());
Usuario = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], Usuario);
export { Usuario };
//# sourceMappingURL=usuario.js.map