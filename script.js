(function () {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  const year = document.getElementById('year');
  const leadForm = document.getElementById('leadForm');

  if (year) year.textContent = String(new Date().getFullYear());

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when clicking a link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });

    // Close when pressing ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Form -> WhatsApp message (no backend required)
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(leadForm);
      const nome = String(data.get('nome') || '').trim();
      const tel = String(data.get('telefone') || '').trim();
      const email = String(data.get('email') || '').trim();
      const servico = String(data.get('servico') || '').trim();
      const regiao = String(data.get('regiao') || '').trim();
      const mensagem = String(data.get('mensagem') || '').trim();

      const parts = [
        "Olá, gostaria de solicitar proposta/agendar.",
        `Nome: ${nome}`,
        `Telefone/WhatsApp: ${tel}`,
        `E-mail: ${email}`,
        `Serviço: ${servico}`,
        `Região: ${regiao}`,
        `Resumo: ${mensagem}`
      ];

      const text = encodeURIComponent(parts.join("\n"));
      const url = `https://wa.me/5561981643746?text=${text}`;

      window.open(url, "_blank", "noopener");
    });
  }
})();