document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector("#conferencias .admin-list");
  if (!container) return;

  const conferencias = JSON.parse(
    localStorage.getItem("conferencias")
  ) || [];

  function renderConferencias() {
    container.innerHTML = "";

    if (conferencias.length === 0) {
      container.innerHTML = "<p>Nenhuma conferência registrada.</p>";
      return;
    }

    conferencias.forEach((conf, index) => {
      const article = document.createElement("article");
      article.classList.add("conferencia-item");

      article.innerHTML = `
        <p><strong>Viatura:</strong> ${conf.viatura}</p>
        <p><strong>Usuário:</strong> ${conf.usuario}</p>
        <p><strong>Data:</strong> ${conf.data}</p>
        <button class="btn-secondary" data-index="${index}">
          Visualizar
        </button>
      `;

      container.appendChild(article);
    });

    container.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        visualizarConferencia(index);
      });
    });
  }

  function visualizarConferencia(index) {
    localStorage.setItem(
      "conferenciaSelecionada",
      JSON.stringify(conferencias[index])
    );
    window.location.href = "admin-conferencia.html";
  }

  renderConferencias();
});
