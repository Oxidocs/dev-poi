import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataLocal provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataLocal {

  constructor(public http: Http, private storage: Storage) {}

	getRutas() {
		return this.storage.get('rutas').then((value) => {
			return value;
		});
  	}

  	setRutas(rutas){
    	this.storage.set('rutas', rutas);
  	}

}
