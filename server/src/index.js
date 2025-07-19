const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Güvenlik başlıkları
app.use(cors()); // CORS ayarları
app.use(compression()); // Sıkıştırma
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // JSON parser
app.use(express.urlencoded({ extended: true })); // URL encoded parser

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // İstek limiti
  message: 'Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin.'
});
app.use('/api', limiter);

// Ana route
app.get('/', (req, res) => {
  res.json({
    message: 'Modern Fırın ve Pastane API\'sine hoş geldiniz! 🥖',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      hello: '/api/hello',
      products: '/api/products'
    }
  });
});

// Sağlık kontrolü
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Sunucu sağlıklı çalışıyor'
  });
});

// Merhaba endpoint'i
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Sunucu aktif ve hazır! ✅',
    timestamp: new Date().toISOString()
  });
});

// Örnek ürünler endpoint'i
app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Tam Buğday Ekmeği',
      category: 'Ekmek',
      price: 5.50,
      description: 'Günlük taze tam buğday ekmeği',
      available: true
    },
    {
      id: 2,
      name: 'Çikolatalı Pasta',
      category: 'Pasta',
      price: 45.00,
      description: 'Ev yapımı çikolatalı pasta',
      available: true
    },
    {
      id: 3,
      name: 'Su Böreği',
      category: 'Börek',
      price: 25.00,
      description: 'Geleneksel su böreği',
      available: true
    },
    {
      id: 4,
      name: 'Croissant',
      category: 'Pastane',
      price: 8.00,
      description: 'Fransız usulü tereyağlı croissant',
      available: true
    }
  ];

  res.json({
    success: true,
    data: products,
    count: products.length
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint bulunamadı',
    message: 'İstenen kaynak mevcut değil',
    availableRoutes: ['/', '/api/health', '/api/hello', '/api/products']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Sunucu hatası',
    message: 'Bir şeyler ters gitti!'
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;