const Atendimento = require('../models/atendimento')

module.exports = app => { 
    app.get('/atendimento', (req, res) => {
        Atendimento.listar()
                    .then(resultados => res.json(resultados)) //200ok é o padrao
                    .catch(erros => res.status(400).json(erros))
                })

    app.get('/atendimento/:id', (req, res) => {
        const id = req.params.id

        Atendimento.buscarId(id, res)
    })

    app.post('/atendimento', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(erros => res.status(400).json(erros))
        })

    app.patch('/atendimento/:id', (req, res) => {
        const id = req.params.id
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimento/:id', (req, res) => {
        const id = req.params.id

        Atendimento.excluir(id, res)
    })
}    

//responsabilidade: controlar as rotas e quais são e o que precisa ser feito quando acessar cada uma dessas rotas