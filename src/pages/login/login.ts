import { Component } from '@angular/core';
import { NavController, NavParams, MenuController} from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuPrincipal:MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuPrincipal.enable(false);
  }

}
