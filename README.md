# Portofolio Pribadi - Dwi Febriyanto

Portofolio web responsif, berkinerja tinggi, dan ramah aksesibilitas (WCAG AA). Dibangun murni menggunakan **HTML5 semantik, CSS3 modern (Custom Properties), dan Vanilla JavaScript (ES6+)** tanpa ketergantungan pustaka eksternal (framework-free).

---

## Spesialisasi & Bidang
- **Web Development**: Aplikasi web semantik, responsif, terintegrasi API & real-time data.
- **UI/UX Design**: Desain berpusat pengguna, design system terstruktur, pengujian kontras tinggi.
- **IoT Engineering**: Integrasi sensor fisik (ESP32/Arduino), transmisi protokol MQTT/HTTP, dan visualisasi telemetri hardware.

---

## Struktur Berkas
```text
portofolio/
├── index.html        # Struktur semantik HTML5, accessibility landmarks, dialog modal
├── style.css         # Token desain CSS, mode terang/gelap, layout responsif (tanpa overflow)
├── script.js         # Logika interaktif: toggle tema, filter proyek, modal aksesibel, simulator IoT
├── DESIGN.md         # Spesifikasi arahan desain, rasio kontras, dial estetika antislop
└── README.md         # Petunjuk penggunaan dan panduan hosting di GitHub Pages
```

---

## Panduan Hosting di GitHub Pages

Ikuti langkah-langkah mudah berikut untuk mempublikasikan portofolio ini ke internet secara gratis menggunakan **GitHub Pages**:

### 1. Buat Repositori Baru di GitHub
1. Masuk ke akun GitHub Anda di [github.com](https://github.com).
2. Klik tombol **New** (Buat repositori baru).
3. Beri nama repositori, misalnya: `portofolio` (atau `fdwi691.github.io` jika ingin menjadi domain utama akun).
4. Pilih visibilitas **Public**.
5. Jangan centang "Initialize this repository with a README" (karena kita sudah memiliki berkas lokal).
6. Klik **Create repository**.

### 2. Hubungkan Repositori Lokal dan Unggah (Push)
Buka terminal di folder proyek ini (`c:\Users\LENOVO\Documents\portofolio`), lalu jalankan perintah berikut:

```bash
# Simpan semua perubahan lokal
git add .
git commit -m "feat: inisialisasi portofolio bersih Dwi Febriyanto"

# Pastikan nama branch utama adalah main
git branch -M main

# Tambahkan remote GitHub Anda (ganti URL sesuai repositori yang Anda buat)
git remote add origin https://github.com/fdwi691/portofolio.git

# Unggah berkas ke GitHub
git push -u origin main
```

### 3. Aktifkan Fitur GitHub Pages
1. Pada halaman repositori Anda di GitHub, klik tab **Settings** (Pengaturan).
2. Pada menu bilah samping kiri (sidebar), klik menu **Pages** (di bagian *Code and automation*).
3. Di bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`.
   - **Branch**: Pilih `main` dan folder `/ (root)`.
   - Klik **Save**.
4. Tunggu sekitar 1 hingga 2 menit. GitHub akan menampilkan tautan situs aktif Anda, contohnya:
   `https://fdwi691.github.io/portofolio/`

---

## Fitur Utama Portofolio
- **Mode Terang & Gelap (Light / Dark Theme)**: Deteksi otomatis preferensi sistem pengguna serta penyimpanan status pilihan di penyimpanan lokal (`localStorage`).
- **Penyaring Kategori Proyek (Project Filter)**: Memfilter portofolio berdasarkan Web Dev, UI/UX Design, dan Sistem IoT secara instan.
- **Detail Studi Kasus Interaktif (Accessible Modal)**: Jendela dialog detail proyek yang memuat tantangan, solusi teknis, dan metrik hasil yang dapat ditutup menggunakan tombol `Escape` atau klik latar belakang.
- **Simulator Sensor & Aktuator Mini**: Demonstrasi langsung pembacaan fluktuasi sensor lingkungan dan kendali relay perangkat keras.
- **Formulir Kontak Tervalidasi**: Validasi input instan dengan pelindung kesalahan dan pembukaan klien surel perangkat secara otomatis ke `fdwi691@gmail.com`.
- **Aksesibilitas Standar WCAG AA**: Rasio kontras teks diuji secara komputasi (> 4.5:1), indikator fokus keyboard terlihat jelas, serta area sentuh tombol minimum 44px.
