export class User {
    
    _id: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento: string;
    email: string;
    localidad : string;
    provincia : string;
    domicilio : string;
    telefono : number;
    gestor : boolean;
    admin: boolean;
    nuss: number;
    deleted:boolean;
    username: string;
    password: string;
    becario: boolean;

    /*constructor( _id: string,nombre: string,apellidos: string, fechaNacimiento: string,email: string,
        localidad : string,provincia : string, domicilio : string, telefono : number, gestor : boolean,
        admin: boolean,nuss: number,deleted:boolean,username: string, password: string, becario: boolean){
        this._id = _id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.localidad=localidad;
        this.provincia=provincia
        this.domicilio = domicilio;
        this.telefono = telefono;
        this.gestor = gestor;
        this.admin = admin;
        this.nuss = nuss;
        this.deleted = this.deleted;
        this.username = this.username;
        this.password = this.password;
        this.becario = this.becario;
    }*/


    /*constructor(_id = '', nombre = '', apellidos = '', fechaNacimiento = '', salary = 0) {
        this._id = _id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = this.fechaNacimiento;
        this.email = this.email;
        this.provincia = this.provincia;
        this.domicilio = this.domicilio;
        this.telefono = this.telefono;
        this.gestor = this.gestor;
        this.admin = this.admin;
        this.nuss = this.nuss;
        this.deleted = this.deleted;
        this.username = this.username;
        this.password = this.password;
        this.becario = this.becario;
    }*/


}