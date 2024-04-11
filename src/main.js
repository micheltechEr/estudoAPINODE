import express from 'express'
import {alunos} from './bdfile.js'
import buscarAlunoPorID from './functions.js'
export const app = express()

//Para o Insomnia entender que os dados estão no formato JSON
app.use(express.json())

//Retorna todos os itens da base
app.get('/alunos',(req,res)=>{
    res.status(200).send(alunos)
})

//Busca o aluno por ID

app.get('/alunos/:id',(req,res)=>{
    const buscaAluno = buscarAlunoPorID(req.params.id)
    if(buscaAluno){
        res.status(200).json(buscaAluno)
    }
    else{
        res.status(404).send('Aluno não encontrado')
    }
})

//Adiciona um aluno a base
app.post('/alunos',(req,res)=>{
    const newItem = req.body
    newItem.id = Math.floor(Math.random()*100) //Acrescenta um ID para cada aluno
    alunos.push(newItem) //Adiciona um item, objeto,ao array
    res.status(201).send('Feito')
})

//Deleta o aluno por ID

app.delete('/alunos/:id',(req,res)=>{
    let deletaAluno = buscarAlunoPorID(req.params.id)
    if(deletaAluno){
        alunos.splice(deletaAluno,1)
        res.status(200).send('Aluno de código ',req.params.id,' excluído com sucesso')
    }
    else{
        res.status(404).send('Não foi possível deletar o aluno pois o código não existe ou está incorreto')
    }
})

//Atualiza o cadastro do aluno

app.put('/alunos/:id',(req,res)=>{
    let indexAluno = buscarAlunoPorID(req.params.id)
    if(indexAluno){
        if(req.body.nameAl != undefined){
            indexAluno.nameAl = req.body.nameAl
            }
        else if(req.body.age !== undefined){
            indexAluno.age = req.body.age
            }
        res.status(200).json(alunos)
    }
    else{
        res.status(404).send('Aluno não encontrado')
    }
})
