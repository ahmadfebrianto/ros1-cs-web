<p align="center">
  <a href="https://gitlab.com/mbkm/code-repositories/batch-2/manufaktur_agv/agv-ui/-/tree/main" target="_blank"><img src="dist/assets/icons/app/128x128@2x.png" width="100">
  </a>
  <p align="center" style="">AGV SLAM DESKTOP APP</p>
</p>

## Tentang Aplikasi
AGV SLAM Desktop App merupakan Software Aplikasi Desktop yang digunakan untuk mengontrol Robot AGV. Desktop Aplikasi ini dibuat menggunakan Bahasa Pemrograman Javascript dengan Struktur Folder mirip seperti Framework Vue.js. Segala assets yang dibutuhkan sudah terdownload dan disimpan di folder `/dist/assets`, sehingga memungkinkan aplikasi bisa berjalan secara offline (tanpa koneksi internet).

## Fitur
Beberapa fitur yang ada dalam Software Aplikasi Desktop AGV SLAM. Berikut menunya beserta keteranganya :

| Menu | Keterangan |
| ---- | ---------- |
| Status Koneksi | Menampilkan keterangan koneksi dari IP yang dimasukan. Nilainya hanya ada 2, yaitu : "Connected" dan "Disconnected" |
| Connection | Memungkinkan user untuk mengatur IP dan Port yang digunakan. (Harus sama dengan IP yang dituliskan dalam Jetson AGV) |
| Kontrol AGV dalam mode `Navigation Goal` | Pengguna memberikan panah tujuan terhadap lokasi yang diinginkan |
| Tombol `Cancel Goal` | Pengguna memberikan panah tujuan terhadap lokasi yang diinginkan |
| Kontrol AGV dalam mode `Joystick` | Memungkinkan pengguna untuk mengontrol Robot AGV menggunakan joystick/ remote control |
| Logs | Menampilkan feedback dari perintah yang diberikan oleh pengguna |
| Linear `Max Speed` | Mengontrol kecepatan AGV dengan satuan Rotation per second (rts) dan value maksimalnya adalah 20 Decimeter per second|
| Linear `Anggular` | Mengontrol pergerakan belok dari Robot AGV. Maksimal nilai nya adalah 20 Radian per second |
| MAPS | Menampilkan hasil mapping dari RPLIDAR. Sekaligus 

## Referensi
