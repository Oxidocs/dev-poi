export interface UsuarioModel
{
  	token: string,
	id : number,
	password : string,
	last_login : string,
	is_superuser : boolean,
	username : string,
	first_name : string,
	last_name : string,
	email: string,
	is_staff: boolean,
	is_active: boolean,
	data_joined: string
}
