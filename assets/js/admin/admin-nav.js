document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".admin-nav button");
  const sections = document.querySelectorAll(".admin-section");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      // remove active
      buttons.forEach(b => b.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      // ativa o selecionado
      btn.classList.add("active");
      const sectionId = btn.dataset.section;
      document.getElementById(sectionId).classList.add("active");
    });
  });

});
