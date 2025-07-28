const http = require('http');
const fs = require('fs');
const path = require('path');
const { createMahasiswa, readMahasiswa, updateMahasiswa, deleteMahasiswa } = require('./crud');
const { connect } = require('http2');

function parseRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => resolve(JSON.parse(body || '{}')));
  });
}

const server = http.createServer(async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // === API Routes ===
  if (req.url === '/mahasiswa' && req.method === 'GET') {
    const data = await readMahasiswa();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }

  if (req.url === '/mahasiswa' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    await createMahasiswa(body);
    res.writeHead(201);
    res.end(JSON.stringify({ message: 'Data ditambahkan' }));
    return;
  }

  if (req.url.startsWith('/mahasiswa/') && req.method === 'PUT') {
    const nim = req.url.split('/')[2];
    const body = await parseRequestBody(req);
    await updateMahasiswa(nim, body);
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Data diupdate' }));
    return;
  }
 
  if (req.url.startsWith('/mahasiswa/') && req.method === 'DELETE') {
    const nim = req.url.split('/')[2];
    await deleteMahasiswa(nim);
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Data dihapus' }));
    return;
  }

  // === Static File Routes ===
  if (req.url === '/' || req.url === '/index.html') {
    const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  if (req.url === '/app.js') {
    const js = fs.readFileSync(path.join(__dirname, 'public', 'app.js'));
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(js);
    return;
  }

  // 404
  res.writeHead(404);
  res.end('Not found');
});

server.listen(4000, () => {
  console.log('server berjalan di port: http://localhost:4000 jangan di klik link phissing');
});
