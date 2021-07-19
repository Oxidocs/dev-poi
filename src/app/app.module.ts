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
import { DataLocal } from '../providers/data-local';


@NgModule({

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
    DataLocal,
    Usuario,
    UserStorage,
    Api,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
