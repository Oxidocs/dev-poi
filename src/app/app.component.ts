import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage, Facebook } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  user: any;
  userReady: boolean = false;

  constructor(public platform: Platform, public events: Events) {
    this.initializeApp();
    events.subscribe('user:login', () => {
      this.doFbLogin();
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Rutas', component: MainPage }
    ];

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
  doFbLogin(){
    let permissions = new Array();
    let nav = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
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
          nav.user = {
            name: user.name,
            gender: user.gender,
            picture: user.picture
          };
          nav.userReady = true;
          nav.nav.setRoot(MainPage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }

}
