import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
  
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(client => {
        if (client.id == cliente.id) {
          Object.assign(client, cliente);
        }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nome: string) : Cliente[] {

    const clientes = this.obterStorage();
    if (!nome) return clientes;

    return clientes.filter(cliente => cliente.nome?.indexOf(nome) !== -1)
  }

  buscarClientePorId(id: string) : Cliente | undefined {
    return this.obterStorage().find(cliente => cliente.id === id)
  }

  private obterStorage() : Cliente[] {
    const repository = localStorage.getItem(ClienteService.REPO_CLIENTES);
    let clientes: Cliente[] = [];
    if (repository) {
      clientes = JSON.parse(repository);
    } else {
       localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    }
    return clientes;
  }

  deletar(cliente: Cliente) {
    const storage = this.obterStorage();
    const novaLista = storage.filter(c => c.id != cliente.id);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }
}
