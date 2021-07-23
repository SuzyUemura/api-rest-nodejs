const express = require('express') //chama a bibliota
const consign = require('consign') //pega os arquivos expostos para rodar na aplicacao
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express() //cria um app e faz funcionar a express

    app.use(bodyParser.urlencoded({extended: true})) //usa as bibliotecas
    app.use(bodyParser.json())
    consign()
        .include('controller')
        .into(app)
    
    return app
}


//responsabilidade: configurar qualquer coisa que precise dentro do express