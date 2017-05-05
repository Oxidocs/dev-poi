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
import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';
var IntroPage = (function () {
    function IntroPage(navCtrl, navParams, menuPrincipal, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuPrincipal = menuPrincipal;
        this.events = events;
    }
    IntroPage.prototype.ionViewDidLoad = function () {
        this.menuPrincipal.enable(false);
    };
    IntroPage.prototype.ionViewDidLeave = function () {
        this.menuPrincipal.enable(true);
    };
    IntroPage.prototype.logIn = function () {
        this.events.publish('user:login');
    };
    IntroPage.prototype.omitirLogin = function () {
        var _this = this;
        this.user = "test";
        this.password = "test";
        setTimeout(function () {
            _this.navCtrl.setRoot(MainPage);
        }, 300);
    };
    IntroPage.prototype.goToRegistro = function () {
        // this.navCtrl.push(RegistroPage);
    };
    IntroPage.prototype.goToLogin = function () {
        this.navCtrl.push(LoginPage);
    };
    return IntroPage;
}());
IntroPage = __decorate([
    Component({
        selector: 'page-intro',
        templateUrl: 'intro.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, MenuController, Events])
], IntroPage);
export { IntroPage };
//# sourceMappingURL=intro.js.map