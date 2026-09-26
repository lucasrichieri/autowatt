// ==========================================================================
// AUTOWATT ENGENHARIA - ATUALIZADOR DE SEÇÃO DE COBERTURA DISCRETA & ELEGANTE
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

const zones = ['Zona Sul', 'Zona Oeste', 'Zona Leste', 'Zona Norte', 'Centro'];

// Gera o diretório de links agrupado por zona para o acordeão discreto
const zoneDirectoryHTML = zones.map(z => {
  const bairrosInZone = BAIRROS_DATA.filter(b => b.zone === z);
  return `
            <div class="discreet-zone-group">
              <h4 class="discreet-zone-title">${z} (${bairrosInZone.length})</h4>
              <ul class="discreet-bairros-list">
                ${bairrosInZone.map(b => `
                  <li>
                    <a href="bairros/${b.slug}.html" class="discreet-bairro-link" title="Serviços Elétricos e Carregadores em ${b.name}">
                      <span class="discreet-bairro-name">${b.name}</span>
                      <span class="discreet-bairro-tags">⚡ Elétrica &bull; 🔋 Wallbox</span>
                    </a>
                  </li>
                `).join('')}
              </ul>
            </div>`;
}).join('\n');

// Seção Discreta, Elegante e Funcional de Cobertura
const discreetCoverageHTML = `
  <!-- ==========================================================================
       LOCALIZAÇÃO & ÁREA DE ATENDIMENTO DISCRETA (SÃO PAULO E GRANDE SP)
       ========================================================================== -->
  <section class="section section-coverage-discreet" id="mapa-cobertura">
    <div class="container">
      <div class="discreet-coverage-card reveal-on-scroll">
        <div class="discreet-coverage-grid">
          <!-- Coluna 1: Informações de Cobertura e Busca Rápida -->
          <div class="discreet-info-side">
            <div class="discreet-badge">
              <span class="pulse-dot-sm"></span>
              <span>Atendimento em Toda a Capital Paulista</span>
            </div>
            
            <h3 class="discreet-title">Localização &amp; Cobertura Técnica</h3>
            <p class="discreet-desc">
              Atendimento presencial em todos os <strong>89 bairros de São Paulo</strong> e Grande SP para projetos elétricos, instalações industriais/prediais e carregadores Wallbox com emissão de ART.
            </p>

            <!-- Campo de Busca Rápida Funcional e Discreto -->
            <div class="discreet-search-wrapper">
              <div class="discreet-search-input-box">
                <svg class="search-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="bairroQuickSearch" placeholder="Digite seu bairro (ex: Moema, Pinheiros, Tatuapé...)" autocomplete="off">
              </div>
              <div id="bairroQuickResults" class="discreet-search-dropdown" style="display:none;"></div>
            </div>

            <div class="discreet-tags-cloud">
              <span class="discreet-tag-item">⚡ Projetos &amp; Instalações</span>
              <span class="discreet-tag-item">🔋 Carregadores VE Wallbox</span>
              <span class="discreet-tag-item">📜 Laudos com ART CREA-SP</span>
            </div>
          </div>

          <!-- Coluna 2: Google Maps Discreto e Responsivo -->
          <div class="discreet-map-side">
            <div class="discreet-map-container">
              <iframe
                title="Google Maps - Cobertura AUTOWATT Engenharia São Paulo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.395460599!2d-46.92496307137024!3d-23.68153147573512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
              <a href="https://maps.google.com/?q=São+Paulo,+SP" target="_blank" rel="noopener noreferrer" class="discreet-map-overlay-btn" title="Abrir no Google Maps">
                <span>Abrir no Google Maps</span> &rarr;
              </a>
            </div>
          </div>
        </div>

        <!-- Acordeão Expansível Elegante para os 89 Bairros (SEO Completo sem Poluição Visual) -->
        <details class="discreet-bairros-details" id="bairrosDirectoryDetails">
          <summary class="discreet-bairros-summary">
            <span class="summary-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Ver lista completa com todos os <strong>89 bairros atendidos em São Paulo</strong></span>
            </span>
            <span class="summary-chevron">&darr;</span>
          </summary>
          <div class="discreet-directory-body">
            <p class="discreet-directory-note">
              Selecione o bairro abaixo para visualizar os serviços específicos de engenharia elétrica e infraestrutura de carregadores para veículos elétricos:
            </p>
            <div class="discreet-zones-grid">
${zoneDirectoryHTML}
            </div>
          </div>
        </details>
      </div>
    </div>
  </section>`;

// Atualiza o arquivo index.html substituindo a seção anterior pela nova versão discreta
const indexPath = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Regex para encontrar a seção anterior #mapa-cobertura
const coverageRegex = /<!-- ==========================================================================\s+LOCALIZAÇÃO NO GOOGLE MAPS & REDE DE ATENDIMENTO[\s\S]*?<\/section>/;

if (coverageRegex.test(indexContent)) {
  indexContent = indexContent.replace(coverageRegex, discreetCoverageHTML.trim());
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('✅ index.html atualizado com a versão DISCRETA e FUNCIONAL de localização!');
} else {
  console.log('⚠️ Seção anterior não encontrada por regex, tentando por tag ID...');
  const fallbackRegex = /<section class="section section-coverage" id="mapa-cobertura">[\s\S]*?<\/section>/;
  if (fallbackRegex.test(indexContent)) {
    indexContent = indexContent.replace(fallbackRegex, discreetCoverageHTML.trim());
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log('✅ index.html atualizado com sucesso via fallback!');
  } else {
    console.error('❌ Não foi possível localizar a seção mapa-cobertura em index.html.');
  }
}
