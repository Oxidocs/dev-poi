import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalMapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-mapa',
  templateUrl: 'modal-mapa.html'
})
export class ModalMapaPage {
	datos;
	slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/astronomico.jpg",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/astronomico.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/astronomico.jpg",
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	var perfil = [
      {
        nombre: navParams.get('nombre'),
        comentario: navParams.get('comentario'),
        portadas: navParams.get('portadas')
      }];
  	console.log('Nombre', navParams.get('nombre'));
  	this.datos = perfil[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMapaPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
