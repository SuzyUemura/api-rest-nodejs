const query = require('../infraestrutura/database/queries')
const atendimento = require('../models/atendimento')

class Atendimento {
    adiciona(atendimento){
        const sql = 'INSERT INTO atendimentos SET ?'
        return query(sql, atendimento )
    }

    lista() {
        const sql = 'SELECT * FROM atendimentos'
        return query(sql)
    }
}

module.exports = new Atendimento()