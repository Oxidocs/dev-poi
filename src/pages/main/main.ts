import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { CircuitosPage } from '../circuitos/circuitos'


/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  user: any;
  userReady: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

  toCircuitos(titulo){
    this.navCtrl.push(CircuitosPage, {titulo: titulo});
  }

}
