import "./style.css";

let puntuacion : number = 0;
const min :number = 1;
const max:number = 12;
type OpcionesCartas = {
  [key: number]: string
};

const mapeoCarta : OpcionesCartas ={
  1:'1_as',
  2:'2_dos',
  3:'3_tres',
  4:'4_cuatro',
  5:'5_cinco',
  6:'6_seis',
  7:'7_siete',
  10:'10_sota',
  11:'11_caballo',
  12:'12_rey'
};

type Estado =
 | "CONSERVADOR"
 | "CANGUELO"
 | "CASI"
 | "CLAVADO"
 | "GAME_OVER";

 const PUNTUACION_CONSERVADORA: number = 4;
 const PUNTUACION_CANGUELO: number = 5;
 const PUNTUACION_CASI: number = 6;
 const PUNTUACION_CLAVADO: number = 7.5;
 


 const mostrarMensaje = (estado)=>{
  let mensaje = "";
  switch (estado) {
    case "CONSERVADOR":
    mensaje = `Has sido muy conservador`;
    break;
    case "CANGUELO":
    mensaje = `Te ha entrado el canguelo eh?`;
    break;
    case "CASI":
    mensaje = `Casi casi...`;
    break;
    case "CLAVADO":
    mensaje = `¡ Lo has clavado! ¡Enhorabuena! 🎉🎉🎉`;
    break;
    case "GAME_OVER":
    mensaje = `🪦 Partida terminada`;
    break;
    default:
    mensaje = "No se que ha pasado, pero no deberías estar aquí";
    break;
    }
    const resultado = document.getElementById("resultado");
    if(resultado){
      resultado.innerHTML = mensaje;
    }   
 }

 const comprobarPuntuacion = () :void =>{

  if(puntuacion < PUNTUACION_CLAVADO ){
// TO DO SEGUIR POR AQUI
  }
 }


const mapearValorCarta = (carta :number): number => {

  if([10,11,12].includes(carta)){
    return 0.5;
  }
  return carta;
}

const muestraCarta=(carta:number): void=>{

  const imgCarta = document.getElementById("carta");
  if(imgCarta && imgCarta instanceof HTMLImageElement){
    imgCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${mapeoCarta[carta]}-copas.jpg`;
    imgCarta.alt = `${carta} de copas`;
  }else{
    console.error(`No se ha encontrado el elemento con id carta`);
  }

}

const muestraPuntuacion = () => {

  const puntuacionItem = document.getElementById("puntuacion");

  if(puntuacionItem  && puntuacionItem instanceof HTMLInputElement ){
     puntuacionItem.value = puntuacion.toString();
  }else{
    console.error(`No se ha encontrado el elemento con id puntuacion`);
  }
}

const dameCarta = ():void => {
  const cartaRandom = Math.floor(Math.random() * (max - min + 1)) + min;

  if([8,9].includes(cartaRandom)){
    dameCarta();
  }
  
  puntuacion += mapearValorCarta(cartaRandom);
  muestraCarta(cartaRandom);
  muestraPuntuacion();
  comprobarPuntuacion();
  
}


document.addEventListener("DOMContentLoaded", muestraPuntuacion);
const btnPedirCarta = document.getElementById("pedirCarta");
btnPedirCarta?.addEventListener("click", dameCarta);





