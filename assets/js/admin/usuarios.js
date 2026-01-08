document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector("#usuarios .admin-list");

  if (!container) return;

  let usuariosPendentes = JSON.parse(
    localStorage.getItem("usuariosPendentes")
  ) || [];

  function renderUsuarios() {
    container.innerHTML = "";

    if (usuariosPendentes.length === 0) {
      container.innerHTML = "<p>Nenhum usuário pendente.</p>";
      return;
    }

    usuariosPendentes.forEach((usuario, index) => {
      const article = document.createElement("article");
      article.classList.add("usuario-item");

      article.innerHTML = `
        <p><strong>${usuario.nome}</strong></p>
        <p>${usuario.email}</p>
        <span>Status: Pendente</span>
        <div class="acoes">
          <button class="btn-primary" data-action="autorizar" data-index="${index}">
            Autorizar
          </button>
          <button class="btn-danger" data-action="remover" data-index="${index}">
            Remover
          </button>
        </div>
      `;

      container.appendChild(article);
    });

    // Ações
    container.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const action = btn.dataset.action;

        if (action === "autorizar") {
          autorizarUsuario(index);
        }

        if (action === "remover") {
          removerUsuario(index);
        }
      });
    });
  }

  function autorizarUsuario(index) {
    const usuario = usuariosPendentes[index];

    usuario.autorizado = true;

    /**
     * Aqui, no Supabase:
     * - você apenas atualizaria o campo autorizado = true
     */

    alert(`✅ Usuário ${usuario.nome} autorizado com sucesso.`);

    usuariosPendentes.splice(index, 1);
    salvar();
  }

  function removerUsuario(index) {
    if (!confirm("Deseja realmente remover este usuário?")) return;

    usuariosPendentes.splice(index, 1);
    salvar();
  }

  function salvar() {
    localStorage.setItem(
      "usuariosPendentes",
      JSON.stringify(usuariosPendentes)
    );
    renderUsuarios();
  }

  renderUsuarios();
});
