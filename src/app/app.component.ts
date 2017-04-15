import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage, Facebook } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { DashPage } from '../pages/dash/dash';
import { IntroPage } from '../pages/intro/intro';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  user: any;
  userReady: boolean = false;
  FB_APP_ID: number = 1224370287616350;

  constructor(public platform: Platform, public events: Events) {
    this.initializeApp();
    events.subscribe('user:login', () => {
      this.doFbLogin();
    });
    events.subscribe('user:check', () => {
      this.checkLogin();
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Rutas', component: MainPage },
      { title: 'Menu', component: DashPage }
    ];
    Facebook.browserInit(this.FB_APP_ID, "v2.8");

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.validaSesion();
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  validaSesion(){
    let env = this;
    NativeStorage.getItem('user')
    .then( function (data) {
      // user is previously logged and we have his data
      // we will let him access the app
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
      env.userReady = true;
      env.nav.setRoot(MainPage);
      Splashscreen.hide();
    }, function (error) {
      //we don't have the user data so we will ask him to log in
      env.nav.setRoot(LoginPage);
      Splashscreen.hide();
    });
  }
  // funcion para cerrar sesion de facebook
  doFbLogout(){
    let env = this;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      env.userReady = false;
      env.nav.setRoot(LoginPage);
      Splashscreen.hide();
    }, function(error){
      env.userReady = false;
      env.nav.setRoot(LoginPage);
      console.log(error);
    });

  }
  // funcion para iniciar sesion de facebook
  doFbLogin(){
    let permissions = new Array();
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile","email"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;

      if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", permissions)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          env.user = {
            name: user.name,
            gender: user.gender,
            picture: user.picture
          };
          env.userReady = true;
          env.nav.setRoot(MainPage);
        }, function (error) {
          console.log(error);
        })
      });
      } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      alert("The person is logged into Facebook, but not your app.");
      } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      alert("The person is not logged into Facebook");
      }

    }, function(error){
      alert("error de facebook");
    });
  }
  // funcion para checkear el estado de la sesion de Facebook
  checkLogin(){

    Facebook.getLoginStatus()
    .then(function(response) {

      alert(JSON.stringify(response.status));

    }, function(error){

      alert("error al checkear la sesión de facebook");
    });

  }

}
