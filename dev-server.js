// ==========================================================================
// AUTOWATT ENGENHARIA - SERVIDOR LOCAL DE DESENVOLVIMENTO (NODE.JS)
// Servidor estático nativo de alta velocidade com zero dependências externas
// ==========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Roteamento de arquivos estáticos
  let safePath = path.normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end('<h1>404 - Página Não Encontrada | AUTOWATT Engenharia</h1>');
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

let currentPort = Number(process.env.PORT) || 3000;

server.on('listening', () => {
  const addr = server.address();
  const actualPort = typeof addr === 'object' && addr ? addr.port : currentPort;
  console.log(`\n==================================================`);
  console.log(`⚡ AUTOWATT Engenharia - Servidor Ativo!`);
  console.log(`🌐 Acesse no seu navegador: http://localhost:${actualPort}`);
  console.log(`==================================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  A porta ${currentPort} já está em uso. Tentando a porta ${currentPort + 1}...`);
    currentPort += 1;
    setTimeout(() => {
      server.listen(currentPort);
    }, 200);
  } else {
    console.error('Erro no servidor:', err);
  }
});

server.listen(currentPort);


