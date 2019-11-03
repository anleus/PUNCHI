import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DepartamentosService } from '../../services/departamentos.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private departamentosService: DepartamentosService, private router: Router) { }

  ngOnInit() {
  }

  usuarioExistente2() {
      this.departamentosService.getDepartamentoByUser('5dae0cc075c3fa2c90124a55').subscribe(
        res => {
          console.log(res);
          }
      );
    }
}
