# Acarani — Landing Page

Situs statis (HTML + CSS + JS murni, tanpa build) untuk memasarkan produk **Acarani** ke Event Organizer.
Project ini **terpisah** dari aplikasi Acarani dan di-hosting terpusat oleh Anda (mis. `acarani.com`).

## Struktur
```
index.html            # seluruh halaman
assets/css/styles.css # styling bespoke (tema maroon × champagne)
assets/js/main.js     # nav, scroll-reveal, counter, FAQ, parallax
assets/img/           # screenshot produk (browser & phone frame)
```

## Lihat di lokal
Cukup buka `index.html` di browser, atau jalankan server statis:
```bash
npx serve .        # lalu buka http://localhost:3000
# atau
python3 -m http.server 8080
```

## Deploy (gratis)
Karena ini situs statis, bisa di-deploy tanpa server:
- **Cloudflare Pages** / **Netlify** / **Vercel** — drag-and-drop folder ini atau hubungkan repo Git.
- Atau upload ke hosting/CDN mana pun.

## Yang perlu diganti sebelum live
- [ ] Tautan **WhatsApp** (`https://wa.me/`) → isi nomor Anda (`https://wa.me/628xxxx`)
- [ ] Email & Instagram di footer
- [x] Nama brand → **Acarani** (logo & teks sudah diterapkan)
- [ ] Harga di section "Harga" (saat ini "hubungi kami")
- [ ] Tambahkan testimoni / logo klien setelah ada klien pertama
- [ ] (Opsional) ganti gradient tema di `:root` `--maroon`/`--gold` bila brand beda warna

## Catatan
- Font dimuat dari Google Fonts (Fraunces + Hanken Grotesk) — butuh internet saat dibuka.
- Screenshot di `assets/img/` adalah hasil tangkapan produk asli. Untuk performa, pertimbangkan konversi ke WebP sebelum produksi.
