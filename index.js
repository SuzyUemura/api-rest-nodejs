const customExpress = require('./config/customExpress')
const conexao = require('../projeto/infraestrutura/database/conexao')
const tabelas = require('../projeto/infraestrutura/database/tabelas')


conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
    
        const app = customExpress()
        tabelas.init(conexao)
        app.listen(3000, () => console.log('servidor na porta 3000')) // onde a aplicação vai ficar escutando
    }
})



//responsabilidade: subir o servidor no ar