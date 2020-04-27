
var tela = document.querySelector('canvas')
var pincel = tela.getContext('2d')
var eixoXbolinha = 300;
var eixoYbolinha = 200;
var diametro = 22;
var regra = 1;
var direcao = 1;

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
    if(eixoXbolinha<23){
        regra++;
    }else if(eixoXbolinha>577){
       regra--;
    }

    eixoXbolinha+=regra

    if(eixoYbolinha>377){
        direcao--
    }else if(eixoYbolinha<23){
        direcao++
    }

    eixoYbolinha+=direcao

    limpaTela()
    draw(eixoXbolinha, eixoYbolinha, diametro)
    console.log(eixoXbolinha)
}

setInterval(atualizaTela, 0.1);
