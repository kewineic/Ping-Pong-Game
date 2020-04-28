
var tela = document.querySelector('canvas')
var pincel = tela.getContext('2d')
var eixoXbolinha = 300;
var eixoYbolinha = 200;
var diametro = 22;
var velocidadeX = 2;
var velocidadeY = 2;

function limpaTela(){
    pincel.clearRect(0, 0, 600, 400);
}

function draw(x, y, diam){
    
    pincel.fillStyle = 'white'
    pincel.beginPath();
    pincel.arc(x, y, diam, 0, 2 * Math.PI)
    pincel.fill();

}

function atualizaTela(){
    if( eixoXbolinha > (tela.width - diametro) || eixoXbolinha < diametro ){
        velocidadeX*=-1
    }
    
    if( eixoYbolinha > (tela.height - diametro) || eixoYbolinha < diametro ){
        velocidadeY*=-1
    }

    eixoXbolinha+=velocidadeX
    eixoYbolinha+=velocidadeY
    limpaTela()
    draw(eixoXbolinha, eixoYbolinha, diametro)
    console.log(eixoXbolinha)
}

setInterval(atualizaTela, .1);
