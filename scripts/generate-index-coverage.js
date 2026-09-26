// ==========================================================================
// AUTOWATT ENGENHARIA - INTEGRADOR DE MAPA E BAIRROS NO INDEX.HTML
// ==========================================================================

const fs = require('fs');
const path = require('path');

const BAIRROS_DATA = [
  { name: 'Água Rasa', slug: 'agua-rasa', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Alto de Pinheiros', slug: 'alto-de-pinheiros', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Anhanguera', slug: 'anhanguera', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Aricanduva', slug: 'aricanduva', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Artur Alvim', slug: 'artur-alvim', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Barra Funda', slug: 'barra-funda', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Bela Vista', slug: 'bela-vista', zone: 'Centro', region: 'Centro' },
  { name: 'Belém', slug: 'belem', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Bom Retiro', slug: 'bom-retiro', zone: 'Centro', region: 'Centro' },
  { name: 'Brasilândia', slug: 'brasilandia', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Butantã', slug: 'butanta', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Cachoeirinha', slug: 'cachoeirinha', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Cambuci', slug: 'cambuci', zone: 'Centro', region: 'Centro' },
  { name: 'Campo Belo', slug: 'campo-belo', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Campo Grande', slug: 'campo-grande', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Campo Limpo', slug: 'campo-limpo', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Cangaíba', slug: 'cangaiba', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Capão Redondo', slug: 'capao-redondo', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Carrão', slug: 'carrao', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Casa Verde', slug: 'casa-verde', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Cidade Ademar', slug: 'cidade-ademar', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Cidade Dutra', slug: 'cidade-dutra', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Cidade Líder', slug: 'cidade-lider', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Cidade Tiradentes', slug: 'cidade-tiradentes', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Consolação', slug: 'consolacao', zone: 'Centro', region: 'Centro' },
  { name: 'Cursino', slug: 'cursino', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Ermelino Matarazzo', slug: 'ermelino-matarazzo', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Freguesia do Ó', slug: 'freguesia-do-o', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Grajaú', slug: 'grajau', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Guaianases', slug: 'guaianases', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Iguatemi', slug: 'iguatemi', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Ipiranga', slug: 'ipiranga', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Itaim Bibi', slug: 'itaim-bibi', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Itaim Paulista', slug: 'itaim-paulista', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Itaquera', slug: 'itaquera', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Jabaquara', slug: 'jabaquara', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Jaçanã', slug: 'jacana', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Jaguara', slug: 'jaguara', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Jaguaré', slug: 'jaguare', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Jaraguá', slug: 'jaragua', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Jardim Ângela', slug: 'jardim-angela', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Jardim Helena', slug: 'jardim-helena', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Jardim Paulista', slug: 'jardim-paulista', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Jardim São Luís', slug: 'jardim-sao-luis', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Lapa', slug: 'lapa', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Liberdade', slug: 'liberdade', zone: 'Centro', region: 'Centro' },
  { name: 'Limão', slug: 'limao', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Mandaqui', slug: 'mandaqui', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Marsilac', slug: 'marsilac', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Moema', slug: 'moema', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Mooca', slug: 'mooca', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Morumbi', slug: 'morumbi', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Parelheiros', slug: 'parelheiros', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Pari', slug: 'pari', zone: 'Centro', region: 'Centro' },
  { name: 'Parque do Carmo', slug: 'parque-do-carmo', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Penha', slug: 'penha', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Perdizes', slug: 'perdizes', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Pinheiros', slug: 'pinheiros', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Ponte Rasa', slug: 'ponte-rasa', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Raposo Tavares', slug: 'raposo-tavares', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'República', slug: 'republica', zone: 'Centro', region: 'Centro' },
  { name: 'Rio Pequeno', slug: 'rio-pequeno', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Sacomã', slug: 'sacoma', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Santa Cecília', slug: 'santa-cecilia', zone: 'Centro', region: 'Centro' },
  { name: 'Santana', slug: 'santana', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Santo Amaro', slug: 'santo-amaro', zone: 'Zona Sul', region: 'Sul' },
  { name: 'São Domingos', slug: 'sao-domingos', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'São Lucas', slug: 'sao-lucas', zone: 'Zona Leste', region: 'Leste' },
  { name: 'São Mateus', slug: 'sao-mateus', zone: 'Zona Leste', region: 'Leste' },
  { name: 'São Miguel Paulista', slug: 'sao-miguel-paulista', zone: 'Zona Leste', region: 'Leste' },
  { name: 'São Rafael', slug: 'sao-rafael', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Sapopemba', slug: 'sapopemba', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Saúde', slug: 'saude', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Sé', slug: 'se', zone: 'Centro', region: 'Centro' },
  { name: 'Tatuapé', slug: 'tatuape', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Tremembé', slug: 'tremembe', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Tucuruvi', slug: 'tucuruvi', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Vila Andrade', slug: 'vila-andrade', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Vila Curuçá', slug: 'vila-curuca', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Vila Formosa', slug: 'vila-formosa', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Vila Guilherme', slug: 'vila-guilherme', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Vila Jacuí', slug: 'vila-jacui', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Vila Leopoldina', slug: 'vila-leopoldina', zone: 'Zona Oeste', region: 'Oeste' },
  { name: 'Vila Maria', slug: 'vila-maria', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Vila Mariana', slug: 'vila-mariana', zone: 'Zona Sul', region: 'Sul' },
  { name: 'Vila Matilde', slug: 'vila-matilde', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Vila Medeiros', slug: 'vila-medeiros', zone: 'Zona Norte', region: 'Norte' },
  { name: 'Vila Prudente', slug: 'vila-prudente', zone: 'Zona Leste', region: 'Leste' },
  { name: 'Vila Sônia', slug: 'vila-sonia', zone: 'Zona Oeste', region: 'Oeste' }
];

// Zone counts
const zoneCounts = {
  'Todos': BAIRROS_DATA.length,
  'Zona Sul': BAIRROS_DATA.filter(b => b.zone === 'Zona Sul').length,
  'Zona Leste': BAIRROS_DATA.filter(b => b.zone === 'Zona Leste').length,
  'Zona Oeste': BAIRROS_DATA.filter(b => b.zone === 'Zona Oeste').length,
  'Zona Norte': BAIRROS_DATA.filter(b => b.zone === 'Zona Norte').length,
  'Centro': BAIRROS_DATA.filter(b => b.zone === 'Centro').length
};

const cardsHTML = BAIRROS_DATA.map(b => {
  const encodedWhatsapp = encodeURIComponent(`Olá! Vim pelo site da AUTOWATT e gostaria de um orçamento para o bairro ${b.name} - São Paulo.`);
  return `
          <div class="bairro-card-item" data-bairro="${b.name.toLowerCase()}" data-zone="${b.zone}">
            <div class="bairro-card-top">
              <span class="bairro-name-text">${b.name}</span>
              <span class="bairro-zone-badge-sm">${b.zone}</span>
            </div>
            <div class="bairro-card-links">
              <a href="bairros/${b.slug}.html#eletrica" class="bairro-service-link" title="Empresa de Elétrica em ${b.name}">
                <span>⚡ Empresa de Elétrica</span>
                <span class="bairro-link-arrow">&rarr;</span>
              </a>
              <a href="bairros/${b.slug}.html#carregadores" class="bairro-service-link link-orange" title="Carregadores Elétricos Wallbox em ${b.name}">
                <span>🔋 Carregadores Elétricos</span>
                <span class="bairro-link-arrow">&rarr;</span>
              </a>
            </div>
          </div>`;
}).join('\n');

const coverageSectionHTML = `
  <!-- ==========================================================================
       LOCALIZAÇÃO NO GOOGLE MAPS & REDE DE ATENDIMENTO (TODOS OS BAIRROS DE SP)
       ========================================================================== -->
  <section class="section section-coverage" id="mapa-cobertura">
    <div class="container">
      <div class="section-header">
        <span class="section-badge badge-orange">📍 Localização &amp; Cobertura</span>
        <h2 class="section-title">Google Maps &amp; <span class="highlight">Bairros Atendidos</span> em São Paulo</h2>
        <p class="section-subtitle">
          Atendimento presencial com engenheiro credenciado no CREA em todos os <strong>89 bairros e distritos da Capital Paulista</strong> e Grande São Paulo para projetos elétricos, instalações e carregadores Wallbox.
        </p>
      </div>

      <!-- Grid Principal: Google Maps + Card de Destaques -->
      <div class="coverage-main-grid reveal-on-scroll">
        <!-- Frame Interativo do Google Maps -->
        <div class="map-wrapper">
          <div class="map-header-bar">
            <div class="map-header-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>São Paulo - SP &amp; Região Metropolitana</span>
            </div>
            <div class="map-status-live">
              <span class="map-status-dot"></span>
              <span>Atendimento Ativo</span>
            </div>
          </div>
          <div class="map-iframe-container">
            <iframe
              title="Google Maps - Área de Atendimento AUTOWATT Engenharia São Paulo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.395460599!2d-46.92496307137024!3d-23.68153147573512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="380"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

        <!-- Card de Destaques de Atendimento -->
        <div class="coverage-highlights-card">
          <div>
            <span class="coverage-stat-badge">⚡ 89 Bairros Atendidos</span>
            <h3 class="coverage-title">Presença Técnica em Toda a Capital Paulista</h3>
            <p style="font-size:0.92rem; color:#CBD5E1; line-height:1.6;">
              Seja para um condomínio residencial em Moema ou Pinheiros, um comércio no Tatuapé ou Santana, ou uma indústria na Lapa ou Mooca, enviamos equipe técnica com agilidade e total responsabilidade técnica (ART).
            </p>

            <div class="coverage-list-pills">
              <div class="coverage-pill-item">
                <div class="coverage-pill-icon">✓</div>
                <div><strong>Empresa de Elétrica:</strong> Projetos com ART, quadros QGBT, reformas e laudos NR-10 / NBR 5410.</div>
              </div>
              <div class="coverage-pill-item">
                <div class="coverage-pill-icon">✓</div>
                <div><strong>Carregadores Elétricos:</strong> Estações Wallbox residenciais e medição individualizada em condomínios.</div>
              </div>
              <div class="coverage-pill-item">
                <div class="coverage-pill-icon">✓</div>
                <div><strong>Visita Técnica Presencial:</strong> Vistoria e diagnóstico in loco em qualquer região da cidade.</div>
              </div>
            </div>
          </div>

          <a href="https://wa.me/5511999979880?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20a%20disponibilidade%20de%20visita%20t%C3%A9cnica%20no%20meu%20bairro%20em%20S%C3%A3o%20Paulo." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.029-.489-1.637-.674-2.709-2.348-2.791-2.459-.082-.111-.663-.882-.663-1.682 0-.8.419-1.194.568-1.357.149-.163.325-.204.433-.204.108 0 .217.001.312.006.101.005.236-.039.369.28.138.332.471 1.149.512 1.233.041.084.068.182.012.293-.056.111-.084.18-.167.277-.083.097-.174.216-.249.29-.083.082-.17.172-.073.338.097.166.43 1.242 1.348 2.059.704.626 1.3.82 1.483.911.183.091.291.077.399-.047.108-.124.464-.539.589-.724.124-.185.249-.155.415-.093.166.062 1.054.497 1.235.587.181.09.302.135.347.211.045.076.045.441-.099.846zm-3.392-12.416c-5.514 0-10 4.486-10 10 0 1.761.458 3.42 1.258 4.869l-1.336 4.885 5.006-1.313c1.4.743 2.99 1.164 4.672 1.164 5.514 0 10-4.486 10-10s-4.486-10-10-10z"/></svg>
            Consultar Visita no Seu Bairro
          </a>
        </div>
      </div>

      <!-- Hub Interativo: Busca & Lista de Todos os 89 Bairros -->
      <div class="bairros-hub-container reveal-on-scroll delay-1">
        <div class="bairros-hub-header">
          <div class="bairros-hub-intro">
            <h3>Selecione seu Bairro em São Paulo</h3>
            <p>Clique no serviço desejado para ver a página dedicada ou solicitar atendimento:</p>
          </div>

          <div class="bairro-search-box">
            <svg class="bairro-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="bairroSearchInput" class="bairro-search-input" placeholder="Buscar bairro (ex: Moema, Tatuapé, Pinheiros, Santana...)">
          </div>
        </div>

        <!-- Filtro por Zona -->
        <div class="bairros-zone-chips" id="bairrosZoneChips">
          <button class="zone-chip active" data-filter="all">Todos <span class="count-badge">${zoneCounts['Todos']}</span></button>
          <button class="zone-chip" data-filter="Zona Sul">Zona Sul <span class="count-badge">${zoneCounts['Zona Sul']}</span></button>
          <button class="zone-chip" data-filter="Zona Leste">Zona Leste <span class="count-badge">${zoneCounts['Zona Leste']}</span></button>
          <button class="zone-chip" data-filter="Zona Oeste">Zona Oeste <span class="count-badge">${zoneCounts['Zona Oeste']}</span></button>
          <button class="zone-chip" data-filter="Zona Norte">Zona Norte <span class="count-badge">${zoneCounts['Zona Norte']}</span></button>
          <button class="zone-chip" data-filter="Centro">Centro <span class="count-badge">${zoneCounts['Centro']}</span></button>
        </div>

        <!-- Grid de Todos os Bairros -->
        <div class="bairros-cards-grid" id="bairrosCardsGrid">
${cardsHTML}
        </div>
      </div>
    </div>
  </section>
`;

// Footer zones directory
const zones = ['Zona Sul', 'Zona Oeste', 'Zona Leste', 'Zona Norte', 'Centro'];
const footerZonesHTML = `
      <!-- Diretório Completo de Bairros de São Paulo (Local SEO) -->
      <div class="footer-bairros-section">
        <div class="footer-bairros-title">
          ⚡ Bairros Atendidos em São Paulo - Empresa de Elétrica &amp; Carregadores Wallbox
        </div>
        <div class="footer-bairros-grid">
${zones.map(z => {
  const bList = BAIRROS_DATA.filter(b => b.zone === z);
  return `          <div class="footer-zone-col">
            <h5>${z}</h5>
            <div class="footer-zone-links">
${bList.map(b => `              <a href="bairros/${b.slug}.html" title="Elétrica e Carregadores em ${b.name}">${b.name}</a>`).join('\n')}
            </div>
          </div>`;
}).join('\n')}
        </div>
      </div>
`;

// Read index.html and insert the new sections
const indexPath = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// 1. Add nav link if not present
if (!indexContent.includes('href="#mapa-cobertura"')) {
  indexContent = indexContent.replace(
    '<a href="#contato" class="nav-link">Contato</a>',
    '<a href="#mapa-cobertura" class="nav-link">Cobertura SP</a>\n        <a href="#contato" class="nav-link">Contato</a>'
  );
}

// 2. Insert coverage section before contact section
if (!indexContent.includes('id="mapa-cobertura"')) {
  indexContent = indexContent.replace(
    '<!-- ==========================================================================\n       15. FORMULÁRIO DE CONTATO E ORÇAMENTO',
    `${coverageSectionHTML}\n  <!-- ==========================================================================\n       15. FORMULÁRIO DE CONTATO E ORÇAMENTO`
  );
}

// 3. Insert footer bairros directory before footer bottom
if (!indexContent.includes('footer-bairros-section')) {
  indexContent = indexContent.replace(
    '<div class="footer-bottom">',
    `${footerZonesHTML}\n      <div class="footer-bottom">`
  );
}

fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('✅ index.html atualizado com sucesso com Google Maps e 89 Bairros!');
