import "./style.css";

let puntos: number = 0;
let cartas_excluidas: Array<number> = [8, 9];
const min: number = 1;
const max: number = 12;
type OpcionesCartas = {
  [key: number]: string;
};

const mapeoCarta: OpcionesCartas = {
  1: "1_as",
  2: "2_dos",
  3: "3_tres",
  4: "4_cuatro",
  5: "5_cinco",
  6: "6_seis",
  7: "7_siete",
  10: "10_sota",
  11: "11_caballo",
  12: "12_rey",
};

type Estado =
  | "CONSERVADOR"
  | "CANGUELO"
  | "CASI"
  | "CLAVADO"
  | "PASADO"
  | "GAME_OVER";

const PUNTUACION_CONSERVADORA: number = 4;
const PUNTUACION_CANGUELO: number = 5;
const PUNTUACION_CASI: number = 6;
const PUNTUACION_CLAVADO: number = 7.5;

const mostrarMensaje = (estado: Estado) => {
  let mensaje = "";
  switch (estado) {
    case "CONSERVADOR":
      mensaje = `Has sido muy conservador 🤔`;
      break;
    case "CANGUELO":
      mensaje = `Te ha entrado el canguelo eh? 😏`;
      break;
    case "CASI":
      mensaje = `Casi casi... 🥲`;
      break;
    case "CLAVADO":
      mensaje = `¡ Lo has clavado! ¡Enhorabuena! 🎉🎉🎉`;
      break;
    case "GAME_OVER":
      mensaje = `🪦 Partida terminada`;
      break;
    case "PASADO":
      mensaje = `Te has pasado 😬`;
      break;
    default:
      mensaje = "No se que ha pasado, pero no deberías estar aquí";
      break;
  }
  const resultado = document.getElementById("resultado");
  if (resultado) {
    resultado.innerHTML = mensaje;
  }
};

const comprobarPuntuacion = (): void => {
  finPartida();
  switch (true) {
    case puntos === PUNTUACION_CLAVADO:
      mostrarMensaje("CLAVADO");
      break;

    case puntos === PUNTUACION_CONSERVADORA:
      mostrarMensaje("CONSERVADOR");
      break;
    case puntos === PUNTUACION_CASI:
      mostrarMensaje("CASI");
      break;

    case puntos === PUNTUACION_CANGUELO:
      mostrarMensaje("CANGUELO");
      break;

    case puntos > PUNTUACION_CLAVADO:
      mostrarMensaje("PASADO");
      break;

    default:
      mostrarMensaje("GAME_OVER");
      break;
  }
};

const finPartida = (): void => {
  if (btnPedirCarta && btnPedirCarta instanceof HTMLButtonElement) {
    btnPedirCarta.disabled = true;
  }
  if (btnPararPartida && btnPararPartida instanceof HTMLButtonElement) {
    btnPararPartida.disabled = true;
  }
};

const mapearValorCarta = (carta: number): number => {
  if ([10, 11, 12].includes(carta)) {
    return 0.5;
  }
  return carta;
};

const muestraCarta = (carta: number): void => {
  const imgCarta = document.getElementById("carta");
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${mapeoCarta[carta]}-copas.jpg`;
    imgCarta.alt = `${carta} de copas`;
  } else {
    console.error(`No se ha encontrado el elemento con id carta`);
  }
};

const muestraPuntuacion = () => {
  const puntuacionItem = document.getElementById("puntuacion");

  if (puntuacionItem && puntuacionItem instanceof HTMLInputElement) {
    puntuacionItem.value = puntos.toString();
  } else {
    console.error(`No se ha encontrado el elemento con id puntuacion`);
  }
};

const dameCarta = (): void => {
  const cartaRandom = Math.floor(Math.random() * (max - min + 1)) + min;
  if (cartas_excluidas.includes(cartaRandom)) {
    dameCarta();
    return;
  }
  cartas_excluidas.push(cartaRandom);

  puntos += mapearValorCarta(cartaRandom);
  muestraCarta(cartaRandom);
  muestraPuntuacion();
  if (puntos >= PUNTUACION_CLAVADO) {
    comprobarPuntuacion();
  }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);
const btnPedirCarta = document.getElementById("pedirCarta");
btnPedirCarta?.addEventListener("click", dameCarta);

const btnPararPartida = document.getElementById("pararPartida");
btnPararPartida?.addEventListener("click", comprobarPuntuacion);

const btnReset = document.getElementById("reset");
btnReset?.addEventListener("click", () => location.reload());
