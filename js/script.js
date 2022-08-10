let btnIniciar = document.querySelector("#btn-iniciar");
let inserirPalavra = document.querySelector("#inserir-palavra");
let salvar = document.querySelector("#gravar");
let cancelar = document.querySelector("#cancelar");
let novoJogo = document.querySelector("#novo-jogo");
let desistir = document.querySelector("#desistir");

let inicio = document.querySelector("#inicio");
let inPalavra = document.querySelector("#in-palavra");
let jogo = document.querySelector("#jogo");
let footer = document.querySelector("footer");

let listaDePalavras = ["ALURA", "ORACLE", "HTML", "CSS", "JAVASCRIPT"];

let palavra = document.querySelector("#palavra");
let borda = document.querySelector("canvas");
let pincel = forca.getContext("2d");
let contador = 0;
let flag = false;
let jogarPlv;
let contadorLetraError = 0;
let listandoLetras = [];
let plvEmJogo = [];
let vencedor = false;

btnIniciar.addEventListener("click", () => {
  inicio.classList.add("oculta");
  jogo.classList.remove("oculta");
  iniciarJogo();
  flag = true;
  footer.classList.add("footer");
});

inserirPalavra.addEventListener("click", () => {
  inicio.classList.add("oculta");
  inPalavra.classList.remove("oculta");
  flag = false;
});

salvar.addEventListener("click", () => {
  if (!(palavra.value.length > 8)) {
    if (validandoPalavra(palavra.value.toUpperCase())) {
      listaDePalavras.push(palavra.value.toUpperCase());
      inPalavra.classList.add("oculta");
      jogo.classList.remove("oculta");
      iniciarJogo();
      flag = true;
      footer.classList.add("footer");
    }
  } else {
    swal(
      "Palavra muito grande!",
      `A palavra deve ter no máximo 8 letras e a palavra informada tem ${palavra.value.length} letras.`,
      "warning"
    );
  }
});

cancelar.addEventListener("click", () => {
  inPalavra.classList.add("oculta");
  inicio.classList.remove("oculta");
  flag = false;
  footer.classList.remove("footer");
});

desistir.addEventListener("click", () => {
  jogo.classList.add("oculta");
  inicio.classList.remove("oculta");
  vencedor = false;
  flag = false;
  footer.classList.remove("footer");
});

novoJogo.addEventListener("click", () => {
  iniciarJogo();
  flag = true;
  location.reload();
});

window.addEventListener("keydown", (element) => {
  if (flag && validandoLetra(element.key) && contador < 9) {
    if (!listandoLetras.includes(element.key.toUpperCase())) {
      listandoLetras.push(element.key.toUpperCase());
      if (!mostarLetra(element.key.toUpperCase())) {
        criarBoneco(contador);
        contador++;
      }
    } else {
      swal(
        "Letra repetida!",
        `você informou "${element.key.toUpperCase()}" novamente`,
        "warning"
      );
    }
  } else if (contador >= 9) {
    derrota();
    swal(
      "Você perdeu!",
      `A palavra era: "${jogarPlv.join(
        ""
      )}", clique em novo jogo se você quiser jogar novamente.`,
      "info"
    );
  } else if (vencedor) {
    swal(
      "Você venceu!",
      "Clique em novo jogo se você quiser jogar novamente.",
      "success"
    );
  }
});

function criarBoneco(counter) {
  // Poste
  if (counter == 0) {
    pincel.moveTo(200, 285);
    pincel.lineTo(200, 50);
    pincel.stroke();
    counter++;
    return counter;
  } // Braço do poste
  else if (counter == 1) {
    pincel.moveTo(200, 50);
    pincel.lineTo(300, 50);
    pincel.stroke();
    counter++;
    return counter;
  } // Corda
  else if (counter == 2) {
    pincel.moveTo(300, 50);
    pincel.lineTo(300, 70);
    pincel.stroke();
    counter++;
    return counter;
  } // Cabeça
  else if (counter == 3) {
    pincel.beginPath();
    pincel.arc(300, 90, 20, 0, 2 * Math.PI);
    pincel.stroke();
    counter++;
    return counter;
  } // Corpo
  else if (counter == 4) {
    pincel.beginPath();
    pincel.moveTo(300, 110); // 160
    pincel.lineTo(300, 190); // 240
    pincel.stroke();
    counter++;
    return counter;
  } // Perna direita
  else if (counter == 5) {
    pincel.moveTo(300, 190);
    pincel.lineTo(270, 220); // 270
    pincel.stroke();
    counter++;
    return counter;
  } // Perna esquerda
  else if (counter == 6) {
    pincel.moveTo(300, 190); // 240
    pincel.lineTo(330, 220); // 270
    pincel.stroke();
    counter++;
    return counter;
  } // Braço direito
  else if (counter == 7) {
    pincel.moveTo(300, 130); // 180
    pincel.lineTo(270, 160); // 210
    pincel.stroke();
    counter++;
    return counter;
  } // Braço esquerdo
  else if (counter == 8) {
    pincel.moveTo(300, 130);
    pincel.lineTo(330, 160);
    pincel.stroke();
    counter++;
    derrota();
    swal(
      "Você perdeu!",
      `A palavra era: "${jogarPlv.join(
        ""
      )}", clique em novo jogo se você quiser jogar novamente.`,
      "error"
    );
    return counter;
  } else {
    return;
  }
}

function iniciarJogo() {
  pincel.lineWidth = 6;
  pincel.strokeStyle = "#0A3871";
  pincel.beginPath();
  pincel.moveTo(0, 0);
  pincel.moveTo(150, 300);
  pincel.lineTo(250, 300);
  pincel.stroke();

  contador = 0;
  contadorLetraError = 0;
  listandoLetras = [];
  vencedor = false;
  plvEmJogo = [];

  let numero = Math.floor(Math.random() * listaDePalavras.length);
  jogarPlv = listaDePalavras[numero].toUpperCase().split("");
  for (let i = 0; i < jogarPlv.length; i++) {
    pincel.moveTo(300 + 60 * i, 300);
    pincel.lineTo(350 + 60 * i, 300);
    pincel.stroke();
  }
}

function mostarLetra(letra) {
  let indicador = 0;
  for (let i = 0; i < jogarPlv.length; i++) {
    if (letra == jogarPlv[i] && jogarPlv.join("") != plvEmJogo.join("")) {
      pincel.beginPath();
      pincel.fillStyle = "#0A3871";
      pincel.font = "bold 50px 'Inter'";
      pincel.fillText(letra, 305 + 60 * i, 290);
      plvEmJogo[i] = jogarPlv[i];
      indicador++;
    }

    if (jogarPlv.join("") == plvEmJogo.join("")) {
      flag = false;
      vencedor = true;
      vitoria();
    }
  }
  if (indicador == 0) {
    pincel.beginPath();
    pincel.fillStyle = "#560309";
    pincel.font = "bold 50px 'Inter'";
    pincel.fillText(letra, 255 + 60 * contadorLetraError, 390);
    contadorLetraError++;
    return false;
  } else {
    return true;
  }
}

function validandoLetra(letraInserida) {
  const pattern = new RegExp("^[A-Z\u00d1]+$", "i");
  if (!pattern.test(letraInserida) || letraInserida.length > 1) {
    swal(
      "Somente letras!",
      `Você digitou "${letraInserida.toUpperCase()}", apenas letras são permitidas.`,
      "warning"
    );
    return false;
  } else {
    return true;
  }
}

function validandoPalavra(letraInserida) {
  const pattern = new RegExp("^[A-Z\u00d1]+$", "i");
  if (!pattern.test(letraInserida)) {
    swal(
      "Somente letras!",
      `Você digitou "${letraInserida.toUpperCase()}", apenas letras são permitidas.`,
      "warning"
    );
    return false;
  } else {
    return true;
  }
}

function vitoria() {
  pincel.beginPath();
  pincel.fillStyle = "green";
  pincel.font = "bold 40px 'Inter'";
  pincel.fillText("Você venceu. Parabéns!", 405, 80);
}

function derrota() {
  pincel.beginPath();
  pincel.fillStyle = "red";
  pincel.font = "bold 40px 'Inter'";
  pincel.fillText("Você perdeu. Fim de jogo!", 405, 100);
}
