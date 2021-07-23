const { query } = require("../database/conexao")

class Tabelas {
    init(conexao){ //apenas informa que irá vim conexao de algum lugar
        this.conexao = conexao
        this.criarAtendimento()
        this.criarPets()
    }

    criarAtendimento(){
        try {
            const sql ='CREATE TABLE if not exists atendimentos(id int not null auto_increment, cliente varchar(11) not null, pet varchar(20), servico varchar(20) not null, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) not null, observacoes text, primary key(id))'
      // console.log('antes:' + JSON.stringify(this.conexao))
        this.conexao.query(sql, (erro, results, fields) => {
            if(erro){
                throw{status: 500, message: erro}
            } else {
                console.log('tabela de atendimentos criada co sucesso')
            }
        })
        } catch (error) {
           console.log(error)
        }
    }

    criarPets(){
        const query = 'CREATE TABLE IF NOT EXISTS pets (id int NOT NULL auto_increment, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))'
     //   console.log('depois:' + JSON.stringify(this.conexao))
        this.conexao.query(query, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela criada com sucesso')
            }
        })
    }
} 

module.exports = new Tabelas