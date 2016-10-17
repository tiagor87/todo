import {Tarefa} from '../models/tarefa-model';

export interface ITarefaService {
    getById(id: string): ng.IPromise<Tarefa>;
    get(filter: any): ng.IPromise<Array<Tarefa>>;
    post(tarefa: Tarefa): ng.IPromise<Tarefa>;
    put(id: string, atualizacao: any): ng.IPromise<void>;
    deleteById(id: string): ng.IPromise<void>;
}

angular.module('todo')
    .factory('TarefaService', [
        '$resource',
        'TarefaModel',
        ($resource: ng.resource.IResourceService, TarefaModel) => {
            const ENDPOINT = "http://localhost:5000/:id";

            class TarefaService implements ITarefaService {
                constructor(private resource: any) {
                    
                }

                getById(id: string): ng.IPromise<Tarefa> {
                    return this.resource.get({id: id})
                        .$promise
                        .then(data => new TarefaModel(data));
                }
                get(filter: any): ng.IPromise<Array<Tarefa>> {
                    return this.resource.query(filter)
                        .$promise
                        .then(data => data.map(d => new TarefaModel(d)));
                }
                post(tarefa: Tarefa): ng.IPromise<Tarefa> {
                    return this.resource.post(tarefa)
                        .$promise
                        .then(tarefa => new TarefaModel(tarefa));
                }
                put(id: string, atualizacao: any): ng.IPromise<void> {
                    return this.resource.put(id, atualizacao)
                        .$promise
                        .then(() => {});
                }
                deleteById(id: string): ng.IPromise<void> {
                    return this.resource.delete({id: id})
                        .$promise
                        .then(() => {});
                }
            }

            return new TarefaService($resource(ENDPOINT, {}, {
                get: { method: 'GET' },
                query: { method: 'GET', isArray: true },
                post: { method: 'POST' },
                put: { method: 'PUT' },
                delete: { method: 'DELETE' }
            }));
        }
    ])