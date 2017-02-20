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
	iconVectorLayer: any;
	iconFeature: any;
	vectorLayer: any;

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

	let watch = Geolocation.watchPosition({ enableHighAccuracy: true });
	watch.subscribe((data) => {

		this.lat = data.coords.latitude;
		this.long = data.coords.longitude;
		this.centerMap();
		this.map.removeLayer(this.iconVectorLayer); //setea el icono de geolocate

		this.drawCircleInMeter(this.map,data.coords.accuracy,this.long,this.lat);

		this.iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([this.lat, this.long], 'EPSG:4326', 'EPSG:3857')),
			name: 'My Position',
			population: 4000,
			rainfall: 500,
		});

		var vectorSource = new ol.source.Vector({
			features: [this.iconFeature]
		});
 
	    this.iconVectorLayer = new ol.layer.Vector({
			source: vectorSource,
			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				}),
				stroke: new ol.style.Stroke({
					color: '#ffcc33',
					width: 2
				}),
				image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
					anchor: [0.5, 10],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 1,
					src: 'img/geolocation_marker.png'
				}))
			})
		});
 
    	this.map.addLayer(this.iconVectorLayer);
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

  drawCircleInMeter (map, radius, long, lat) {
     
        map.removeLayer(this.vectorLayer);
        var view = map.getView();
        var projection_2 = view.getProjection();
        var resolutionAtEquator = view.getResolution();
        var center = ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857');
        var pointResolution = projection_2.j(resolutionAtEquator, center);
        var resolutionFactor = resolutionAtEquator/pointResolution;
        var radio = (radius / ol.proj.METERS_PER_UNIT['m']) * resolutionFactor;
 
        var circle = new ol.geom.Circle(center, radio);
        var circleFeature = new ol.Feature(circle);
 		//console.log(new ol.source.Vector());
        // Source and vector layer
        var vectorSource = new ol.source.Vector({
        	// defaultDataProjection: 'EPSG:4326'
            //projection: 'EPSG:4326'
        });

        // var vectorSource = new ol.source.Vector();
        console.log(vectorSource.getProjection());
        vectorSource.addFeature(circleFeature);
        this.vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        this.map.addLayer(this.vectorLayer);
	}

}
