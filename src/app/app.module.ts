import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { Usuario } from '../providers/usuario';
import { MainPage } from '../pages/main/main';
import { CircuitosPage } from '../pages/circuitos/circuitos';

@NgModule({

  declarations: [
    MyApp,
    LoginPage,
    MainPage,
    CircuitosPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainPage,
    CircuitosPage
  ],
  providers: [
    Usuario,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
