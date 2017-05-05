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
import { NavController, NavParams, ViewController } from 'ionic-angular';
/*
  Generated class for the ModalMapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ModalMapaPage = (function () {
    function ModalMapaPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.slides = [
            {
                title: "Welcome to the Docs!",
                description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
                image: "assets/img/astronomico.jpg",
            },
            {
                title: "What is Ionic?",
                description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
                image: "assets/img/astronomico.jpg",
            },
            {
                title: "What is Ionic Cloud?",
                description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
                image: "assets/img/astronomico.jpg",
            }
        ];
        var perfil = [
            {
                nombre: navParams.get('nombre'),
                comentario: navParams.get('comentario'),
                portadas: navParams.get('portadas')
            }
        ];
        console.log('Nombre', navParams.get('nombre'));
        this.datos = perfil[0];
    }
    ModalMapaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalMapaPage');
    };
    ModalMapaPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ModalMapaPage;
}());
ModalMapaPage = __decorate([
    Component({
        selector: 'page-modal-mapa',
        templateUrl: 'modal-mapa.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController])
], ModalMapaPage);
export { ModalMapaPage };
//# sourceMappingURL=modal-mapa.js.map