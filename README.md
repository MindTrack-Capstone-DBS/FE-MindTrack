# MindTrack - Aplikasi Tracking Mood & Journaling

## 📋 Deskripsi

MindTrack adalah aplikasi web yang dibangun dengan React dan Vite untuk membantu pengguna melacak mood harian mereka, menulis jurnal, dan berinteraksi melalui fitur chat. Aplikasi ini dirancang dengan antarmuka yang user-friendly dan responsif menggunakan Tailwind CSS.

## ✨ Fitur Utama

- **🔐 Sistem Autentikasi**: Login dan registrasi pengguna
- **📊 Tracking Mood**: Pencatatan dan visualisasi mood harian
- **📝 Journaling**: Fitur menulis jurnal pribadi
- **💬 Chat Box**: Interaksi melalui chat
- **👤 Profil Pengguna**: Manajemen profil dan pengaturan
- **📱 Responsive Design**: Tampilan yang optimal di berbagai perangkat
- **🎨 Modern UI**: Antarmuka yang menarik dengan animasi Framer Motion

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React 19.1.0** - Library JavaScript untuk UI
- **Vite 6.3.5** - Build tool dan development server
- **React Router DOM 7.6.1** - Routing untuk aplikasi
- **Tailwind CSS 4.1.7** - Framework CSS utility-first
- **Framer Motion 12.16.0** - Library animasi
- **Lucide React 0.513.0** - Icon library
- **Sharp 0.34.2** - Image processing
- **PNGJS 7.0.0** - PNG image manipulation

### Development Tools
- **ESLint 9.25.0** - Linting untuk JavaScript
- **TypeScript types** - Type definitions untuk React

## 📁 Struktur Project

```
mindtrack-fe/
├── public/                 # Asset statis
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── AuthForm.jsx    # Form autentikasi
│   │   ├── AuthBanner.jsx  # Banner autentikasi
│   │   ├── Navbar.jsx      # Navigasi utama
│   │   ├── Footer.jsx      # Footer aplikasi
│   │   ├── ProfileForm.jsx # Form profil pengguna
│   │   ├── ProfileHeader.jsx # Header profil
│   │   ├── SidebarProfile.jsx # Sidebar profil
│   │   └── ProtectedRoute.jsx # Route yang dilindungi
│   ├── pages/              # Halaman-halaman aplikasi
│   │   ├── Login-Page/     # Halaman login
│   │   ├── Register-Page/  # Halaman registrasi
│   │   ├── landing-page/   # Halaman utama
│   │   ├── profile/        # Halaman profil
│   │   ├── chatbox/        # Halaman chat
│   │   └── journal/        # Halaman jurnal dan mood
│   ├── assets/             # Asset seperti gambar, font, dll
│   ├── App.jsx             # Komponen utama aplikasi
│   ├── App.css             # Styling untuk App
│   ├── index.css           # Styling global
│   └── main.jsx            # Entry point aplikasi
├── package.json            # Dependencies dan scripts
├── vite.config.js          # Konfigurasi Vite
├── eslint.config.js        # Konfigurasi ESLint
└── README.md               # Dokumentasi project
```

## 🚀 Cara Menjalankan Project

### Prerequisites
Pastikan Anda telah menginstall:
- **Node.js** (versi 16 atau lebih baru)
- **npm** atau **yarn**

### Langkah-langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <url-repository-anda>
   cd mindtrack-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan aplikasi dalam mode development**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka browser**
   Aplikasi akan berjalan di `http://localhost:5173`

### Scripts yang Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint untuk code quality

## 🔧 Konfigurasi Backend

### Setup Express.js Backend

Karena backend terpisah menggunakan Express.js, Anda perlu setup backend secara terpisah:

1. **Buat folder backend**
   ```bash
   mkdir mindtrack-backend
   cd mindtrack-backend
   ```

2. **Inisialisasi project Node.js**
   ```bash
   npm init -y
   ```

3. **Install dependencies Express.js**
   ```bash
   npm install express cors dotenv mongoose bcryptjs jsonwebtoken
   npm install --save-dev nodemon
   ```

4. **Struktur backend yang disarankan**
   ```
   mindtrack-backend/
   ├── src/
   │   ├── controllers/     # Logic bisnis
   │   ├── models/          # Model database
   │   ├── routes/          # Route definitions
   │   ├── middleware/      # Custom middleware
   │   ├── config/          # Konfigurasi database
   │   └── app.js           # Entry point
   ├── package.json
   └── .env                 # Environment variables
   ```

5. **Jalankan backend**
   ```bash
   npm run dev
   ```

### Environment Variables Backend
Buat file `.env` di folder backend:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindtrack
JWT_SECRET=your-secret-key
```

## 🔗 Integrasi Frontend-Backend

Untuk menghubungkan frontend dengan backend:

1. **Update API base URL** di frontend
2. **Setup CORS** di backend Express.js
3. **Implementasi autentikasi JWT**
4. **Setup proxy** di `vite.config.js` jika diperlukan

## 📱 Halaman-halaman Aplikasi

- **Landing Page** (`/`) - Halaman utama aplikasi
- **Login** (`/login`) - Halaman masuk
- **Register** (`/register`) - Halaman pendaftaran
- **Profile** (`/profile`) - Halaman profil pengguna
- **Chat** (`/chat`) - Fitur chat
- **Journal** (`/journal`) - Halaman jurnal mood
- **Journal History** (`/journal/history`) - Riwayat jurnal

## 🎨 Styling dan UI

Aplikasi menggunakan Tailwind CSS untuk styling dengan komponen yang responsif. Animasi diimplementasikan menggunakan Framer Motion untuk memberikan pengalaman pengguna yang lebih baik.

## 🔒 Keamanan

- Autentikasi menggunakan JWT
- Protected routes untuk halaman yang memerlukan login
- Validasi input di form
- Secure password handling

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload folder dist ke platform deployment
```

### Backend (Railway/Render)
```bash
# Setup environment variables di platform
# Deploy menggunakan Git integration
```

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Project ini dilisensikan di bawah MIT License.

## 📞 Kontak

Untuk pertanyaan atau dukungan, silakan hubungi:
- Email: [email-anda]
- GitHub: [username-github-anda]

---

**Note**: Pastikan untuk mengupdate URL repository, email, dan username GitHub sesuai dengan informasi Anda sebelum commit.
