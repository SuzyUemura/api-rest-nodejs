const fs = require('fs')
const path = require('path')

module.exports = (caminho, arquivo, callbackImagem) => {
    const tipo = path.extname(caminho)
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const verificarTipo = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if(verificarTipo){
        const novoCaminho = `./assets/imagens/${arquivo}${tipo}`

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () =>  callbackImagem(false, novoCaminho))
    } else {
        const erro = 'Tipo é inválido'
        console.log('O tipo do arquivo é inválido')
        callbackImagem(erro)
    }
}

/* fs.readFile('./assets/pug.jpg', (erro, buffer) => {
    console.log('imagem bufferizada')
    console.log(buffer)

fs.writeFile('./assets/pug2.jpg', buffer, (erro) => {
    console.log('A imagem foi escrita')
})
    síncrona(lê o arquivo inteiro antes de continuar a execução do programa)
})
*/ 