import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    cakeType: '',
    size: '',
    message: '',
    deliveryDate: ''
  });

  useEffect(() => {
    // API'den mesaj al
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('API bağlantı hatası:', err));

    // Ürünleri getir
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.data || []))
      .catch(err => console.error('Ürün yükleme hatası:', err));
  }, []);

  const breadVarieties = [
    { name: 'Tam Buğday Ekmeği', price: '5.50₺', description: 'Sağlıklı ve besleyici tam buğday ekmeği', image: '🌾' },
    { name: 'Beyaz Ekmek', price: '4.50₺', description: 'Klasik yumuşak beyaz ekmek', image: '🍞' },
    { name: 'Çavdar Ekmeği', price: '6.00₺', description: 'Geleneksel çavdar ekmeği', image: '🍞' },
    { name: 'Köy Ekmeği', price: '7.00₺', description: 'Taş fırında pişmiş köy ekmeği', image: '🥖' }
  ];

  const simitVarieties = [
    { name: 'Klasik Simit', price: '3.00₺', description: 'Geleneksel İstanbul simidi', image: '🥨' },
    { name: 'Susam Simidi', price: '3.50₺', description: 'Bol susamlı nefis simit', image: '🥨' },
    { name: 'Çörek Otlu Simit', price: '4.00₺', description: 'Çörek otu aromalı özel simit', image: '🥨' },
    { name: 'Peynirli Simit', price: '5.00₺', description: 'İçi peynirli doyurucu simit', image: '🥨' }
  ];

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Sipariş gönderme işlemi burada yapılacak
    alert('Siparişiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.');
    setOrderForm({
      name: '',
      phone: '',
      cakeType: '',
      size: '',
      message: '',
      deliveryDate: ''
    });
  };

  const renderHomePage = () => (
    <div className="App">
      <header className="App-header">
        <nav className="main-nav">
          <h1>🥖 Modern Fırın ve Pastane</h1>
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>
              Ana Sayfa
            </button>
            <button onClick={() => setCurrentPage('admin')} className={currentPage === 'admin' ? 'active' : ''}>
              Admin Panel
            </button>
          </div>
        </nav>
        
        <p className="hero-subtitle">Taze ve lezzetli ürünlerimizle sizleri bekliyoruz</p>
        
        {/* Ekmek Çeşitleri Bölümü */}
        <section className="section" id="breads">
          <h2>🍞 Ekmek Çeşitlerimiz</h2>
          <div className="products-grid">
            {breadVarieties.map((bread, index) => (
              <div key={index} className="product-card">
                <div className="product-image">{bread.image}</div>
                <h3>{bread.name}</h3>
                <p className="product-price">{bread.price}</p>
                <p className="product-description">{bread.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simitler Bölümü */}
        <section className="section" id="simits">
          <h2>🥨 Simit Çeşitlerimiz</h2>
          <div className="products-grid">
            {simitVarieties.map((simit, index) => (
              <div key={index} className="product-card">
                <div className="product-image">{simit.image}</div>
                <h3>{simit.name}</h3>
                <p className="product-price">{simit.price}</p>
                <p className="product-description">{simit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pasta Siparişi Bölümü */}
        <section className="section" id="cake-order">
          <h2>🧁 Pasta Siparişi</h2>
          <div className="order-section">
            <p>Özel günleriniz için dilediğiniz pastayı sipariş edebilirsiniz.</p>
            <form className="order-form" onSubmit={handleOrderSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <select
                  value={orderForm.cakeType}
                  onChange={(e) => setOrderForm({...orderForm, cakeType: e.target.value})}
                  required
                >
                  <option value="">Pasta Türü Seçin</option>
                  <option value="chocolate">Çikolatalı Pasta</option>
                  <option value="vanilla">Vanilyalı Pasta</option>
                  <option value="strawberry">Çilekli Pasta</option>
                  <option value="carrot">Havuçlu Pasta</option>
                  <option value="custom">Özel Tasarım</option>
                </select>
                <select
                  value={orderForm.size}
                  onChange={(e) => setOrderForm({...orderForm, size: e.target.value})}
                  required
                >
                  <option value="">Boyut Seçin</option>
                  <option value="small">Küçük (4-6 kişilik)</option>
                  <option value="medium">Orta (8-10 kişilik)</option>
                  <option value="large">Büyük (12-15 kişilik)</option>
                </select>
              </div>
              <input
                type="date"
                value={orderForm.deliveryDate}
                onChange={(e) => setOrderForm({...orderForm, deliveryDate: e.target.value})}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <textarea
                placeholder="Özel istekleriniz (yazı, süsleme vs.)"
                value={orderForm.message}
                onChange={(e) => setOrderForm({...orderForm, message: e.target.value})}
                rows="4"
              />
              <button type="submit" className="order-button">Sipariş Ver</button>
            </form>
          </div>
        </section>

        <div className="api-status">
          <p>Sunucu Durumu: {message || 'Bağlanıyor...'}</p>
        </div>

        <footer className="app-footer">
          <p>© 2024 Modern Fırın ve Pastane - Tüm hakları saklıdır</p>
        </footer>
      </header>
    </div>
  );

  const renderAdminPage = () => (
    <div className="App admin-panel">
      <header className="App-header">
        <nav className="main-nav">
          <h1>👨‍💼 Admin Panel</h1>
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>
              Ana Sayfa
            </button>
            <button onClick={() => setCurrentPage('admin')} className={currentPage === 'admin' ? 'active' : ''}>
              Admin Panel
            </button>
          </div>
        </nav>
        
        <div className="admin-content">
          <div className="admin-dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Toplam Ürün</h3>
                <p className="stat-number">{products.length}</p>
              </div>
              <div className="stat-card">
                <h3>Aktif Siparişler</h3>
                <p className="stat-number">12</p>
              </div>
              <div className="stat-card">
                <h3>Bugünkü Satış</h3>
                <p className="stat-number">₺1,250</p>
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h3>Ürün Yönetimi</h3>
            <div className="products-management">
              <button className="admin-button">Yeni Ürün Ekle</button>
              <div className="products-list">
                {products.map((product) => (
                  <div key={product.id} className="admin-product-item">
                    <span>{product.name} - {product.price}₺</span>
                    <div>
                      <button className="edit-btn">Düzenle</button>
                      <button className="delete-btn">Sil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h3>Sipariş Yönetimi</h3>
            <div className="orders-management">
              <p>Yeni siparişler burada görüntülenecek...</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );

  return currentPage === 'home' ? renderHomePage() : renderAdminPage();
}

export default App;