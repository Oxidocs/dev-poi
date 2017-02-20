import { Geolocation } from 'ionic-native'
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import ol from 'openlayers';

/*
  Generated class for the Mapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})

export class MapaPage {

	ol: any;
	lat: any = -29.90453;
	long: any = -71.24894;

	@ViewChild('map') map;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuPrincipal:MenuController) {

  }

  ionViewDidLoad() {
  	this.menuPrincipal.enable(false);
  	Geolocation.getCurrentPosition().then((resp) => {
		this.lat = resp.coords.latitude;
		this.long = resp.coords.longitude;
		this.centerMap();
	}).catch((error) => {
	  console.log('Error getting location', error);
	});

	let watch = Geolocation.watchPosition();
	watch.subscribe((data) => {
	 // data can be a set of coordinates, or an error (if an error occurred).
	 // data.coords.latitude
	 // data.coords.longitude
	});
	var projection = ol.proj.get('EPSG:3857');
	var pos = ol.proj.transform([this.long, this.lat], 'EPSG:4326', 'EPSG:3857');
	this.map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM() 
          })
        ],
        view: new ol.View({
          center: pos,
          zoom: 13
        })
      });
  }

  centerMap(){
	var pos = ol.proj.transform([this.long, this.lat], 'EPSG:4326', 'EPSG:3857');
	this.map.getView().setCenter(pos);
	//map.getView().setZoom(5);
 
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuPrincipal.enable(true);
  }

}
