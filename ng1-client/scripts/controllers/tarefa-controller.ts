import {Tarefa} from '../models/tarefa-model';
import {ITarefaService} from '../services/tarefa-service';

angular.module('todo')
    .controller('TarefaController', [
        'TarefaModel',
        'TarefaService',
        (TarefaModel, tarefaService) => {
            class TarefaController {
                tarefas: Array<Tarefa>;
                
                gravar(tarefa: Tarefa) {
                    console.log('Gravando');
                    const i = this.tarefas.indexOf(tarefa);
                    if (~~i) {
                        return this.atualizar(i, tarefa);
                    } 
                    
                    return this.inserir(tarefa);
                }

                private inserir(tarefa: Tarefa): ng.IPromise<void> {
                    return tarefaService.post(tarefa)
                        .then(tarefa => {
                            this.tarefas.unshift(tarefa);
                        });
                }

                private atualizar(i, tarefa: Tarefa): ng.IPromise<void> {
                    return tarefaService.put(tarefa._id, tarefa)
                        .then(() => {
                            this.tarefas.splice(i, 1, tarefa);
                        });
                }
            }
        }])