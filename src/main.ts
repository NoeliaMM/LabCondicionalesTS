import "./style.css";

let puntos: number = 0;
let cartasGastadas: Array<number> = [];

type Estado =
  | "CONSERVADOR"
  | "CANGUELO"
  | "CASI"
  | "CLAVADO"
  | "PASADO"
  | "GAME_OVER";

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
  const resultadoFin = document.getElementById("mensajeFin");
  if (resultadoFin) {
    resultadoFin.innerHTML = `🪦 Partida terminada`;
  }
};

const finalizarPartida = () => {
  if (puntos === 7.5) {
    mostrarMensaje("CLAVADO");
  }

  if (puntos > 7.5) {
    mostrarMensaje("PASADO");
  }

  gestionarFin();
};

const comprobarPuntuacion = (): void => {
  if (puntos === 7.5) {
    mostrarMensaje("CLAVADO");
  }
  if (puntos <= 4) {
    mostrarMensaje("CONSERVADOR");
  }
  if (puntos > 4 && puntos <= 5) {
    mostrarMensaje("CANGUELO");
  }
  if (puntos > 5 && puntos <= 7.5) {
    mostrarMensaje("CASI");
  }
  if (puntos > 7.5) {
    mostrarMensaje("PASADO");
  }

  gestionarFin();
};

const gestionarFin = (): void => {
  if (
    btnPedirCarta !== null &&
    btnPedirCarta !== undefined &&
    btnPedirCarta instanceof HTMLButtonElement
  ) {
    btnPedirCarta.disabled = true;
  }
  if (
    btnPararPartida !== null &&
    btnPararPartida !== undefined &&
    btnPararPartida instanceof HTMLButtonElement
  ) {
    btnPararPartida.disabled = true;
  }
};

const muestraCarta = (urlCarta: string): void => {
  const contenedorCartas = document.getElementById("contenedor-cartas");
  const imgCarta = document.createElement("img");
  const carta1 = document.getElementById("carta_boca_abajo");

  if (
    contenedorCartas !== null &&
    contenedorCartas !== undefined &&
    contenedorCartas instanceof HTMLElement
  ) {
    imgCarta.src = urlCarta;
    contenedorCartas.appendChild(imgCarta);
  } else {
    console.error(`No se ha encontrado el elemento con id carta`);
  }
  if (
    carta1 !== null &&
    carta1 !== undefined &&
    carta1 instanceof HTMLImageElement
  ) {
    carta1.style.visibility = "hidden";
    carta1.style.width = "0px";
  }
};

const muestraPuntuacion = () => {
  const puntuacionItem = document.getElementById("puntuacion");

  if (
    puntuacionItem != null &&
    puntuacionItem !== undefined &&
    puntuacionItem instanceof HTMLInputElement
  ) {
    puntuacionItem.value = puntos.toString();
  } else {
    console.error(`No se ha encontrado el elemento con id puntuacion`);
  }
};

const calcularNumeroCarta = () => {
  const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
  if (numeroAleatorio > 7 ) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};

const obtenerUrlCarta = (carta: number) => {
  switch (carta) {
    case 1:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";

    case 2:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";

    case 3:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";

    case 4:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";

    case 5:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";

    case 6:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";

    case 7:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";

    case 10:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";

    case 11:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";

    case 12:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";

    default:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
};

const obtenerPuntosCarta = (carta: number) => {
  if (carta > 7) {
    return 0.5;
  }
  return carta;
};

const sumarPuntos = (puntuacion: number) => {
  return puntos + puntuacion;
};

const actualizarPuntos = (puntosActuales: number) => {
  puntos = puntosActuales;
};

const dameCarta = (): void => {
  const carta = calcularNumeroCarta();
  if(cartasGastadas.includes(carta)){
    dameCarta();
  }else{
    cartasGastadas.push(carta);    
    const urlCarta = obtenerUrlCarta(carta);
    muestraCarta(urlCarta);
    const puntosCarta = obtenerPuntosCarta(carta);
    const puntosSumados = sumarPuntos(puntosCarta);
    actualizarPuntos(puntosSumados);
    muestraPuntuacion();
    if (puntos >= 7.5) {
      finalizarPartida();
    }
  }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

const btnPedirCarta = document.getElementById("pedirCarta");
if (
  btnPedirCarta !== null &&
  btnPedirCarta !== undefined &&
  btnPedirCarta instanceof HTMLButtonElement
) {
  btnPedirCarta.addEventListener("click", dameCarta);
}

const btnPararPartida = document.getElementById("pararPartida");
if (
  btnPararPartida !== null &&
  btnPararPartida !== undefined &&
  btnPararPartida instanceof HTMLButtonElement
) {
  btnPararPartida.addEventListener("click", comprobarPuntuacion);
}

const btnReset = document.getElementById("reset");
if (
  btnReset !== null &&
  btnReset !== undefined &&
  btnReset instanceof HTMLButtonElement
) {
  btnReset.addEventListener("click", () => location.reload());
}
