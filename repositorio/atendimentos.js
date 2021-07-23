const query = require('../infraestrutura/database/queries')
const atendimento = require('../models/atendimento')

class Atendimento {
    adiciona(Atendimento){
        const sql = 'INSERT INTO atendimentos SET ?'
        return query(sql, atendimento)
    }
}

module.exports = new Atendimento()