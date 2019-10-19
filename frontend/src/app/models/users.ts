export class User {

    constructor(_id = '', nombre = '', apellidos = '', fechaNacimiento = '', salary = 0) {
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
    }

    _id: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento: Date;
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

}