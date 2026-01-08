document.addEventListener("DOMContentLoaded", () => {

  /**
   * Estrutura esperada no localStorage:
   * user = {
   *   nome: "João Silva",
   *   role: "user" | "admin",
   *   autorizado: true | false
   * }
   */

  const userStorage = localStorage.getItem("user");

  // Usuário não logado
  if (!userStorage) {
    window.location.href = "index.html";
    return;
  }

  const user = JSON.parse(userStorage);

  // Usuário não autorizado
  if (!user.autorizado) {
    alert("⏳ Seu acesso ainda não foi autorizado pelo administrador.");
    localStorage.removeItem("user");
    window.location.href = "index.html";
    return;
  }

  const paginaAtual = window.location.pathname;

  // Proteção de rota ADMIN
  if (paginaAtual.includes("admin.html") && user.role !== "admin") {
    alert("⛔ Acesso restrito ao administrador.");
    window.location.href = "home.html";
    return;
  }

  // Proteção: admin não usa páginas de usuário
  if (
    (paginaAtual.includes("home.html") ||
     paginaAtual.includes("conferencia.html")) &&
    user.role === "admin"
  ) {
    window.location.href = "admin.html";
    return;
  }

  // Preencher nome do usuário, se existir no layout
  const nomeUsuario = document.querySelector(".user-name");
  if (nomeUsuario) {
    nomeUsuario.innerText = user.nome;
  }

  // Logout
  const btnLogout = document.querySelector(".btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }

});
