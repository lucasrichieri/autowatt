/* ==========================================================================
   AUTOWATT ENGENHARIA - APP.JS
   Lógica da Interface, Modais, Filtros, FAQ, Navegação e WhatsApp Dispatcher
   ========================================================================== */

// Base de Dados Detalhada dos 11 Serviços Oferecidos pela AUTOWATT
const AUTOWATT_SERVICES_DATA = {
  "1": {
    title: "Instalações Elétricas Prediais e Residenciais",
    category: "eletrica",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    shortDesc: "Montagem, adequação e modernização de quadros de distribuição, fiação e circuitos protegidos.",
    fullDesc: "Execução completa e reforma de instalações elétricas para casas, condomínios e edifícios comerciais. Redimensionamento de cargas, balanceamento de fases, substituição de fiação antiga, instalação de Dispositivos DR (Diferencial Residual) para proteção contra choques e DPS (Dispositivo de Proteção contra Surtos) para blindar eletrodomésticos e eletrônicos contra raios e oscilações da rede.",
    standards: "Conforme ABNT NBR 5410 e NR-10",
    deliverables: [
      "Montagem e organização de Quadros de Distribuição (QGBT/QDC)",
      "Balanceamento de cargas e circuitos dedicados para ar-condicionado e chuveiros",
      "Instalação de DR e DPS conforme norma de segurança",
      "Emissão de ART (Anotação de Responsabilidade Técnica) por Engenheiro"
    ]
  },
  "2": {
    title: "Instalação de Carregadores para Veículos Elétricos (Wallbox)",
    category: "energia",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-2 3-2-3H5z"></path><path d="M19 8v6"></path><path d="M22 10v2"></path><circle cx="8" cy="12" r="2"></circle></svg>`,
    shortDesc: "Infraestrutura dedicada e certificada para recarga segura de veículos elétricos e híbridos.",
    fullDesc: "Projetos e instalações completas de estações de recarga lenta e semi-rápida (3.7 kW, 7.4 kW, 11 kW e 22 kW) para residências unifamiliares, condomínios residenciais e frotas corporativas. Dimensionamento do cabeamento com bitola adequada para operação contínua em potência máxima, quadro de proteção individual com DR Tipo B / A-EV e aterramento dedicado.",
    standards: "ABNT NBR 17019, NBR 5410 e recomendações das montadoras",
    deliverables: [
      "Vistoria técnica de viabilidade e medição de carga disponível",
      "Infraestrutura dedicada com eletrodutos galvanizados ou pesados",
      "Proteção com DR específico para corrente contínua residual",
      "Adequação para medição individualizada em vagas de garagem de condomínio"
    ]
  },
  "3": {
    title: "Sistemas Fotovoltaicos (Energia Solar)",
    category: "energia",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    shortDesc: "Projetos, homologação, instalação e manutenção de sistemas de energia solar com alta rentabilidade.",
    fullDesc: "Desenvolvimento de projetos solares fotovoltaicos completos on-grid e com armazenamento (híbridos). Engenharia de alto rendimento com seleção dos melhores módulos monocristalinos e inversores de última geração com monitoramento via aplicativo. Cuidamos de todo o processo burocrático de homologação junto à concessionária de energia até a troca do medidor bidirecional.",
    standards: "ABNT NBR 16690, NBR 16274 e Resolução Normativa ANEEL",
    deliverables: [
      "Estudo de sombreamento, geração estimada e dimensionamento personalizado",
      "Homologação completa junto à distribuidora de energia",
      "Montagem das estruturas com fixação estanque e segura",
      "Comissionamento, testes de string e ativação do monitoramento Wi-Fi"
    ]
  },
  "4": {
    title: "Laudos Elétricos e Relatórios Técnicos",
    category: "laudos",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    shortDesc: "Análises detalhadas, registros de conformidade e laudos conforme normas técnicas vigentes.",
    fullDesc: "Emissão de Laudos de Instalações Elétricas (LIE), Laudo de Aterramento e SPDA, e Relatórios de Conformidade para obtenção/renovação de AVCB (Corpo de Bombeiros), seguradoras e exigências municipais. Medições técnicas com instrumentos calibrados (megômetro, terrômetro e termovisor) para identificação de sobreaquecimentos e riscos de incêndio.",
    standards: "NR-10, ABNT NBR 5410, NBR 5419 e Instruções Técnicas do CBPMESP",
    deliverables: [
      "Inspeção minuciosa 'in loco' de todos os quadros e subestações",
      "Termografia infravermelha para detecção de conexões frouxas e sobrecargas",
      "Plano de ação com recomendações de correção de não conformidades",
      "Emissão de ART assinada por Engenheiro Eletricista habilitado no CREA"
    ]
  },
  "5": {
    title: "Projetos Elétricos",
    category: "eletrica",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    shortDesc: "Elaboração de projetos executivos em baixa e média tensão com diagramas unifilares e memoriais.",
    fullDesc: "Desenvolvimento de projetos elétricos inteligentes, dimensionados para atender as necessidades atuais e futuras de sua edificação ou planta fabril. Inclui planta baixa detalhada, diagramas unifilares e trifilares, cálculo luminotécnico, dimensionamento de condutores e barramentos, e especificação técnica rigorosa de materiais para evitar desperdícios.",
    standards: "ABNT NBR 5410, NBR 5413, NBR 14039",
    deliverables: [
      "Pranchas em AutoCAD/BIM com plantas baixas de iluminação e tomadas",
      "Diagramas unifilares com identificação de circuitos e proteções",
      "Memorial descritivo e lista quantitativa de materiais para compras",
      "ART de Projeto registrada no CREA"
    ]
  },
  "6": {
    title: "Perícias e Pareceres Técnicos",
    category: "laudos",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>`,
    shortDesc: "Avaliações imparciais e técnicas para segurança, sinistros, processos judiciais e conformidade.",
    fullDesc: "Atuação como perito técnico e assistente técnico em avaliações de acidentes de origem elétrica, queima de máquinas industriais, sinistros por sobretensão, curtos-circuitos e disputas contratuais. Elaboração de pareceres técnicos fundamentados na ciência da engenharia e na física aplicada com rigor metodológico.",
    standards: "ABNT NBR 13752 (Perícias de engenharia na construção civil) e Código de Processo Civil",
    deliverables: [
      "Investigação de causa raiz de queimas de equipamentos e falhas elétricas",
      "Elaboração de laudo pericial circunstanciado e ilustrado fotograficamente",
      "Formulação e resposta a quesitos técnicos",
      "Parecer de engenharia com fé pública e registro no CREA"
    ]
  },
  "7": {
    title: "Instalações Elétricas Industriais",
    category: "automacao",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20"></path><path d="M5 20V8l5 4V4l9 7v9"></path><path d="M9 20v-4h6v4"></path></svg>`,
    shortDesc: "Infraestrutura robusta de força e controle para plantas industriais e ambientes severos.",
    fullDesc: "Montagem de leitos de cabos, eletrocalhas perfiladas, alimentadores de máquinas, quadros de distribuição de força (QDF) e centros de controle de motores (CCM). Dimensionamento para resistir a ambientes industriais agressivos, vibração, poeira e alta demanda contínua de corrente com foco em zero paradas não planejadas.",
    standards: "NR-10, NR-12, ABNT NBR 5410, NBR 14039",
    deliverables: [
      "Instalação de eletrocalhas, perfilados e eletrodutos à prova de explosão/pesados",
      "Lançamento e conectorização de cabos de grande bitola",
      "Instalação e interligação de maquinários industriais e linhas de produção",
      "Testes de isolação e continuidade antes do comissionamento"
    ]
  },
  "8": {
    title: "Comandos Elétricos",
    category: "automacao",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>`,
    shortDesc: "Montagem e reforma de painéis de partida direta, estrela-triângulo, soft-starters e inversores.",
    fullDesc: "Projeto, montagem de painéis elétricos industriais com fiação anilhada, canaletas de alta densidade, contatores, relés térmicos, temporizadores e sinalizadores. Soluções customizadas para partida de motores elétricos, sistemas de bombeamento, compressores, esteiras transportadoras e sistemas de exaustão.",
    standards: "ABNT NBR IEC 61439 (Conjuntos de manobra e comando de baixa tensão)",
    deliverables: [
      "Montagem interna de painéis com padrão estético e técnico impecável",
      "Esquema elétrico unifilar e multifilar atualizado na porta do painel",
      "Testes de bancada e validação de todas as proteções térmicas",
      "Adequação de circuitos de comando para tensão de segurança (24Vcc)"
    ]
  },
  "9": {
    title: "Automação Industrial",
    category: "automacao",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>`,
    shortDesc: "Parametrização de inversores, integração de CLP, IHM, sensores e aumento de produtividade.",
    fullDesc: "Mais de 12 anos de experiência prática em chão de fábrica aplicada na automação de processos produtivos. Programação de Controladores Lógicos Programáveis (CLP), telas de interface homem-máquina (IHM), parametrização de inversores de frequência para controle preciso de velocidade e torque, e adequação de segurança de máquinas conforme a NR-12.",
    standards: "NR-12 (Segurança no Trabalho em Máquinas e Equipamentos), IEC 61131",
    deliverables: [
      "Programação de rotinas lógicas de controle e intertravamento de segurança",
      "Configuração de redes de comunicação industrial (Modbus, Profinet, Ethernet/IP)",
      "Parametrização e ajuste fino de inversores de frequência (WEG, Schneider, Siemens, etc.)",
      "Adequação de relés de segurança e cortinas de luz para NR-12"
    ]
  },
  "10": {
    title: "Manutenção Preventiva e Corretiva",
    category: "manutencao",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    shortDesc: "Diagnósticos rápidos, reaperto de conexões, termografia e recuperação de falhas críticas.",
    fullDesc: "Serviço ágil de manutenção em sistemas elétricos para evitar paradas inesperadas de equipamentos e prejuízos financeiros. Realizamos rotinas de manutenção preventiva com reaperto de barramentos com torquímetro, limpeza técnica desengraxante de quadros, inspeção visual, testes de isolamento e atendimento de emergência para diagnósticos corretivos complexos.",
    standards: "NBR 5410, NR-10 e boas práticas de engenharia de confiabilidade",
    deliverables: [
      "Relatório detalhado de manutenção com registros fotográficos 'Antes e Depois'",
      "Mapeamento termográfico com indicação de pontos quentes críticos",
      "Substituição preventiva de componentes com sinais de fadiga térmica",
      "Contratos mensais ou semestrais de manutenção preventiva para empresas e condomínios"
    ]
  },
  "11": {
    title: "Cursos, Palestras e Treinamentos Técnicos",
    category: "capacitacao",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><line x1="9" y1="7" x2="15" y2="7"></line><line x1="9" y1="11" x2="13" y2="11"></line></svg>`,
    shortDesc: "Capacitação que gera resultados: 'Conhecimento também é Segurança!' para sua equipe.",
    fullDesc: "Treinamentos in-company e palestras técnicas ministradas por Engenheiro Eletricista com experiência real de chão de fábrica e vivência como instrutor técnico. Abordagem prática e dinâmica voltada para equipes de manutenção, eletricistas prediais e gestores sobre segurança elétrica, leitura de diagramas, comandos e boas práticas de instalação.",
    standards: "Alinhado com exigências da NR-10, NR-12 e NBR 5410",
    deliverables: [
      "Material didático exclusivo em PDF e apostila de apoio",
      "Aulas com estudos de casos reais e demonstrações práticas",
      "Avaliação de assimilação de conteúdo",
      "Certificado de aproveitamento nominal para os participantes e para a empresa"
    ]
  }
};

// Inicialização Principal do Site
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initRevealAnimations();
  initServicesFilterAndModal();
  initSegmentsTabs();
  initFaqAccordion();
  initBairrosHub();
  initContactForm();
  initLgpdBanner();
});

/* ==========================================================================
   NAVEGAÇÃO E NAVBAR STICKY
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('mainHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle do menu mobile
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Fechar ao clicar em link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Active Link Observer
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   ANIMAÇÕES DE REVEAL NO SCROLL
   ========================================================================== */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   FILTROS DE SERVIÇOS E MODAIS TÉCNICOS
   ========================================================================== */
function initServicesFilterAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const modalOverlay = document.getElementById('serviceModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalServiceTitle = document.getElementById('modalServiceTitle');
  const modalServiceBadge = document.getElementById('modalServiceBadge');
  const modalServiceDesc = document.getElementById('modalServiceDesc');
  const modalDeliverablesList = document.getElementById('modalDeliverablesList');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  // Filtros de Categoria
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Abertura do Modal de Serviço
  window.openServiceModal = function(serviceId) {
    const data = AUTOWATT_SERVICES_DATA[serviceId];
    if (!data || !modalOverlay) return;

    if (modalServiceTitle) modalServiceTitle.textContent = data.title;
    if (modalServiceBadge) modalServiceBadge.textContent = data.standards;
    if (modalServiceDesc) modalServiceDesc.textContent = data.fullDesc;

    if (modalDeliverablesList) {
      modalDeliverablesList.innerHTML = '';
      data.deliverables.forEach(item => {
        const li = document.createElement('li');
        li.className = 'segment-benefit-item';
        li.style.marginBottom = '10px';
        li.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--color-accent-orange);flex-shrink:0;margin-top:2px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="font-size:0.92rem;color:var(--color-text-dark);">${item}</span>
        `;
        modalDeliverablesList.appendChild(li);
      });
    }

    if (modalWhatsappBtn) {
      const msg = encodeURIComponent(
        `Olá! Gostaria de um orçamento e mais informações sobre o serviço de "${data.title}" da AUTOWATT.`
      );
      modalWhatsappBtn.href = `https://wa.me/5511999979880?text=${msg}`;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Fechamento do Modal
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   ABAS DE SOLUÇÕES POR SEGMENTO (RESIDENCIAL / PREDIAL / INDUSTRIAL)
   ========================================================================== */
function initSegmentsTabs() {
  const tabBtns = document.querySelectorAll('.segment-tab-btn');
  const panes = document.querySelectorAll('.segment-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-segment');

      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`segment-${targetId}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   FAQ EM ACORDEÃO
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Fechar todos
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Se não estava ativo, abre
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 30 + "px";
      }
    });
  });
}

/* ==========================================================================
   FORMULÁRIO DE CONTATO COM ENVIO ESTRUTURADO PARA O WHATSAPP
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const service = document.getElementById('formService').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !phone || !service) {
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.backgroundColor = '#FEE2E2';
        formFeedback.style.color = '#B91C1C';
        formFeedback.innerHTML = 'Por favor, preencha os campos obrigatórios (Nome, Telefone e Serviço).';
      }
      return;
    }

    // Montar mensagem para o WhatsApp oficial da AUTOWATT (+55 11 99997-9880)
    const formattedText = 
      `*NOVO PEDIDO DE ORÇAMENTO - SITE AUTOWATT*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📞 *Telefone/WhatsApp:* ${phone}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}\n` +
      `⚡ *Serviço de Interesse:* ${service}\n\n` +
      `📝 *Detalhes da Solicitação:*\n${message || 'Gostaria de agendar uma visita técnica / receber proposta comercial.'}`;

    const waUrl = `https://wa.me/5511999979880?text=${encodeURIComponent(formattedText)}`;

    if (formFeedback) {
      formFeedback.style.display = 'block';
      formFeedback.style.backgroundColor = '#DCFCE7';
      formFeedback.style.color = '#15803D';
      formFeedback.innerHTML = '<strong>Solicitação gerada com sucesso!</strong> Redirecionando para o WhatsApp da AUTOWATT para atendimento prioritário...';
    }

    // Redireciona para o WhatsApp após breve feedback visual
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 800);
  });
}

/* ==========================================================================
   AVISO DE PRIVACIDADE E COOKIES (LGPD)
   ========================================================================== */
function initLgpdBanner() {
  const banner = document.getElementById('lgpdBanner');
  const acceptBtn = document.getElementById('lgpdAcceptBtn');

  if (!banner || !acceptBtn) return;

  const isAccepted = localStorage.getItem('autowatt_lgpd_accepted');
  if (!isAccepted) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 1500);
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('autowatt_lgpd_accepted', 'true');
    banner.classList.remove('show');
  });
}

/* ==========================================================================
   HUB DE BAIRROS DE SÃO PAULO (BUSCA & FILTRO POR ZONA)
   ========================================================================== */
function initBairrosHub() {
  const searchInput = document.getElementById('bairroSearchInput');
  const chipsContainer = document.getElementById('bairrosZoneChips');
  const grid = document.getElementById('bairrosCardsGrid');

  if (!grid) return;

  const cards = grid.querySelectorAll('.bairro-card-item');
  let currentZoneFilter = 'all';

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach(card => {
      const name = card.getAttribute('data-bairro') || '';
      const zone = card.getAttribute('data-zone') || '';

      const matchesQuery = !query || name.includes(query) || zone.toLowerCase().includes(query);
      const matchesZone = currentZoneFilter === 'all' || zone === currentZoneFilter;

      if (matchesQuery && matchesZone) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  if (chipsContainer) {
    const chips = chipsContainer.querySelectorAll('.zone-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentZoneFilter = chip.getAttribute('data-filter') || 'all';
        filterCards();
      });
    });
  }
}

