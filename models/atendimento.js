const moment = require('moment')
const axios = require('axios')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorio/atendimentos')

class Atendimento {
    constructor(){
        this.dataValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteValido = tamanho => tamanho >= 4
        this.valida = (parametros) => this.validacao.filter(campo =>{
            const {nome} = campo
            const parametro = parametros[nome]
            return !campo.valido(parametros)
        })
        this.validacao = [
            {
                nome: "data",
                valido: this.dataValida,
                mensagem: "A data deve ser a partir de hoje."
            },
            {
                nome: "cliente",
                valido: this.clienteValido,
                mensagem: "O nome do cliente deve ter no minímo 4 caracteres."
            }
        ]
    }

    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')

        const parametros = {
            data: {data, dataCriacao},
            cliente: { tamanho: atendimento.cliente.length}
        }

        const erros = this.valida(parametros)
        const exitemErros = erros.length //zero retorna false

        if(exitemErros){
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return {...atendimento, id}
                })
        }       
    }

    listar(){
        return repositorio.lista()
    }

    buscarId(id, res){
            const sql = `SELECT * FROM atendimentos WHERE id-${id}`
        
            conexao.query(sql, async (erro, resultados) => {
                const atendimento = resultados[0]
                const cpf = atendimento.cliente
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        
                    atendimento.cliente = data
        
                    res.status(200).json(atendimento)
                }
            })
    }

    altera(id, valores, res){
        
        if(valores.data){
           valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                console.log(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    excluir(id, res){
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(id)
            }
        })
    }
}

module.exports = new Atendimento()