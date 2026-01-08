import { supabase } from "../supabase.js";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Preencha email e senha.");
      return;
    }

    // 1️⃣ Login no Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert("Email ou senha inválidos.");
      return;
    }

    const userAuth = data.user;

    // 2️⃣ Busca dados do usuário na tabela usuarios
    const { data: usuario, error: userError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", userAuth.email)
      .single();

    if (userError || !usuario) {
      alert("Usuário não encontrado no sistema.");
      await supabase.auth.signOut();
      return;
    }

    // 3️⃣ Verifica autorização
    if (!usuario.autorizado) {
      alert("⏳ Seu acesso ainda não foi autorizado.");
      await supabase.auth.signOut();
      return;
    }

    // 4️⃣ Salva sessão local (mantemos por enquanto)
    localStorage.setItem("user", JSON.stringify({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    }));

    // 5️⃣ Redireciona
    if (usuario.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "home.html";
    }
  });

});
