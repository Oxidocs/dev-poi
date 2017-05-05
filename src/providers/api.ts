import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UsuarioModel } from '../models/usuario';
import { RutasModel } from '../models/rutas';
import { CircuitoModel } from '../models/circuitos';


@Injectable()
export class Api {

	// url = 'http://poitour.com/api';
	// url = 'http://192.168.0.33:8000/api';
	// url = 'http://192.168.0.6:8000/api';
	url = 'http://192.168.100.9:8000/api';

	constructor(public http: Http) {}

	login(user,password): Observable<UsuarioModel[]>{
		var json = JSON.stringify({ username: user, password:password});
		var params = json;
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(`${this.url}/api-token-auth/`,
		params, {
			headers: headers
		})
		.map(res => <UsuarioModel[]>res.json());
	}

	registrarUsuario(token, username, email, password, first_name, last_name) {

		let variables = 'username='+username+'&password='+password+'&email='+email+'&first_name='+first_name+'&last_name='+last_name;

		var params = variables;
		var headers = new Headers();

		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Authorization', 'Token '+token);

		return this.http.post(`${this.url}/usuarios/registrar`,

		params, {
			headers: headers
		})
		.map(res => <UsuarioModel[]>res.json());
	}

	getRutas(token): Observable<RutasModel[]>{
		var json = JSON.stringify({format:'json'});
		var params = json;
		var headers = new Headers();
		headers.append('Authorization', 'Token '+token);
		return this.http.get(`${this.url}/rutas/?format:'json`)
		.map(res => <RutasModel[]>res.json());
	}

	getCircuitos(token, id_ruta): Observable<CircuitoModel[]>{
		var json = JSON.stringify({format:'json'});
		var params = json;
		var headers = new Headers();
		headers.append('Authorization', 'Token '+token);
		return this.http.get(this.url+"/circuitos_ruta/"+id_ruta+"/?format:'json'")
		.map(res => <CircuitoModel[]>res.json());
	}
}
