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
  ionViewWillEnter(){
    this.menuPrincipal.enable(false);
    Geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.centerMap();
      this.marcadores(this.map);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let watch = Geolocation.watchPosition({ enableHighAccuracy: true });
    watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      //this.centerMap();
      //this.map.removeLayer(this.iconVectorLayer); //setea el icono de geolocate
      this.drawCircleInMeter(this.map,data.coords.accuracy,this.long,this.lat);
    });
    console.log("entre");
  }
  ionViewDidLoad() {
    this.menuPrincipal.enable(false);
    Geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.centerMap();
      this.marcadores(this.map);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let watch = Geolocation.watchPosition({ enableHighAccuracy: true });
    watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      //this.centerMap();
      //this.map.removeLayer(this.iconVectorLayer); //setea el icono de geolocate
      this.drawCircleInMeter(this.map,data.coords.accuracy,this.long,this.lat);
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
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    });
    this.map.addOverlay(popup);

    // display popup on click
    this.map.on('click', function(evt) {
    // var feature = this.map.forEachFeatureAtPixel(evt.pixel,
    //     function(feature) {
    //       return feature;
    //     });
    // if (feature) {
    //   var coordinates = feature.getGeometry().getCoordinates();
    //   popup.setPosition(coordinates);
    //   $(element).popover({
    //     'placement': 'top',
    //     'html': true,
    //     'content': feature.get('name')
    //   });
    //   $(element).popover('show');
    // } else {
    //   $(element).popover('destroy');
    // }
    });

    // change mouse cursor when over marker
    this.map.on('pointermove', function(e) {
    // if (e.dragging) {
    //   $(element).popover('destroy');
    //   return;
    // }
    // var pixel = this.map.getEventPixel(e.originalEvent);
    // var hit = this.map.hasFeatureAtPixel(pixel);
    // this.map.getTarget().style.cursor = hit ? 'pointer' : '';
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
    var positionFeature = new ol.Feature();
    positionFeature.setStyle(new ol.style.Style({
      image: new ol.style.Circle({
        radius: 12,
        fill: new ol.style.Fill({
          color: '#3399CC'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 3
        })
      })
    }));
    var coordinates = center;
    positionFeature.setGeometry(coordinates ?
    new ol.geom.Point(coordinates) : null);
    //console.log(new ol.source.Vector());
    // Source and vector layer
    var vectorSource = new ol.source.Vector();
    vectorSource.addFeature(positionFeature);
    vectorSource.addFeature(circleFeature);
    this.vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    this.map.addLayer(this.vectorLayer);
  }

  ubicacionActual(){
    var view = this.map.getView();
    var coordenadas = ol.proj.transform([this.long, this.lat], 'EPSG:4326', 'EPSG:3857');
    view.animate({
          center: coordenadas,
          duration: 1300
        });
  }

  marcadores(map){
    var cerroMayu = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-71.0263657,-30.014217], 'EPSG:4326', 'EPSG:3857')),
    name: 'Observatorio Cerro Mayu',
    population: 4000,
    rainfall: 500
    });
    var centroAstronomico = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-70.7284111,-30.02687], 'EPSG:4326', 'EPSG:3857')),
    name: 'Centro Astronomico Alfa Aldea',
    population: 4000,
    rainfall: 500
    });
    var astronomicaSur = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-70.7157413,-30.033902], 'EPSG:4326', 'EPSG:3857')),
    name: 'Astronómica del Sur Ltda. - Observatorio del Pangue',
    population: 4000,
    rainfall: 500
    });
    var observatorioMamalluca = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-70.6877581,-29.9898017], 'EPSG:4326', 'EPSG:3857')),
    name: 'Observatorio Mamalluca',
    population: 4000,
    rainfall: 500
    });

    var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png'
    }))
    });
    cerroMayu.setStyle(iconStyle);
    centroAstronomico.setStyle(iconStyle);
    astronomicaSur.setStyle(iconStyle);
    observatorioMamalluca.setStyle(iconStyle);

    var vectorSource = new ol.source.Vector({
      features: [cerroMayu,centroAstronomico,astronomicaSur,observatorioMamalluca]
    });

    var vectorLayer = new ol.layer.Vector({
    source: vectorSource
    });
    this.map.addLayer(vectorLayer);

  }
}
