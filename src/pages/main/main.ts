import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { CircuitosPage } from '../circuitos/circuitos';
import { UserStorage } from '../../providers/userstorage';
import { Api } from '../../providers/api';
import { DataLocal } from '../../providers/data-local';





/*
	Generated class for the Main page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-main',
	templateUrl: 'main.html'
})
export class MainPage {
	user: any;
	userReady: boolean = false;
	bool_image_facebook: boolean = false;
	image_facebook: any;
	image: any;
	// token: string = "b57e4f63d7e533b7505badb9daad49a8412dbbab";
	token: string = "7e45f8e79bed219b2e5e50acaee27a5c727456ae";
	rutas: Array<any>;
	grid: Array<Array<any>>;
	

	constructor( private data_local: DataLocal, public navCtrl: NavController, public navParams: NavParams, private user_storage: UserStorage, private api: Api) {
		this.user_storage.getImage().then((imagen)=>{
			this.image =  imagen;
			if (this.image != null && this.image != "") {
				this.bool_image_facebook = true;
				this.image_facebook = this.image;
			}
		});

		this.user_storage.getToken().then((token)=>{
			this.token = token;
			this.api.getRutas(this.token).subscribe((data)=>{
				this.rutas = data['results'];
				this.data_local.setRutas(this.rutas);
				this.grid = Array(Math.ceil(this.rutas.length/2)); //MATHS!
				let rowNum = 0; //counter to iterate over the rows in the grid
				for (let i = 0; i < this.rutas.length; i+=2) { //iterate images
					this.grid[rowNum] = Array(2); //declare two elements per row
					if (this.rutas[i]) { //check file URI exists
 						this.grid[rowNum][0] = this.rutas[i] //insert image
 					}
 					if (this.rutas[i+1]) { //repeat for the second image
      					this.grid[rowNum][1] = this.rutas[i+1]
    				}
    				rowNum++; //go on to the next row
				}
			},(error)=>{console.log(error)});
		},(error)=>{console.log(error)});
	}

 	ionViewWillEnter(){}

	ionViewDidLoad() {}

	ionViewCanEnter(){
		let env = this;
		NativeStorage.getItem('user')
		.then((data)=>{
			env.user = {
				name: data.name,
				gender: data.gender,
				picture: data.picture
			};
				env.userReady = true;
		},(error)=>{
			console.log(error);
		});
	}

	toCircuitos(titulo, id){
		console.log(id);
		this.navCtrl.push(CircuitosPage, {id: id, titulo: titulo});
	}

}
