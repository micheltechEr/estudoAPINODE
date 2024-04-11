import { alunos } from './bdfile.js';

export default function buscarAlunoPorID(id) {
    return alunos.find(nameAl => nameAl.id == id);
}