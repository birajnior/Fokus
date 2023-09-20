const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnDescansoCurto = document.querySelector(".app__card-button--curto");
const btnDescansoLongo = document.querySelector(".app__card-button--longo");
const btnPlay = document.querySelector(".app__card-primary-button");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");

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

btnPlay.addEventListener("click", () => {});