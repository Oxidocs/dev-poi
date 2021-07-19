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
var Api = (function () {
    function Api(http) {
        this.http = http;
        this.url = 'http://192.168.0.33:8000/api';
    }
    Api.prototype.registrarUsuario = function (token, username, email, password, first_name, last_name) {
        var variables = 'username=' + username + '&password=' + password + '&email=' + email + '&first_name=' + first_name + '&last_name=' + last_name;
        var params = variables;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Token ' + token);
        return this.http.post(this.url + "/usuarios/registrar", params, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    return Api;
}());
Api = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], Api);
export { Api };
//# sourceMappingURL=api.js.map