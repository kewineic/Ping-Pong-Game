
var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
var diametro = 22;
var raio = diametro / 2;

var eixoXbolinha = 300;
var eixoYbolinha = 200;
var velocidadeX = 2;
var velocidadeY = 2;

var eixoXraquete = 5;
var eixoYraquete = 150;

var eixoXraqueteRival = 585;
var eixoYraqueteRival = 150;

var velocidadeYrival = 10;
var chanceDeAcerto = 50;

var teclaCima = 38;
var teclaBaixo = 40;

var taxaTeclado = 20;

var meusPontos = 0;
var rivalPontos = 0;

var raquetadaSom = () => { new Audio("./raquetada.mp3").play()}
var pontuacaoSom = () => { new Audio("./ponto.mp3").play()}

function limpaTela() {
    pincel.clearRect(0, 0, 600, 400);
}

function verificaColisaoBordas() {
    if (eixoXbolinha > (tela.width - diametro) || eixoXbolinha < diametro) {
        velocidadeX *= -1;
    }

    if (eixoYbolinha > (tela.height - diametro) || eixoYbolinha < diametro) {
        velocidadeY *= -1;
    }
}

function verificaColisaoBolaVsRaquete() {
    if (
        (eixoXbolinha - diametro) < (eixoXraquete + 10) &&
        (eixoYbolinha - diametro) > (eixoYraquete - 50) &&
        (eixoYbolinha - diametro) < (eixoYraquete + 100)
    ) {
        velocidadeX *= -1;
        raquetadaSom()
    }

}

function verificaColisaoBolaVsRaqueteRival() {
    if (
        (eixoXbolinha + diametro) > (eixoXraqueteRival) &&
        (eixoYbolinha + diametro) > (eixoYraqueteRival) &&
        (eixoYbolinha + diametro) < (eixoYraqueteRival + 150)
    ) {
        velocidadeX *= -1;
        raquetadaSom()
    }

}

function verificaPontuacao() {
    if (eixoXbolinha < diametro) {
        rivalPontos++;
        pontuacaoSom()
    } else if (eixoXbolinha > (tela.width - diametro)) {
        meusPontos++;
        pontuacaoSom()
    }
}

function desenhaBolinha(x, y, diam) {
    pincel.fillStyle = 'white';
    pincel.beginPath();
    pincel.arc(x, y, diam, 0, 2 * Math.PI);
    pincel.fill();
}

function direcaoBolinha() {
    eixoXbolinha += velocidadeX;
    eixoYbolinha += velocidadeY;
}

function desenhaRaquete() {
    pincel.fillStyle = 'white';
    pincel.fillRect(eixoXraquete, eixoYraquete, 10, 100);
}

function desenhaRaqueteRival() {
    pincel.fillStyle = 'white';
    pincel.fillRect(eixoXraqueteRival, eixoYraqueteRival, 10, 100);
}

function movimentoTeclado(evento) {
    if (evento.keyCode == teclaCima) {
        eixoYraquete -= taxaTeclado

    } else if (evento.keyCode == teclaBaixo) {
        eixoYraquete += taxaTeclado
    }
    atualizaTela();
}

function movimentoRival() {
    eixoYraqueteRival = eixoYbolinha - chanceDeAcerto; 
}

function alteraChanceDeAcertar(){
    if(eixoXbolinha > 500){
        if(chanceDeAcerto < -40){
            velocidadeYrival*= -1
        }else if(chanceDeAcerto > 140){
            velocidadeYrival*= -1
        }
        chanceDeAcerto+=velocidadeYrival
        console.log(chanceDeAcerto)
    }
}

function mostraPontuacao(){
    pincel.font = "bold 16pt Arial";
    pincel.textAlign = 'center';
    pincel.fillStyle = 'orange';
    pincel.strokeStyle = "white";
    pincel.fillRect(230, 8, 40, 20);
    pincel.strokeRect(230, 8, 40, 20);
    pincel.fillRect(330, 8, 40, 20);
    pincel.strokeRect(330, 8, 40, 20);
    pincel.fillStyle = 'white';
    pincel.fillText(meusPontos, 250, 26);
    pincel.fillText(rivalPontos, 350, 26);
}

function atualizaTela() {
    limpaTela();
    desenhaRaquete();
    desenhaRaqueteRival();
    movimentoRival()
    verificaColisaoBordas();
    verificaColisaoBolaVsRaquete();
    verificaColisaoBolaVsRaqueteRival();
    verificaPontuacao();
    mostraPontuacao();
    direcaoBolinha();
    desenhaBolinha(eixoXbolinha, eixoYbolinha, diametro);
    
    console.log(eixoXbolinha, eixoYraquete)
}

document.onkeydown = movimentoTeclado;
setInterval(alteraChanceDeAcertar, 200);
setInterval(atualizaTela, 1);
