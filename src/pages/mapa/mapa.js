var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Geolocation } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import ol from 'openlayers';
import { ModalMapaPage } from '../modal-mapa/modal-mapa';
/*
  Generated class for the Mapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MapaPage = (function () {
    function MapaPage(navCtrl, navParams, menuPrincipal, events, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuPrincipal = menuPrincipal;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.lat = -29.90453;
        this.long = -71.24894;
    }
    MapaPage.prototype.openModal = function (props) {
        console.log(props);
        var modal = this.modalCtrl.create(ModalMapaPage, { tipo: props.tipo, pais: props.pais, nombre: props.nombre, comentario: props.comentario, popup: props.popup, icono: props.icono, portadas: props.portadas });
        modal.present();
    };
    MapaPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.menuPrincipal.enable(false);
        Geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.long = resp.coords.longitude;
            _this.centerMap();
            _this.drawCircleInMeter(_this.map, resp.coords.accuracy, _this.long, _this.lat);
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var watch = Geolocation.watchPosition({ maximumAge: 3000, enableHighAccuracy: true });
        watch.subscribe(function (data) {
            _this.lat = data.coords.latitude;
            _this.long = data.coords.longitude;
            //this.centerMap();
            //this.map.removeLayer(this.iconVectorLayer); //setea el icono de geolocate
            _this.drawCircleInMeter(_this.map, data.coords.accuracy, _this.long, _this.lat);
        });
        console.log("entre");
        this.map.on('click', (function (evt) {
            console.log(evt);
            var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature;
            });
            if (feature) {
                var props = feature.getProperties();
                console.log(props.features[0].I.nombre);
                _this.openModal(props.features[0].I);
            }
        }));
        this.marcadores(this.map);
        // this.map.on('click', function(evt) {
        //   console.log(evt);
        //   var feature = evt.map.forEachFeatureAtPixel(evt.pixel,
        //   function(feature) {
        //     return feature;
        //   });
        //   if (feature) {
        //     var props = feature.getProperties();
        //     console.log(props.features[0].I.nombre);
        //     this.events.publish('mapa:modal');
        //     // popup.setPosition(coordinates);
        //     // $(element).popover({
        //     // 'placement': 'top',
        //     // 'html': true,
        //     // 'content': feature.get('name')
        //     // });
        //     // $(element).popover('show');
        //     // } else {
        //     // $(element).popover('destroy');
        //   }
        //   console.log('click');
        // });
        // this.map.on("click", (e)=> {
        //   e.map.forEachFeatureAtPixel(e.pixel, function (feature) {
        //     let id: any=feature.getProperties().features[0].I.nombre;
        //     console.log(id);
        //   })
        // });
        this.map.on('pointermove', function (e) {
            if (e.dragging) {
                console.log('moviendo mapa');
                return;
            }
        });
        // change mouse cursor when over marker
        // this.map.on('pointermove', function(e) {
        //   if (e.dragging) {
        //   console.log("moviendo cursor");
        //   return;
        //   }
        //   var pixel = this.map.getEventPixel(e.originalEvent);
        //   var hit = this.map.hasFeatureAtPixel(pixel);
        //   this.map.getTarget().style.cursor = hit ? 'pointer' : '';
        // });
    };
    MapaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.menuPrincipal.enable(false);
        Geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.long = resp.coords.longitude;
            _this.centerMap();
            _this.drawCircleInMeter(_this.map, resp.coords.accuracy, _this.long, _this.lat);
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var watch = Geolocation.watchPosition({ enableHighAccuracy: true });
        watch.subscribe(function (data) {
            _this.lat = data.coords.latitude;
            _this.long = data.coords.longitude;
            //this.centerMap();
            //this.map.removeLayer(this.iconVectorLayer); //setea el icono de geolocate
            _this.drawCircleInMeter(_this.map, data.coords.accuracy, _this.long, _this.lat);
        });
        var osm_layer = new ol.layer.Tile({
            preload: Infinity,
            source: new ol.source.OSM()
        });
        this.pos = ol.proj.transform([this.long, this.lat], 'EPSG:4326', 'EPSG:3857');
        this.map = new ol.Map({
            target: "map",
            layers: [osm_layer],
            view: new ol.View({
                center: this.pos,
                zoom: 8
            })
        });
        this.marcadores(this.map);
    };
    MapaPage.prototype.centerMap = function () {
        var pos = ol.proj.transform([this.long, this.lat], 'EPSG:4326', 'EPSG:3857');
        this.map.getView().setCenter(pos);
        //map.getView().setZoom(5);
    };
    MapaPage.prototype.zoomMap = function () {
        var pos = ol.proj.transform([this.long, this.lat], 'EPSG:4326', 'EPSG:3857');
        this.map.getView().setCenter(pos);
        this.map.getView().setZoom(15);
    };
    MapaPage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menuPrincipal.enable(true);
    };
    MapaPage.prototype.drawCircleInMeter = function (map, radius, long, lat) {
        map.removeLayer(this.vectorLayer);
        var view = map.getView();
        var projection_2 = view.getProjection();
        var resolutionAtEquator = view.getResolution();
        var center = ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857');
        var pointResolution = projection_2.j(resolutionAtEquator, center);
        var resolutionFactor = resolutionAtEquator / pointResolution;
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
    };
    MapaPage.prototype.ubicacionActual = function () {
        var view = this.map.getView();
        var coordenadas = ol.proj.transform([this.long, this.lat], 'EPSG:4326', 'EPSG:3857');
        view.animate({
            center: coordenadas,
            duration: 1300
        });
    };
    MapaPage.prototype.marcadores = function (map) {
        var source = new ol.source.Vector({
            url: 'assets/data/circuito_mistral.json',
            format: new ol.format.GeoJSON()
        });
        var clusterSource = new ol.source.Cluster({
            distance: parseInt("40", 10),
            source: source
        });
        var styleCache = {};
        var vector = new ol.layer.Vector({
            source: clusterSource,
            style: function (feature) {
                var size = feature.get('features').length;
                var style = styleCache[size];
                if (!style) {
                    style = new ol.style.Style({
                        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                            anchor: [0.5, 50],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            src: 'assets/icon/pin2.png'
                        })),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: 'rgba(23, 14, 14, 0.80)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#fff',
                                width: 3
                            }),
                            offsetY: 8,
                            scale: 1.9
                        })
                    });
                    styleCache[size] = style;
                }
                return style;
            }
        });
        // var cerroMayu = new ol.Feature({
        // geometry: new ol.geom.Point(ol.proj.transform([-71.0263657,-30.014217], 'EPSG:4326', 'EPSG:3857')),
        // name: 'Observatorio Cerro Mayu',
        // population: 4000,
        // rainfall: 500
        // });
        this.map.addLayer(vector);
    };
    return MapaPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", Object)
], MapaPage.prototype, "map", void 0);
MapaPage = __decorate([
    Component({
        selector: 'page-mapa',
        templateUrl: 'mapa.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, MenuController, Events, ModalController])
], MapaPage);
export { MapaPage };
//# sourceMappingURL=mapa.js.map