import { supabase } from "../supabase.js";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("cadastroForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!nome || !email || !password || !confirmPassword) {
      alert("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não conferem.");
      return;
    }

    // 1️⃣ Cria usuário no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 2️⃣ Cria registro na tabela usuarios
    const { error: insertError } = await supabase
      .from("usuarios")
      .insert({
        nome,
        email,
        role: "user",
        autorizado: false
      });

    if (insertError) {
      alert("Erro ao criar usuário no sistema.");
      return;
    }

    alert(
      "✅ Cadastro realizado com sucesso!\n\n" +
      "Seu acesso ficará disponível após autorização do administrador."
    );

    // Garante logout
    await supabase.auth.signOut();

    window.location.href = "index.html";
  });

});
