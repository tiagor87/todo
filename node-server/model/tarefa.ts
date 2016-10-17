import * as mongoose from 'mongoose';

let schema = new mongoose.Schema({
    responsavel: String,
    tarefa: String,
    dataLimite: Date
});

export let Tarefa = mongoose.model('Tarefa', schema);