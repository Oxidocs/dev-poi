import { Component } from '@angular/core';
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

  user: string;
  password: string;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuPrincipal:MenuController, private usuario:Usuario, private builder: FormBuilder, public alerCtrl: AlertController, public events: Events) {
    this.form = builder.group({
      'user': ['admin', Validators.compose([Validators.required])],
      'password': ['admin123', Validators.compose([Validators.required])]
    })

  }

  ionViewDidLoad() {
    this.menuPrincipal.enable(false);
  }
  ionViewDidLeave() {
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
  omitirLogin(form){
    this.user = "test";
    this.password = "test";
    setTimeout(() => {
         this.navCtrl.setRoot(MainPage);
       }, 300);
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
  checkLogIn() {
  this.events.publish('user:check');
  }

}
