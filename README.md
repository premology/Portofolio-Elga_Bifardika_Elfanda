# Portofolio Elga Bifardika Elfanda

Web portofolio statis (HTML + CSS + JavaScript murni, tanpa perlu build) dengan tema **Memphis** — bentuk geometris cerah yang bergerak, terinspirasi struktur [developerFolio](https://github.com/saadpasta/developerFolio). Gratis di-hosting di **GitHub Pages**.

## Cara Publish ke GitHub Pages (sekitar 5 menit)

1. Masuk ke [github.com](https://github.com) (daftar dulu bila belum punya akun).
2. Klik **New repository**.
   - Agar alamatnya pendek, beri nama repository: `username.github.io` (ganti `username` dengan username GitHub Anda).
   - Repository lain pun bisa (alamatnya menjadi `username.github.io/nama-repo`).
   - Pilih **Public**, lalu **Create repository**.
3. Di halaman repository, klik **uploading an existing file**.
4. **Extract dulu file ZIP ini**, lalu seret (drag & drop) SEMUA isi folder ini — `index.html`, folder `css`, `js`, `assets`, dan `README.md` — ke halaman upload. Klik **Commit changes**.
5. Buka **Settings → Pages**. Pada **Build and deployment**, pilih Source: **Deploy from a branch**, Branch: **main** dan folder **/(root)**, lalu **Save**.
6. Tunggu 1–2 menit, lalu buka `https://username.github.io` — situs Anda sudah online. 🎉

## Isi Folder

```
index.html        Halaman utama (semua teks portofolio ada di sini)
css/style.css     Tema Memphis, animasi, mode gelap, tampilan HP
js/main.js        Interaksi: menu, modal, akordeon, bar kemampuan, dll.
assets/
  hero.jpg        Ilustrasi utama
  visual.jpg      Ilustrasi kartu Kreator Visual
  ai-data.jpg     Ilustrasi kartu Annotator Data AI
  web3.jpg        Ilustrasi kartu Otomatisasi & Web3
  CV_Elga_Bifardika_Elfanda.pdf   CV untuk tombol "Unduh CV"
```

## Kustomisasi Cepat

- **Mengganti foto/ilustrasi:** timpa file JPG di folder `assets` dengan nama yang sama persis.
- **Mengganti teks:** edit `index.html` (nama, deskripsi, pengalaman, dsb. tertulis langsung di sana).
- **Menambah tautan GitHub:** di `index.html`, cari komentar `Tambahkan tautan GitHub Anda di sini` lalu ganti `href="#"` dengan URL profil GitHub Anda.
- **Mengganti CV:** timpa `assets/CV_Elga_Bifardika_Elfanda.pdf` dengan file CV terbaru (nama harus sama).
- **Mode gelap:** tersedia lewat tombol matahari/bulan di kanan atas; pilihan tersimpan otomatis.

## Fitur

- Objek Memphis melayang & parallax mengikuti gerakan mouse
- Kartu keahlian bisa diklik (modal detail) + efek tilt 3D
- Pengalaman kerja berupa akordeon yang bisa dibuka-tutup
- Bar kemampuan dan angka statistik beranimasi saat halaman di-scroll
- Teks peran berganti otomatis dengan efek mengetik
- Tombol salin email, kembali ke atas, menu aktif mengikuti posisi scroll
- Responsif penuh (HP, tablet, desktop) & menghormati `prefers-reduced-motion`
