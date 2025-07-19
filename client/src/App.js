import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // API'den mesaj al
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('API bağlantı hatası:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🥖 Modern Fırın ve Pastane</h1>
        <p>Taze ve lezzetli ürünlerimizle sizleri bekliyoruz</p>
        
        <div className="hero-section">
          <div className="hero-content">
            <h2>Günlük Taze Ürünler</h2>
            <p>Geleneksel lezzetler, modern sunum</p>
            
            <div className="product-categories">
              <div className="category">
                <h3>🍞 Ekmekler</h3>
                <p>Günlük taze ekmek çeşitleri</p>
              </div>
              
              <div className="category">
                <h3>🧁 Pastalar</h3>
                <p>Özel günler için lezzetli pastalar</p>
              </div>
              
              <div className="category">
                <h3>🥐 Börekler</h3>
                <p>El yapımı geleneksel börekler</p>
              </div>
            </div>
          </div>
        </div>

        <div className="api-status">
          <p>Sunucu Durumu: {message || 'Bağlanıyor...'}</p>
        </div>

        <footer className="app-footer">
          <p>© 2024 Modern Fırın ve Pastane - Tüm hakları saklıdır</p>
        </footer>
      </header>
    </div>
  );
}

export default App;