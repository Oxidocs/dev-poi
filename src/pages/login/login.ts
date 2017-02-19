import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController, NavParams, MenuController, Events} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../providers/usuario';
import { MainPage } from '../main/main';


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
  FB_APP_ID: number = 1224370287616350;
  private user2 = "admin";
  private pass = "admin123";
  user: string;
  password: string;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuPrincipal:MenuController, private usuario:Usuario, private builder: FormBuilder, public alerCtrl: AlertController, public events: Events) {
    this.form = builder.group({
      'user': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    })
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuPrincipal.enable(false);
  }
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuPrincipal.enable(true);
  }
  login(form){
    this.user = form.user;
    this.password = form.password;
    this.usuario.login(this.user, this.password).subscribe(data=>{
      console.log(data);
      setTimeout(() => {
         this.navCtrl.setRoot(MainPage);
       }, 300);
    },error => {
      this.doAlert();
    },() => {

    });
  }
  doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Credencial incorrecta',
      message: 'La credencial es incorrecta, por favor vuelve a intentarlo',
      buttons: ['Ok']
    });
    alert.present()
  }

  logIn() {
  this.events.publish('user:login');
  }

}
