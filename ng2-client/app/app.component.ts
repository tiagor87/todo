import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import './rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  tarefas: Array<any>;
  constructor(private service: AppService) {

  }
  ngOnInit() {
    this.service.query({})
      .subscribe(tarefas => this.tarefas = tarefas);
  }
  novo() {
    this.service.post({descricao: ''})
      .subscribe(tarefa => this.tarefas.unshift(tarefa));
  }
  atualizar(id: string, propriedade: string, valor: any) {
    let atualizacao = {};
    atualizacao[propriedade] = valor;
    this.service.put(id, atualizacao)
      .subscribe(() => {
      });
  }
  deletar(indice: number, id: string) {
    this.service.delete(id)
      .subscribe(() => this.tarefas.splice(indice, 1));
  }
}
