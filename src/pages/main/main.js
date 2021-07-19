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
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { CircuitosPage } from '../circuitos/circuitos';
import { UserStorage } from '../../providers/userstorage';
/*
    Generated class for the Main page.

    See http://ionicframework.com/docs/v2/components/#navigation for more info on
    Ionic pages and navigation.
*/
var MainPage = (function () {
    function MainPage(navCtrl, navParams, user_storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user_storage = user_storage;
        this.userReady = false;
        this.bool_image_facebook = false;
        this.image = this.user_storage.getImageFacebook();
        if (this.image != null && this.image != "") {
            this.bool_image_facebook = true;
            this.image_facebook = this.image;
        }
    }
    MainPage.prototype.ionViewDidLoad = function () { };
    MainPage.prototype.ionViewCanEnter = function () {
        var env = this;
        NativeStorage.getItem('user')
            .then(function (data) {
            env.user = {
                name: data.name,
                gender: data.gender,
                picture: data.picture
            };
            env.userReady = true;
        }, function (error) {
            console.log(error);
        });
    };
    MainPage.prototype.toCircuitos = function (titulo) {
        this.navCtrl.push(CircuitosPage, { titulo: titulo });
    };
    return MainPage;
}());
MainPage = __decorate([
    Component({
        selector: 'page-main',
        templateUrl: 'main.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, UserStorage])
], MainPage);
export { MainPage };
//# sourceMappingURL=main.js.map