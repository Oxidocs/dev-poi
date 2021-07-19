var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { CircuitosPage } from '../pages/circuitos/circuitos';
import { MapaPage } from '../pages/mapa/mapa';
import { DashPage } from '../pages/dash/dash';
import { ModalMapaPage } from '../pages/modal-mapa/modal-mapa';
import { IntroPage } from '../pages/intro/intro';
import { RegistroPage } from '../pages/registro/registro';
import { Usuario } from '../providers/usuario';
import { Api } from '../providers/api';
import { UserStorage } from '../providers/userstorage';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            LoginPage,
            MainPage,
            CircuitosPage,
            MapaPage,
            DashPage,
            ModalMapaPage,
            IntroPage,
            RegistroPage
        ],
        imports: [
            IonicModule.forRoot(MyApp)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            LoginPage,
            MainPage,
            CircuitosPage,
            MapaPage,
            DashPage,
            ModalMapaPage,
            IntroPage,
            RegistroPage
        ],
        providers: [
            Usuario,
            UserStorage,
            Api,
            Storage,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map