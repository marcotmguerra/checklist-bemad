document.addEventListener("DOMContentLoaded", () => {

  console.log("HOME JS CARREGADO");

  const botoes = document.querySelectorAll(".viatura-card button");

  if (botoes.length === 0) {
    console.warn("Nenhuma viatura encontrada na tela.");
    return;
  }

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {

      const card = botao.closest(".viatura-card");
      const nomeViatura = card.querySelector("h3").innerText;

      // Salva viatura escolhida
      localStorage.setItem("viaturaSelecionada", nomeViatura);

      // Vai para a conferência
      window.location.href = "conferencia.html";
    });
  });

});
