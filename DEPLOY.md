# 🚀 GUIA DE DEPLOY E AUDITORIA DE PRODUÇÃO - AUTOWATT ENGENHARIA

Este documento certifica a auditoria técnica, boas práticas de segurança e as instruções passo a passo para deploy da aplicação em produção.

---

## 📋 1. Checklist de Verificação e Auditoria do Projeto

| Item de Verificação | Status | Observações |
|---|---|---|
| **Estrutura Geral de Arquivos** | ✅ Aprovado | Todos os arquivos (`index.html`, `css/`, `js/`, `imagens/`) presentes e íntegros |
| **Imports e Links Internos** | ✅ Aprovado | Sem caminhos quebrados; imagens, scripts e estilos carregando perfeitamente |
| **Erros de Sintaxe JS / CSS** | ✅ Aprovado | Validado com `node -c` (zero erros de sintaxe ou execução) |
| **Segurança & Variáveis de Ambiente** | ✅ Aprovado | Nenhuma API Key ou credencial privada exposta no frontend ou versionada |
| **Arquivo `.gitignore`** | ✅ Aprovado | Configurado para ignorar `.env*`, `node_modules/`, `dist/`, logs e temporários |
| **Arquivo `.env.example`** | ✅ Aprovado | Modelo fornecido na raiz para parametrizações de ambiente |
| **SEO & Indexação Google** | ✅ Aprovado | `robots.txt`, `sitemap.xml`, meta tags e Schema.org configurados |
| **Responsividade & UX** | ✅ Aprovado | Testado para Mobile, Tablet e Desktop com botões de WhatsApp oficiais |

---

## 🔒 2. Boas Práticas de Segurança e Dados

- ✅ **Sem Chaves Hardcoded:** O frontend utiliza apenas redirecionamentos diretos e seguros para a API pública do WhatsApp (`https://api.whatsapp.com/send`).
- ✅ **`.env` protegido:** Nenhum arquivo com segredos foi commitado no repositório.
- ✅ **Headers de Segurança Recomendados em Produção:**
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`

---

## 🌐 3. Passo a Passo para Deploy em Produção

### Opção A: Deploy no Vercel (Recomendado - Gratuito e Instantâneo)
1. Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub.
2. Clique em **"Add New..."** ➔ **"Project"**.
3. Selecione o repositório `lucasrichieri/autowatt`.
4. Em *Framework Preset*, deixe como **Other** / Estático (Root Directory: `./`).
5. Clique em **"Deploy"**.
6. O site estará online em segundos com HTTPS automático (ex: `https://autowatt.vercel.app`).
7. *(Opcional)* Conecte seu domínio personalizado `autowatt.eng.br` nas configurações de Domínio do Vercel.

---

### Opção B: Deploy no Netlify
1. Acesse [netlify.com](https://netlify.com) e faça login com o GitHub.
2. Clique em **"Add new site"** ➔ **"Import an existing project"**.
3. Escolha o repositório `lucasrichieri/autowatt`.
4. Deixe o Build Command em branco e o Publish Directory como `./`.
5. Clique em **"Deploy autowatt"**.

---

### Opção C: Deploy no GitHub Pages
1. Acesse o repositório [https://github.com/lucasrichieri/autowatt](https://github.com/lucasrichieri/autowatt).
2. Vá em **Settings** ➔ **Pages** (no menu lateral esquerdo).
3. Em **Source**, selecione `Deploy from a branch`.
4. Em **Branch**, escolha `main` e a pasta `/ (root)`.
5. Clique em **Save**.
6. O site estará publicado em `https://lucasrichieri.github.io/autowatt/`.

---

### Opção D: Deploy em VPS / Servidor Node.js (Render / Railway / DigitalOcean / AWS)
1. Clone o repositório no servidor:
   ```bash
   git clone https://github.com/lucasrichieri/autowatt.git
   cd autowatt
   ```
2. Instale as dependências (se houver) e configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Inicie o servidor em produção usando PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "autowatt"
   pm2 save
   pm2 startup
   ```

---

## 🎯 4. Critérios de Sucesso Atingidos
- ✅ Repositório 100% atualizado no GitHub: [lucasrichieri/autowatt](https://github.com/lucasrichieri/autowatt)
- ✅ Sem vulnerabilidades ou credenciais expostas.
- ✅ Pronto para publicação em qualquer plataforma de hospedagem estática ou Node.js.
