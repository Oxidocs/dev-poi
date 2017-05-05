import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage, Facebook, FacebookLoginResponse } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { DashPage } from '../pages/dash/dash';
import { IntroPage } from '../pages/intro/intro';

import { UserStorage } from '../providers/userstorage';
import { Api } from '../providers/api';


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
	// token_global: string = "a5440e8167f0212acbcfcdac0d7965339b84568e";
	token_global: string = "a322992a84de6143817daf10f5897f5c6ded5d43";
	token: string;

	imagen:string;
	nombre_usuario: string;

	constructor(public platform: Platform, public events: Events, private user_storage: UserStorage, private api: Api) {
		this.initializeApp();
		events.subscribe('user:login', () => {
			this.doFbLogin();
		});
		events.subscribe('user:check', () => {
			this.checkLogin();
		});

		this.pages = [
			{ title: 'Rutas', component: MainPage },
			{ title: 'Menu', component: DashPage },
			{ title: 'Intro', component: IntroPage }
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
		this.nav.setRoot(page.component);
	}

	validaSesion(){
		this.user_storage.getToken().then((token)=>{

			this.token = token;

			if (token!="" && token!=null ) {

				this.userReady = true;
				this.user_storage.getFirstName().then((nombre)=>{
					this.user_storage.getLastName().then((apellido)=>{
						var nombre_completo = nombre+' '+apellido;
						this.user_storage.getImage().then((imagen)=>{
							this.setVariablesMenu(imagen , nombre_completo);
						});
					});
				});

				this.nav.setRoot(MainPage);
			}else{
				this.nav.setRoot(IntroPage);
			}
			Splashscreen.hide();
		});
	}

	logOut(){
		Facebook.logout()
		.then((response)=> {
			//user logged out so we will remove him from the NativeStorage
			this.user_storage.logout();
			this.userReady = false;
			this.nav.setRoot(IntroPage);
			Splashscreen.hide();
		}, (error)=>{
			this.userReady = false;
			this.nav.setRoot(IntroPage);
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
		.then((response)=>{
			let userId = response.authResponse.userID;

			if (response.status === 'connected') {

				// Logged into your app and Facebook.
				// Getting name and gender properties
				Facebook.api("/me?fields=name,gender,first_name,last_name,email,age_range,link,locale,timezone,updated_time,verified", permissions)
				.then((user)=> {
					
					user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

					this.api.login(user.email,'password').subscribe((data)=>{

						this.user_storage.setToken(data['token']);
						this.user_storage.setUsername(user.email);
						this.user_storage.setEmail(user.email);
						this.user_storage.setFirstName(user.first_name);
						this.user_storage.setLastName(user.last_name);
						this.user_storage.setImage(user.picture);
						env.userReady = true;
						env.nav.setRoot(MainPage);

					},(error)=>{
						if (error.status==400) {
							// alert(error._body);

							this.api.registrarUsuario(this.token_global, user.email, user.email, 'password', user.first_name, user.last_name).subscribe((data)=>{

								this.user_storage.setToken(data['token']);
								this.user_storage.setUsername(user.email);
								this.user_storage.setEmail(user.email);
								this.user_storage.setFirstName(user.first_name);
								this.user_storage.setLastName(user.last_name);
								this.user_storage.setImage(user.picture);

								this.setVariablesMenu(user.picture ,user.first_name+' '+user.last_name)

								env.userReady = true;
								env.nav.setRoot(MainPage);

							}, (error)=> {
								console.log(error);
							});
						}
					});
				});

			} else if (response.status === 'not_authorized') {
				alert("The person is logged into Facebook, but not your app.");
			} else {
				alert("The person is not logged into Facebook");
			}

		}, (error)=>{
			alert("error de facebook");
		});
	}

	setVariablesMenu(imagen, nombre_usuario){
		this.imagen = imagen;
		this.nombre_usuario = nombre_usuario;
	}

	// funcion para checkear el estado de la sesion de Facebook
	checkLogin(){

		Facebook.getLoginStatus()
		.then((response)=> {

			alert(JSON.stringify(response.status));

		}, (error)=>{

			alert("error al checkear la sesión de facebook");
		});

	}

}
