# TRAFFIC HERO 🚦

> **Be Safe, Be Smart!**  
> Game Arcade 2D Edukasi Keselamatan Lalu Lintas untuk Pejalan Kaki.

---

## 📖 Deskripsi Game
**TRAFFIC HERO** adalah game edukasi interaktif berbasis web (desktop browser) yang dirancang untuk melatih kesadaran tata tertib lalu lintas secara natural melalui mekanisme gameplay arcade yang seru dan menantang. 

Alih-alih menggunakan kuis teks hafalan, pemain belajar secara langsung bagaimana menyeberang jalan raya dengan aman, memanfaatkan trotoar dan zebra crossing, membaca sinyal lampu lalu lintas, mengamati pergerakan berbagai jenis kendaraan (sepeda motor, mobil, bus), serta mengambil keputusan yang tepat di jalan raya.

---

## 🎯 Tujuan Game
Tujuan utama pemain adalah mengendalikan karakter pejalan kaki dari **Trotoar Awal** di bagian bawah hingga tiba di **Area Finish (Tujuan Aman)** di bagian atas dengan selamat tanpa tertabrak oleh kendaraan yang melintas.

Pemain harus menyelesaikan seluruh 3 tingkatan level:
1. **Level 1 (Jalan Perumahan):** 2 lajur jalan dengan 1 zebra crossing utama dan lampu lalu lintas.
2. **Level 2 (Jalan Perkotaan):** 4 lajur jalan dengan Trotoar Pemisah (Refuge Island) di bagian tengah serta 2 zebra crossing.
3. **Level 3 (Simpang Ramai):** 4 lajur berkecepatan dinamis dengan volume kendaraan padat (motor cepat, mobil, bus kota).

---

## 🎮 Kontrol Permainan
Game ini dioptimalkan untuk keyboard desktop:

| Tombol Keyboard | Aksi |
| :--- | :--- |
| **Panah Atas [↑]** / **[W]** | Bergerak ke Atas |
| **Panah Bawah [↓]** / **[S]** | Bergerak ke Bawah |
| **Panah Kiri [←]** / **[A]** | Bergerak ke Kiri |
| **Panah Kanan [→]** / **[D]** | Bergerak ke Kanan |
| **[P]** atau **[Escape]** | Menjeda Permainan (Pause / Resume) |

*Catatan: Tombol kontrol telah dilengkapi pencegah scroll layar browser otomatis (`preventDefault`) untuk pengalaman bermain yang nyaman.*

---

## 📋 Cara Bermain
1. **Perhatikan Lampu Lalu Lintas:**
   - **Lampu Pejalan HIJAU (Lampu Kendaraan MERAH):** Kendaraan akan berhenti di belakang garis henti. Ini adalah waktu teraman untuk menyeberang.
   - **Lampu Pejalan MERAH (Lampu Kendaraan HIJAU/KUNING):** Kendaraan melaju kencang. Tetaplah menunggu di trotoar atau pulau aman.
2. **Gunakan Jalur Zebra Crossing:**
   - Menyeberang melalui zebra crossing memberikan poin tambahan dan menjamin posisi penyeberangan yang tepat di depan garis henti kendaraan.
   - Jangan menyeberang sembarangan di luar zebra crossing karena sangat berisiko tertabrak.
3. **Waspadai Jenis Kendaraan:**
   - **Sepeda Motor:** Kecil dan berkecepatan tinggi.
   - **Mobil:** Kecepatan sedang dengan laju stabil.
   - **Bus:** Panjang dan membutuhkan ruang pandang lebih lebar.
4. **Capai Area Finish:**
   - Masuki zona hijau di trotoar atas untuk menuntaskan level.

---

## 🏆 Sistem Skor & Nyawa

### Skor
- **Berhasil menggunakan Zebra Crossing:** `+10 Poin` (diberikan per penyeberangan aman).
- **Menyelesaikan Level (Capai Finish):** `+100 Poin`.
- **Bonus Tanpa Tabrakan (No-Hit Clean Bonus):** `+50 Poin` ekstra jika menyelesaikan level tanpa terkena kendaraan satu kali pun.
- **Tertabrak Kendaraan:** `-20 Poin`.
- Skor tertinggi (*High Score*) otomatis tersimpan di peramban pemain (*localStorage*).

### Nyawa
- Pemain memulai permainan dengan **3 Nyawa (❤️❤️❤️)**.
- Setiap kali tersenggol kendaraan:
  - Nyawa berkurang 1.
  - Skor berkurang 20 poin.
  - Karakter memantul dan kembali ke titik aman terdekat dengan efek kedip kebal sesaat.

---

## 🏁 Kondisi Menang & Kalah

- **Kalah (Game Over):**  
  Terjadi apabila 3 nyawa habis terpakai. Pemain dapat memilih **Coba Lagi (Restart)** untuk mengulang permainan atau kembali ke Menu Utama.
- **Menang (You Are a Traffic Hero!):**  
  Terjadi ketika pemain sukses melewati rintangan pada **Level 3**. Layar kemenangan akan menampilkan skor akhir, sisa nyawa, rating bintang kehormatan, serta gelar *"Duta Tertib Lalu Lintas"*.

---

## 💡 Fitur Edukasi Terintegrasi
- **Banner Edukasi Real-time:** Menampilkan panduan kontekstual saat pemain berada di trotoar, mendekati zebra crossing, saat lampu berubah, atau jika mencoba menyeberang sembarangan.
- **Papan Panduan Lengkap:** Menu *Cara Bermain* merangkum nilai-nilai keselamatan jalan bagi anak-anak dan pelajar.
- **Efek Suara Sintetis (Web Audio API):** Suara klakson mobil, hentakan langkah kaki, denting poin, dan deru rem kendaraan tanpa memerlukan file eksternal.

---

## 💻 Cara Menjalankan di Komputer

Game ini 100% dibuat menggunakan **HTML, CSS, dan Vanilla JavaScript murni**, tanpa dependensi backend, node_modules, ataupun database.

### Opsi 1: Buka Langsung File HTML
1. Buka folder proyek di komputer Anda.
2. Klik ganda (double click) file `index.html`.
3. Game akan langsung terbuka dan berjalan di browser Anda (Chrome, Edge, Firefox, Safari).

### Opsi 2: Menggunakan VS Code Live Server
1. Buka folder proyek di **Visual Studio Code**.
2. Klik kanan pada file `index.html` lalu pilih **Open with Live Server**.
3. Akses game pada alamat lokal yang muncul (biasanya `http://127.0.0.1:5500`).

---

## 🚀 Cara Upload ke GitHub

1. Buat repository baru di [GitHub](https://github.com/new), misalnya dengan nama `traffic-hero`.
2. Buka terminal pada folder proyek Anda, lalu jalankan perintah berikut:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Traffic Hero Game"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/traffic-hero.git
   git push -u origin main
   ```
3. Repository GitHub Anda kini telah siap!

---

## 🌐 Cara Deploy ke Vercel

Karena proyek ini adalah static website murni:

1. Buka [Vercel](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repository `traffic-hero` yang telah Anda upload ke GitHub.
4. Pada bagian pengaturan:
   - **Framework Preset:** Pilih *Other* (atau biarkan default).
   - **Root Directory:** `./` (akar proyek tempat `index.html` berada).
   - Biarkan Build Command dan Output Directory kosong.
5. Klik **"Deploy"**.
6. Dalam hitungan detik, game **TRAFFIC HERO** Anda sudah online dan dapat dimainkan oleh siapa saja melalui tautan Vercel!

---

### Struktur Berkas
```text
traffic-hero/
├── index.html     # Kerangka antarmuka game, modal, HUD, dan canvas
├── style.css      # Styling tampilan modern arcade, responsif & animasi
├── script.js      # Logika game, fisika kendaraan, lampu lalu lintas, & audio
└── README.md      # Dokumentasi lengkap proyek
```
