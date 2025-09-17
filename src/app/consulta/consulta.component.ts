import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, CommonModule, MatCardModule, MatButtonModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatButton],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = '';
  clientes: Cliente[] =  [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "acoes"];

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientes = this.service.pesquisarClientes('');
  }

  pesquisar() {
    this.clientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
      this.router.navigate(['/cadastro'], { queryParams: { "id": id}})
  }

}
