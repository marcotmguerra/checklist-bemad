document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#materiais .admin-form");
  const lista = document.querySelector("#materiais .admin-list");
  const selectViatura = form.querySelector("select");

  if (!form || !lista || !selectViatura) return;

  let viaturas = JSON.parse(localStorage.getItem("viaturas")) || [];
  let materiais = JSON.parse(localStorage.getItem("materiais")) || [];

  // Preenche select de viaturas
  function carregarViaturas() {
    selectViatura.innerHTML = `<option value="">Selecione a viatura</option>`;
    viaturas.forEach(v => {
      const option = document.createElement("option");
      option.value = v.nome;
      option.textContent = v.nome;
      selectViatura.appendChild(option);
    });
  }

  function renderMateriais() {
    lista.innerHTML = "";

    if (materiais.length === 0) {
      lista.innerHTML = "<p>Nenhum material cadastrado.</p>";
      return;
    }

    materiais.forEach((m, index) => {
      const div = document.createElement("article");
      div.innerHTML = `
        <p><strong>${m.nome}</strong></p>
        <p>Viatura: ${m.viatura}</p>
        <p>Quantidade: ${m.quantidade}</p>
        <p>Compartimento: ${m.compartimento}</p>
        <button class="btn-danger" data-index="${index}">Remover</button>
      `;
      lista.appendChild(div);
    });

    lista.querySelectorAll(".btn-danger").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        materiais.splice(index, 1);
        salvar();
      });
    });
  }

  function salvar() {
    localStorage.setItem("materiais", JSON.stringify(materiais));
    renderMateriais();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const viatura = selectViatura.value;
    const inputs = form.querySelectorAll("input");

    const nome = inputs[0].value.trim();
    const quantidade = inputs[1].value;
    const compartimento = inputs[2].value.trim();

    if (!viatura || !nome || !quantidade || !compartimento) {
      alert("Preencha todos os campos.");
      return;
    }

    materiais.push({
      viatura,
      nome,
      quantidade,
      compartimento
    });

    form.reset();
    salvar();
  });

  carregarViaturas();
  renderMateriais();
});
