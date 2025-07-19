# Modern Fırın ve Pastane Web Sitesi

Modern fırın ve pastane işletmesi için geliştirilmiş web sitesi projesi. React frontend ve Node.js backend teknolojileri kullanılarak geliştirilmiştir.

## Proje Yapısı

```
modern-firin-scripti/
├── client/                 # React frontend uygulaması
│   ├── src/
│   │   └── App.js         # Ana React bileşeni
│   └── package.json       # Frontend bağımlılıkları
├── server/                 # Node.js backend API
│   ├── src/
│   │   └── index.js       # Express server dosyası
│   └── package.json       # Backend bağımlılıkları
├── docker-compose.yml      # Docker container yapılandırması
├── .gitignore             # Git ignore kuralları
└── README.md              # Proje dokümantasyonu
```

## Teknolojiler

### Frontend
- React.js
- Modern JavaScript (ES6+)
- CSS3

### Backend
- Node.js
- Express.js
- RESTful API

### DevOps
- Docker
- Docker Compose

## Kurulum

### Gereksinimler
- Node.js (v14+)
- npm veya yarn
- Docker (opsiyonel)

### Yerel Geliştirme

1. Projeyi klonlayın:
```bash
git clone https://github.com/yakup7575/modern-firin-scripti.git
cd modern-firin-scripti
```

2. Backend'i başlatın:
```bash
cd server
npm install
npm start
```

3. Frontend'i başlatın (yeni terminal):
```bash
cd client
npm install
npm start
```

### Docker ile Çalıştırma

```bash
docker-compose up -d
```

## Özellikler

- Modern ve responsive tasarım
- Ürün kataloğu
- Online sipariş sistemi
- Yönetim paneli
- Müşteri kayıt sistemi

## Geliştirme

Proje aktif geliştirme aşamasındadır. Katkıda bulunmak için:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.