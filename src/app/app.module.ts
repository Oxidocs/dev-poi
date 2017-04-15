import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { Usuario } from '../providers/usuario';
import { MainPage } from '../pages/main/main';
import { CircuitosPage } from '../pages/circuitos/circuitos';
import { MapaPage } from '../pages/mapa/mapa';
import { DashPage } from '../pages/dash/dash';
import { ModalMapaPage } from '../pages/modal-mapa/modal-mapa';
import { IntroPage } from '../pages/intro/intro';



@NgModule({

  declarations: [
    MyApp,
    LoginPage,
    MainPage,
    CircuitosPage,
    MapaPage,
    DashPage,
    ModalMapaPage,
    IntroPage
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
    IntroPage
  ],
  providers: [
    Usuario,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
