AOS.init({
  duration: 1500,
  once: true,
});
const banner2 = document.querySelector(".app__image-figure");

const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnDescansoCurto = document.querySelector(".app__card-button--curto");
const btnDescansoLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const tempoNaTela = document.querySelector("#timer");
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

let tempoDecorridoEmSegundos = 1500;
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
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  switch (contexto) {
    case "foco":
      title.innerHTML = `<h1  data-aos="fade-right">Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong></h1>`;
      banner2.innerHTML = `<img class="app__image" src="/imagens/${contexto}.png" alt="" data-aos="fade-up">`;
      break;
    case "descanso-curto":
      title.innerHTML = `<h1  data-aos="fade-down-right">Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong></h1>`;
      banner2.innerHTML = `<img class="app__image" src="/imagens/${contexto}.png" alt="" data-aos="fade-left">`;
      break;
    case "descanso-longo":
      title.innerHTML = `<h1  data-aos="flip-left">Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong></h1>`;
      banner2.innerHTML = `<img class="app__image" src="/imagens/${contexto}.png" alt="" data-aos="flip-right">`;
      break;
    default:
      break;
  }
}

btnFoco.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarCor("foco");
  btnFoco.classList.add("active");
});

btnDescansoCurto.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarCor("descanso-curto");
  btnDescansoCurto.classList.add("active");
});

btnDescansoLongo.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarCor("descanso-longo");
  btnDescansoLongo.classList.add("active");
});

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    tempoFinalizado.play();
    alert("Tempo finalizado!");
    const focoAtivo = html.getAttribute('data-contexto') == 'foco'
    if (focoAtivo) {
      const evento = new CustomEvent('FocoFinalizado')
      document.dispatchEvent(evento)
    }
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
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

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
