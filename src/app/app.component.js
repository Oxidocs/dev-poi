var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage, Facebook } from 'ionic-native';
import { MainPage } from '../pages/main/main';
import { DashPage } from '../pages/dash/dash';
import { IntroPage } from '../pages/intro/intro';
import { UserStorage } from '../providers/userstorage';
import { Api } from '../providers/api';
var MyApp = (function () {
    function MyApp(platform, events, user_storage, api) {
        var _this = this;
        this.platform = platform;
        this.events = events;
        this.user_storage = user_storage;
        this.api = api;
        this.userReady = false;
        this.FB_APP_ID = 1224370287616350;
        this.token_global = "a5440e8167f0212acbcfcdac0d7965339b84568e";
        this.initializeApp();
        events.subscribe('user:login', function () {
            _this.doFbLogin();
        });
        events.subscribe('user:check', function () {
            _this.checkLogin();
        });
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Rutas', component: MainPage },
            { title: 'Menu', component: DashPage },
            { title: 'Intro', component: IntroPage }
        ];
        Facebook.browserInit(this.FB_APP_ID, "v2.8");
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.validaSesion();
            StatusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.validaSesion = function () {
        var _this = this;
        this.user_storage.getToken().then(function (token) {
            _this.token = token;
            if (token != "" && token != null) {
                _this.userReady = true;
                _this.nav.setRoot(MainPage);
                Splashscreen.hide();
            }
        });
        // let env = this;
        // NativeStorage.getItem('user')
        // .then( (data)=> {
        //   // user is previously logged and we have his data
        //   // we will let him access the app
        //   env.user = {
        //     name: data.name,
        //     first_name: data.first_name,
        //     last_name: data.last_name,
        //     email: data.email,
        //     gender: data.gender,
        //     age_range_min: data.age_range_min,
        //     link: data.link,
        //     locale: data.locale,
        //     timezone: data.timezone,
        //     updated_time: data.updated_time,
        //     picture: data.picture,
        //     verified: data.verified
        //   };
        //   this.user_storage.setImageFacebook(data.picture);
        //   env.userReady = true;
        //   env.nav.setRoot(MainPage);
        //   Splashscreen.hide();
        // }, (error)=> {
        //   //we don't have the user data so we will ask him to log in
        //   env.nav.setRoot(IntroPage);
        //   Splashscreen.hide();
        // });
    };
    // funcion para cerrar sesion de facebook
    MyApp.prototype.doFbLogout = function () {
        var env = this;
        Facebook.logout()
            .then(function (response) {
            //user logged out so we will remove him from the NativeStorage
            NativeStorage.remove('user');
            env.userReady = false;
            env.nav.setRoot(IntroPage);
            Splashscreen.hide();
        }, function (error) {
            env.userReady = false;
            env.nav.setRoot(IntroPage);
            console.log(error);
        });
    };
    // funcion para iniciar sesion de facebook
    MyApp.prototype.doFbLogin = function () {
        var _this = this;
        var permissions = new Array();
        var env = this;
        //the permissions your facebook app needs from the user
        permissions = ["public_profile", "email"];
        Facebook.login(permissions)
            .then(function (response) {
            var userId = response.authResponse.userID;
            var token = response.authResponse.accessToken;
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                //Getting name and gender properties
                Facebook.api("/me?fields=name,gender,first_name,last_name,email,age_range,link,locale,timezone,updated_time,verified", permissions)
                    .then(function (user) {
                    user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                    // this.user_storage.setImageFacebook(user.picture);        
                    _this.api.registrarUsuario(_this.token_global, user.email, user.email, 'password', user.first_name, user.last_name).subscribe(function (data) {
                        _this.user_storage.setToken(data['token']);
                        _this.user_storage.setUsername(user.email);
                        _this.user_storage.setEmail(user.email);
                        _this.user_storage.setFirstName(user.first_name);
                        _this.user_storage.setLastName(user.last_name);
                        //now we have the users info, let's save it in the NativeStorage
                        // NativeStorage.setItem('user',
                        // {
                        //   name: user.name,
                        //   first_name: user.first_name,
                        //   last_name: user.last_name,
                        //   email: user.email,
                        //   gender: user.gender,
                        //   age_range_min: user.age_range.min,
                        //   link: user.link,
                        //   locale: user.locale,
                        //   timezone: user.timezone,
                        //   updated_time: user.updated_time,
                        //   picture: user.picture,
                        //   verified: user.verified
                        // })
                        // .then(()=>{
                        // this.user_storage.setImageFacebook(user.picture);
                        // this.api.registrarUsuario(this.token_global, user.email, user.email, 'password', user.first_name, user.last_name).subscribe((data)=>{
                        //   this.user_storage.setToken(data['token']);
                        //   this.user_storage.setUsername(user.email);
                        //   this.user_storage.setEmail(user.email);
                        //   this.user_storage.setFirstName(user.first_name);
                        //   this.user_storage.setLastName(user.last_name);
                        // },(error)=>{
                        //   alert(error);
                        // });
                        env.userReady = true;
                        env.nav.setRoot(MainPage);
                    }, function (error) {
                        console.log(error);
                    });
                });
            }
            else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                alert("The person is logged into Facebook, but not your app.");
            }
            else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                alert("The person is not logged into Facebook");
            }
        }, function (error) {
            alert("error de facebook");
        });
    };
    // funcion para checkear el estado de la sesion de Facebook
    MyApp.prototype.checkLogin = function () {
        Facebook.getLoginStatus()
            .then(function (response) {
            alert(JSON.stringify(response.status));
        }, function (error) {
            alert("error al checkear la sesión de facebook");
        });
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, Events, UserStorage, Api])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map