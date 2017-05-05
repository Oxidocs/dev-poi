import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { Api } from '../../providers/api';
import { UserStorage } from '../../providers/userstorage';


/*
  Generated class for the Circuitos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-circuitos',
  templateUrl: 'circuitos.html'
})
export class CircuitosPage {

	titulo: string;
  token: string;
  id_circuitos: number;
  circuitos=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private user_storage: UserStorage) {
    
    this.id_circuitos = this.navParams.get('id');
    this.titulo = 'Circuito '+this.navParams.get('titulo');

    this.user_storage.getToken().then((token)=>{
      this.token = token;
      this.api.getCircuitos(token, this.id_circuitos).subscribe((data)=>{
        this.circuitos = data['results'];
        console.log(this.circuitos);
      });
    },(error)=>{console.log(error)});
  }

  ionViewDidLoad() {}

  toMapa(){
  	this.navCtrl.push(MapaPage);
  }

}
