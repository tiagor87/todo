export interface Tarefa {
    _id: string;
    responsavel: string;
    dataLimite: Date;
    descricao: string;
}

angular.module('todo')
    .factory('TarefaModel', [
        () => {
            class TarefaModel implements Tarefa {
                _id: string;
                responsavel: string;
                dataLimite: Date;
                descricao: string;
                constructor(data?: any) {
                    return angular.extend(this, data, {dataLimite: new Date(data.dataLimite)});
                }
            }
            return TarefaModel;
        }
    ])