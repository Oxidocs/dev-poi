export interface RutasModel
{
	id: number;
  	fk_id_lugares : number;
	fk_id_ciudades : number;
	direccion : string;
	ranking : number;
	location : any;
	objects : any;
}
