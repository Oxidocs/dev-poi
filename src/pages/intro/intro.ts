import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { MainPage } from '../main/main';
import { Api } from '../../providers/api';




@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  user: string;
  password: string;

  constructor(private api: Api, public navCtrl: NavController, public navParams: NavParams, public menuPrincipal:MenuController, private events: Events) {}

  ionViewDidLoad() {
    this.menuPrincipal.enable(false);
  }
  ionViewDidLeave() {
    this.menuPrincipal.enable(true);
  }
  logIn() {
    this.events.publish('user:login');
  }

  omitirLogin(){
    this.user = "test";
    this.password = "test";
    setTimeout(() => {
         this.navCtrl.setRoot(MainPage);
       }, 300);
  }

  test(){
    this.api.registrarUsuario('a322992a84de6143817daf10f5897f5c6ded5d43', 'fabian2', 'fabian2@asd.cl', 'password', 'first_name', 'last_name').subscribe((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    })
  }

  goToRegistro(){
    // this.navCtrl.push(RegistroPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
