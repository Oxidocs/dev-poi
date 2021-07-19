var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../providers/usuario';
import { MainPage } from '../main/main';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, menuPrincipal, usuario, builder, alerCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuPrincipal = menuPrincipal;
        this.usuario = usuario;
        this.builder = builder;
        this.alerCtrl = alerCtrl;
        this.events = events;
        this.form = builder.group({
            'user': ['admin', Validators.compose([Validators.required])],
            'password': ['admin123', Validators.compose([Validators.required])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.menuPrincipal.enable(false);
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        this.menuPrincipal.enable(true);
    };
    LoginPage.prototype.login = function (form) {
        var _this = this;
        this.user = form.user;
        this.password = form.password;
        this.usuario.login(this.user, this.password).subscribe(function (data) {
            console.log(data);
            setTimeout(function () {
                _this.navCtrl.setRoot(MainPage);
            }, 300);
        }, function (error) {
            _this.doAlert();
        }, function () {
        });
    };
    LoginPage.prototype.omitirLogin = function (form) {
        var _this = this;
        this.user = "test";
        this.password = "test";
        setTimeout(function () {
            _this.navCtrl.setRoot(MainPage);
        }, 300);
    };
    LoginPage.prototype.doAlert = function () {
        var alert = this.alerCtrl.create({
            title: 'Credencial incorrecta',
            message: 'La credencial es incorrecta, por favor vuelve a intentarlo',
            buttons: ['Ok']
        });
        alert.present();
    };
    LoginPage.prototype.logIn = function () {
        this.events.publish('user:login');
    };
    LoginPage.prototype.checkLogIn = function () {
        this.events.publish('user:check');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, MenuController, Usuario, FormBuilder, AlertController, Events])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map