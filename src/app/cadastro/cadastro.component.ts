import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule, 
    MatCardModule, 
    FormsModule, 
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

    cliente: Cliente = Cliente.newClient();
    atualizando: boolean = false;
    private snack: MatSnackBar = inject(MatSnackBar);
    estados: Estado[] = [];
    municipios: Municipio[] = [];


    constructor(
      private service: ClienteService,
      private brasilApiService: BrasilapiService,
      private route: ActivatedRoute,
      private router: Router
    ) {    }

    ngOnInit(): void {
      this.route.queryParamMap.subscribe((query: any) => {
        const params = query['params']
        const id = params['id']
        if (id) {
            let cliente = this.service.buscarClientePorId(id);
            if (cliente) {
              this.atualizando = true;
              this.cliente = cliente;
              if (this.cliente.uf) {
                const event = { value: this.cliente.uf }
                this.carregarMunicipios(event as MatSelectChange);
              }
              }
        }
      })
      this.carregarUFs()
    }

    carregarUFs() {
      this.brasilApiService.listarUf().subscribe(
        {
          next: listaEstados => this.estados = listaEstados,
          error: erro => console.log("ocorreu um erro", erro)
        })
    }

    carregarMunicipios(event: MatSelectChange) {
      const uf = event.value;
      this.brasilApiService.listarMunicipios(uf).subscribe(
        {
          next: municipios => this.municipios = municipios,
          error: erro => console.log("ocorreu um erro", erro)
        }
      )
    }

    salvar() {
      if (!this.atualizando) {
        this.service.salvar(this.cliente);
        this.cliente = Cliente.newClient();    
        this.mostrarMensagem("Salvo com sucesso!")
      } else {
        this.service.atualizar(this.cliente);
        this.router.navigate(['/consulta'])
        this.mostrarMensagem("Atualizado!")
      }
    }

    mostrarMensagem(mensagem: string) {
      this.snack.open(mensagem, "Ok")
    }
}
