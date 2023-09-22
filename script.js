const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnDescansoCurto = document.querySelector(".app__card-button--curto");
const btnDescansoLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const btnStartPause = document.querySelector(".app__card-primary-button");
const iniciarOuPausarBtIcone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
const playSom = new Audio("sons/play.wav");
const pauseSom = new Audio("sons/pause.mp3");
const tempoFinalizado = new Audio("sons/beep.mp3");

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

function alterarCor(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      title.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      title.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-long":
      title.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

btnFoco.addEventListener("click", () => {
  alterarCor("foco");
  btnFoco.classList.add("active");
});

btnDescansoCurto.addEventListener("click", () => {
  alterarCor("descanso-curto");
  btnDescansoCurto.classList.add("active");
});

btnDescansoLongo.addEventListener("click", () => {
  alterarCor("descanso-longo");
  btnDescansoLongo.classList.add("active");
});

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    tempoFinalizado.play();
    alert("Tempo finalizado!");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log("Temporizador: " + tempoDecorridoEmSegundos);
};

function iniciarOuPausar() {
  if (intervaloId) {
    pauseSom.play();
    zerar();
    return;
  }
  playSom.play();
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarBtIcone.setAttribute("src", `/imagens/pause.png`);
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarBtIcone.setAttribute("src", `/imagens/play_arrow.png`);
  intervaloId = null;
}

btnStartPause.addEventListener("click", iniciarOuPausar);
