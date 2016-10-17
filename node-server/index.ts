import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { Tarefa } from './model/tarefa';
 
mongoose.connect('mongodb://localhost/todo');

let app = express();
app.get('/', bodyParser.json(), (request, response, error) => {
    Tarefa.find(request.query)
        .exec()
        .then(tarefas => {
            response.json(200, tarefas);
        },
        e => {
            error(e);
        });
});
app.get('/:id', bodyParser.json(), (request, response, error) => {
    let id = request.params.id;
    Tarefa.findById(id)
        .exec()
        .then(tarefa => {
            response.json(200, tarefa);
        },
        e => {
            error(e);
        });
});
app.post('/', bodyParser.json(), (request, response, error) => {
    Tarefa.create(request.body)
        .then((tarefa) => {
            response.json(201, tarefa); 
        },
        e => error(e));
});
app.put('/:id', bodyParser.json(), (request, response, error) => {
    let id = request.params.id;
    let alteracao = request.body;
    Tarefa.findByIdAndUpdate(id, alteracao)
        .exec()
        .then(() => {
            response.status(200).end();
        },
        e => error(e));
});
app.delete('/:id', (request, response, error) => {
    let id = request.params.id;
    Tarefa.findByIdAndRemove(id)
        .exec()
        .then(() => {
            response.status(204).end();
        },
        e => error(e));
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));