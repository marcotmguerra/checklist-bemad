document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#viaturas .admin-form");
  const lista = document.querySelector("#viaturas .admin-list");

  if (!form || !lista) return;

  let viaturas = JSON.parse(localStorage.getItem("viaturas")) || [];

  function renderViaturas() {
    lista.innerHTML = "";

    if (viaturas.length === 0) {
      lista.innerHTML = "<p>Nenhuma viatura cadastrada.</p>";
      return;
    }

    viaturas.forEach((v, index) => {
      const div = document.createElement("article");
      div.innerHTML = `
        <p><strong>${v.nome}</strong> - ${v.tipo}</p>
        <button class="btn-danger" data-index="${index}">Remover</button>
      `;
      lista.appendChild(div);
    });

    // Remover
    lista.querySelectorAll(".btn-danger").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        viaturas.splice(index, 1);
        salvar();
      });
    });
  }

  function salvar() {
    localStorage.setItem("viaturas", JSON.stringify(viaturas));
    renderViaturas();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    const nome = inputs[0].value.trim();
    const tipo = inputs[1].value.trim();

    if (!nome || !tipo) {
      alert("Preencha todos os campos.");
      return;
    }

    viaturas.push({ nome, tipo });
    form.reset();
    salvar();
  });

  renderViaturas();
});
