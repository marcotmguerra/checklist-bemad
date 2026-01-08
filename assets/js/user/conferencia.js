document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".conferencia-container");
  const viaturaTitulo = document.querySelector(".viatura-info h2");
  const btnFinalizar = document.querySelector(".finalizacao button");

  const viaturaSelecionada = localStorage.getItem("viaturaSelecionada");
  const materiais = JSON.parse(localStorage.getItem("materiais")) || [];

  if (!viaturaSelecionada) {
    alert("Nenhuma viatura selecionada.");
    window.location.href = "home.html";
    return;
  }

  viaturaTitulo.innerText = `Viatura: ${viaturaSelecionada}`;

  const materiaisViatura = materiais.filter(
    m => m.viatura === viaturaSelecionada
  );

  if (materiaisViatura.length === 0) {
    alert("Nenhum material cadastrado para esta viatura.");
    return;
  }

  // Agrupa por compartimento
  const compartimentos = {};
  materiaisViatura.forEach(m => {
    if (!compartimentos[m.compartimento]) {
      compartimentos[m.compartimento] = [];
    }
    compartimentos[m.compartimento].push(m);
  });

  // Cria materiais
  Object.keys(compartimentos).forEach((nomeComp, iComp) => {

    const section = document.createElement("section");
    section.classList.add("compartimento");
    section.innerHTML = `<h3>Compartimento ${nomeComp}</h3>`;

    compartimentos[nomeComp].forEach((material, iMat) => {

      const article = document.createElement("article");
      article.classList.add("material-item");

      article.innerHTML = `
        <div class="material-header">
          <span class="material-nome">${material.nome}</span>
        </div>

        <div class="material-quantidade">
          <label>Quantidade</label>
          <span>${material.quantidade}</span>
        </div>

        <div class="material-status">
          <span>Item com alteração?</span>
          <label>
            <input type="radio" name="alt-${iComp}-${iMat}" value="nao"> Não
          </label>
          <label>
            <input type="radio" name="alt-${iComp}-${iMat}" value="sim"> Sim
          </label>
        </div>

        <div class="material-observacao">
          <textarea placeholder="Descreva a alteração encontrada"></textarea>
        </div>
      `;

      section.appendChild(article);
    });

    container.insertBefore(section, document.querySelector(".finalizacao"));
  });

  // Mostrar / ocultar observação
  document.querySelectorAll(".material-item").forEach(item => {
    const radios = item.querySelectorAll("input[type='radio']");
    const obs = item.querySelector(".material-observacao");
    const textarea = obs.querySelector("textarea");

    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        if (radio.value === "sim") {
          obs.style.display = "block";
          textarea.focus();
        } else {
          obs.style.display = "none";
          textarea.value = "";
        }
      });
    });
  });

  // Finalizar
  btnFinalizar.addEventListener("click", () => {

    for (let item of document.querySelectorAll(".material-item")) {
      const nome = item.querySelector(".material-nome").innerText;
      const radios = item.querySelectorAll("input[type='radio']");
      const textarea = item.querySelector("textarea");

      let marcado = false;
      let alteracao = null;

      radios.forEach(r => {
        if (r.checked) {
          marcado = true;
          alteracao = r.value;
        }
      });

      if (!marcado) {
        alert(`Informe se o material "${nome}" possui alteração.`);
        return;
      }

      if (alteracao === "sim" && textarea.value.trim() === "") {
        alert(`Descreva a alteração do material "${nome}".`);
        return;
      }
    }

    alert("✅ Conferência salva com sucesso!");
    window.location.href = "home.html";
  });

});
