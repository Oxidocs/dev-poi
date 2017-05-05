import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../providers/usuario';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

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

