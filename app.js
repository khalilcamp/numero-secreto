//Criar uma variável para poder ser alterada. InnerHTML é uma alteração DENTRO do HTML.
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Sexo';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha 1 numero entre 1 e 10';

// tag seria utilizado para tags vazias.
let listaNumeros = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag)
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Bem vindo ao jogo do Numero Secreto');
        exibirTexto('p', 'Escolha 1 numero entre 1 e 10');
}


// function serve como uma função. Nesse caso, verificar o clique.
// verifica o valor e retorna se é falso ou verdadeiro.

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto){
        exibirTexto('h1', `Acertou!`);
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa' ;
        let mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p',  mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTexto('p', 'O número é menor');
        } else {
            exibirTexto('p', 'O número é maior')
        }
        tentativas++;
        limparCampo();
    }
}

// função que retornaa um resultado.

function gerarNumero () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite+1);
    let quantidadeElementos = listaNumeros.length;

    if (quantidadeElementos == 10) {
        listaNumeros = [];
    }
    if (listaNumeros.includes(numeroEscolhido)){
        return gerarNumero();
    } else {
        listaNumeros.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
