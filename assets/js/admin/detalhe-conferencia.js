document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("dadosConferencia");
  const conferencia = JSON.parse(
    localStorage.getItem("conferenciaSelecionada")
  );

  if (!conferencia) {
    container.innerHTML = "<p>Conferência não encontrada.</p>";
    return;
  }

  let html = `
    <h2>Viatura: ${conferencia.viatura}</h2>
    <p><strong>Usuário:</strong> ${conferencia.usuario}</p>
    <p><strong>Data:</strong> ${conferencia.data}</p>
    <hr />
  `;

  conferencia.itens.forEach(item => {
    html += `
      <div class="material-item">
        <p><strong>${item.nome}</strong></p>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Alteração: ${item.alteracao === "sim" ? "SIM" : "NÃO"}</p>
        ${
          item.alteracao === "sim"
            ? `<p><strong>Obs:</strong> ${item.observacao}</p>`
            : ""
        }
      </div>
    `;
  });

  container.innerHTML = html;
});
