
var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
var eixoXbolinha = 300;
var eixoYbolinha = 200;
var diametro = 22;
var raio = diametro/2;

var velocidadeX = 2;
var velocidadeY = 2;

var eixoXraquete = 5;
var eixoYraquete = 150;

var eixoXraqueteRival = 585;
var eixoYraqueteRival = 150;

var velocidadeYrival = 2;

var teclaCima = 38;
var teclaBaixo = 40;

var taxaTeclado = 20;

function limpaTela(){
    pincel.clearRect(0, 0, 600, 400);
}

function verificaColisaoBordas(){
    if( eixoXbolinha > (tela.width - diametro) || eixoXbolinha < diametro ){
        velocidadeX*=-1;
    }
    
    if( eixoYbolinha > (tela.height - diametro) || eixoYbolinha < diametro ){
        velocidadeY*=-1;
    }
}

function verificaColisaoBolaVsRaquete(){
    if( 
        (eixoXbolinha - diametro) < (eixoXraquete + 10)  &&
        (eixoYbolinha - diametro) > (eixoYraquete - 50) &&  
        (eixoYbolinha - diametro) < (eixoYraquete + 100) 
    ){
        velocidadeX*=-1;
    }
    
}

function verificaColisaoBolaVsRaqueteRival(){
    if( 
        (eixoXbolinha + diametro) > (eixoXraqueteRival )  &&
        (eixoYbolinha + diametro) > (eixoYraqueteRival - 50) &&  
        (eixoYbolinha + diametro) < (eixoYraqueteRival + 100) 
    ){
        velocidadeX*=-1;
    }
    
}

function desenhaBolinha(x, y, diam){
    pincel.fillStyle = 'white';
    pincel.beginPath();
    pincel.arc(x, y, diam, 0, 2 * Math.PI);
    pincel.fill();
}

function direcaoBolinha(){
    eixoXbolinha+=velocidadeX;
    eixoYbolinha+=velocidadeY;
}

function desenhaRaquete(){    
    pincel.fillStyle = 'white';
    pincel.fillRect(eixoXraquete, eixoYraquete, 10, 100);
}

function desenhaRaqueteRival(){    
    pincel.fillStyle = 'white';
    pincel.fillRect(eixoXraqueteRival, eixoYraqueteRival, 10, 100);
}

function movimentoTeclado(evento){
    if(evento.keyCode == teclaCima){
        eixoYraquete -= taxaTeclado
        
    }else if(evento.keyCode == teclaBaixo){
        eixoYraquete += taxaTeclado   
    }
    atualizaTela();
}

function movimentoRival(){
    eixoYraqueteRival = eixoYbolinha - 50;
}

function atualizaTela(){
    limpaTela();
    desenhaRaquete();
    desenhaRaqueteRival();
    movimentoRival()
    verificaColisaoBordas();
    verificaColisaoBolaVsRaquete();
    verificaColisaoBolaVsRaqueteRival();
    direcaoBolinha();
    desenhaBolinha(eixoXbolinha, eixoYbolinha, diametro);  
}

document.onkeydown = movimentoTeclado;
setInterval(atualizaTela, .1);
