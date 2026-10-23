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

## Panduan Hosting di Vercel (Paling Direkomendasikan)

Karena repositori Anda sudah terunggah di GitHub (`https://github.com/fdwi/portofolio`), cara termudah dan tercepat adalah menghubungkannya langsung ke Vercel:

### Cara 1: Lewat Web Dashboard Vercel (1-Click & Otomatis Update)
1. Buka [vercel.com/new](https://vercel.com/new).
2. Masuk / Sign in menggunakan akun **GitHub** Anda (`fdwi`).
3. Pada daftar repositori, cari repositori **`fdwi/portofolio`**, lalu klik tombol **Import**.
4. Di bagian **Configure Project**:
   - **Framework Preset**: Biarkan `Other` (Vercel otomatis mendeteksi HTML/CSS/JS statis).
   - **Root Directory**: `./` (default).
   - Tidak perlu konfigurasi Build Command atau Output Directory.
5. Klik **Deploy**.
6. Selesai! Dalam hitungan detik website portofolio Anda langsung aktif dengan domain gratis berakhiran `.vercel.app` (misal: `https://portofolio-fdwi.vercel.app`).
   > *Keuntungan*: Setiap kali Anda melakukan `git push` ke repositori GitHub, Vercel akan otomatis memperbarui tampilan web secara instan.

### Cara 2: Lewat Terminal (Vercel CLI)
Jika ingin deploy langsung dari terminal komputer Anda:
```bash
npx vercel
```
1. Ikuti petunjuk di terminal untuk login (tekan `Enter` untuk membuka browser).
2. Pilih scope akun Anda.
3. Saat ditanya *Link to existing project?*, ketik `N`.
4. Beri nama proyek: `portofolio`.
5. Tekan `Enter` untuk opsi default lainnya.
6. Untuk deploy versi produksi:
```bash
npx vercel --prod
```

---

## Opsi Alternatif: Hosting di GitHub Pages

## Fitur Utama Portofolio
- **Mode Terang & Gelap (Light / Dark Theme)**: Deteksi otomatis preferensi sistem pengguna serta penyimpanan status pilihan di penyimpanan lokal (`localStorage`).
- **Penyaring Kategori Proyek (Project Filter)**: Memfilter portofolio berdasarkan Web Dev, UI/UX Design, dan Sistem IoT secara instan.
- **Detail Studi Kasus Interaktif (Accessible Modal)**: Jendela dialog detail proyek yang memuat tantangan, solusi teknis, dan metrik hasil yang dapat ditutup menggunakan tombol `Escape` atau klik latar belakang.
- **Simulator Sensor & Aktuator Mini**: Demonstrasi langsung pembacaan fluktuasi sensor lingkungan dan kendali relay perangkat keras.
- **Formulir Kontak Tervalidasi**: Validasi input instan dengan pelindung kesalahan dan pembukaan klien surel perangkat secara otomatis ke `fdwi691@gmail.com`.
- **Aksesibilitas Standar WCAG AA**: Rasio kontras teks diuji secara komputasi (> 4.5:1), indikator fokus keyboard terlihat jelas, serta area sentuh tombol minimum 44px.
