# AUTOWATT Engenharia - Soluções Elétricas

Website institucional oficial, moderno, responsivo e de alta conversão desenvolvido para a **AUTOWATT Engenharia**.

---

## ⚡ 1. Estrutura do Projeto

```
autowatt/
├── package.json               # Configurações do projeto e scripts npm (dev / start)
├── index.html                 # Página única institucional com navegação por âncoras
├── css/
│   ├── style.css              # Design system, variáveis CSS, componentes e responsividade
│   └── animations.css         # Efeitos de pulso elétrico, engrenagem e transições suaves
├── js/
│   ├── app.js                 # Lógica da interface, modais, FAQ acordeão, filtros e LGPD
│   └── calculators.js         # Simulador de Economia Solar e Simulador de Wallbox EV
├── imagens/                   # Banners e materiais visuais oficiais da AUTOWATT
│   ├── banner-paineis-industriais.jpg
│   ├── banner-carregador-ve.jpg
│   ├── banner-energia-solar.jpg
│   ├── banner-laudos-relatorios.jpg
│   └── banner-instalacao-residencial.jpg
├── server.js                  # Servidor local Node.js (Zero dependências externas)
└── README.md                  # Este documento
```

---

## 🚀 2. Como Executar Localmente

### Opção A: Executar via NPM (Recomendado)
No terminal, dentro da pasta do projeto:
```bash
npm run dev
# ou
npm start
```

### Opção B: Executar diretamente com Node.js
```bash
node server.js
```
Abra seu navegador no endereço indicado no terminal (por padrão: `http://localhost:3000` ou `http://localhost:3001` caso a porta 3000 já esteja ocupada).

### Opção C: Abertura Direta
Basta dar um duplo clique no arquivo `index.html` para abrir diretamente no navegador (Chrome, Edge, Firefox, Safari).

---

## 🌐 3. Como Publicar o Site na Web

1. **Hospedagem Gratuita & Rápida:**
   - **Vercel / Netlify:** Conecte o repositório ou arraste a pasta `autowatt` na interface web deles.
   - **GitHub Pages:** Crie um repositório no GitHub, envie os arquivos e ative o *GitHub Pages* nas configurações.
   - **Hostgator / Locaweb / cPanel:** Envie todos os arquivos para a pasta `public_html` via FTP ou Gerenciador de Arquivos.

2. **Domínio Personalizado:**
   - Adquira um domínio (ex.: `autowatt.eng.br` ou `autowattengenharia.com.br`) no Registro.br e aponte o DNS para sua hospedagem.

---

## ✏️ 4. Guia Rápido de Edição e Customização

- **Trocar o Número de WhatsApp:**
  - No arquivo `index.html` e nos arquivos `js/app.js` e `js/calculators.js`, localize `5511999979880` e substitua pelo seu novo número com DDD (apenas números).
- **Instagram Oficial:**
  - Configurado para `https://www.instagram.com/autowatt.engenharia` (`@autowatt.engenharia`).
- **LinkedIn do Responsável Técnico:**
  - Configurado para `https://www.linkedin.com/in/vitor-f-lima-636b5420a/` (Eng. Vitor F. Lima).
- **Trocar o E-mail:**
  - Localize `autowattengenharia@gmail.com` no `index.html`.
- **Alterar Cores e Estilos:**
  - No arquivo `css/style.css`, edite as variáveis no bloco `:root`:
    - `--color-primary-navy`: `#0B2F6B` (Azul-Marinho)
    - `--color-accent-orange`: `#F58220` (Laranja de Destaque)
- **Substituir Imagens:**
  - Salve suas novas imagens na pasta `imagens/` mantendo os mesmos nomes ou atualizando os caminhos no `index.html`.
- **Depoimentos de Clientes:**
  - No `index.html`, procure a tag `<!-- TROCAR ANTES DE PUBLICAR -->` na seção `#depoimentos` e insira os nomes e depoimentos reais dos seus clientes.

---

## 💡 5. Sugestões de Melhorias Futuras

1. **Galeria de Obras e Portfólio Real:** Criar uma seção com fotos "Antes e Depois" de quadros elétricos montados, usinas solares ativadas e laudos entregues.
2. **Blog Técnico de Engenharia:** Publicação de artigos sobre segurança elétrica (NR-10), normas de carregadores VE em condomínios e economia com energia solar para fortalecer o SEO orgânico no Google.
3. **Integração com CRM / Disparo de E-mail Automático:** Conectar o formulário de orçamento diretamente com serviços como RD Station, HubSpot ou disparo automático por e-mail via SendGrid / Resend.
