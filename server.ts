import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { app, httpServer, io } from './server/src/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

async function setupServer() {
  if (!isProduction) {
    // Development mode: Mount Vite middleware on the same HTTP server & port
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
    console.log('[Dev Server] Vite middleware mounted');
  } else {
    // Production mode: Serve built client assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Production Server] Serving static files from dist');
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[PARTY ARENA] Full-Stack server running on http://0.0.0.0:${PORT}`);
    console.log(`[PARTY ARENA] Socket.IO netcode online on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('[Server Error] Failed to start server:', err);
  process.exit(1);
});
