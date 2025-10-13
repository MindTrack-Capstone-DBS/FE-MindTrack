# MindTrack Frontend Configuration

## API Configuration

Untuk development lokal, buat file `.env` di folder `FE-MindTrack` dengan isi:

```
VITE_API_URL=http://localhost:5000
```

Untuk production, ubah ke:

```
VITE_API_URL=https://mindtrack-be-production-8ea6.up.railway.app
```

## Perubahan yang Sudah Dilakukan

1. **AuthForm.jsx**: Mengubah default API URL dari Railway ke localhost:5000
2. **Dashboard-Page.jsx**: Mengubah default API URL dari Railway ke localhost:5000
3. **ChatBox.jsx**: Sudah menggunakan localhost:5000 sebagai default
4. **Profile.jsx**: Sudah menggunakan localhost:5000 sebagai default

## Cara Menjalankan Development

1. **Backend (Terminal 1):**
   ```bash
   cd BE-MindTrack/MindTrack-BE
   npm start
   ```

2. **Frontend (Terminal 2):**
   ```bash
   cd FE-MindTrack
   npm run dev
   ```

3. **Akses aplikasi di:** `http://localhost:3001`

## Troubleshooting CORS

Jika masih ada masalah CORS:
1. Pastikan backend berjalan di port 5000
2. Pastikan frontend berjalan di port 3001
3. Cek browser console untuk error details
4. Restart kedua server jika diperlukan
