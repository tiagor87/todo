import * as mongoose from 'mongoose';

let schema = new mongoose.Schema({
    descricao: String
});

export let Tarefa = mongoose.model('Tarefa', schema);