<div align="center">
  <a href="https://gitlab.com/mbkm/code-repositories/batch-2/manufaktur_agv/agv-ui/-/tree/main" target="_blank"><img src="dist/assets/icons/app/128x128@2x.png" width="100">
  </a>
  <br>
  <br>
  <p>SLAM AGV Desktop App</p>

<a href="https://drive.google.com/drive/folders/1DfaymPn_Pbr1u87aMqva7z3zQcgjMy9g" target="_blank">Download
</a>

</div>

## Tentang Project

SLAM AGV adalah aplikasi berbasis desktop yang digunakan untuk mengontrol dan memonitor robot AGV. Basis kode aplikasi ini menggunakan basis kode _frontend_ dengan library [Vue JS v3](https://vuejs.org/). Kompilasi ke aplikasi desktop dilakukan dengan bantuan tool yang bernama [tauri](https://tauri.studio/).

## Fitur

Beberapa fitur yang ada di dalam aplikasi ini adalah:

| Fitur                  | Keterangan                                                                                                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status koneksi         | Terletak di pojok kanan atas, fitur ini akan menginformasikan status koneksi dengan robot.                                                                                                                            |
| IP & Port              | Memungkinkan pengguna untuk menginputkan IP dan Port yang digunakan oleh robot AGV                                                                                                                                    |
| Map                    | Fitur ini menampilkan map dan lokasi robot                                                                                                                                                                            |
| Mode `Navigation Goal` | Mode ini memungkinakan pengguna untuk mengontrol robot dengan menentukan goal atau destinasinya di map dengan cara melakukan klik di bagian map. Untuk mengirimkan goal, tekan tombol `Send Goal`                     |
| Mode `Joystick`        | Mode ini memungkinkan pengguna untuk mengontrol pergerakan robot secara manual                                                                                                                                        |
| Tombol `Cancel Goal`   | Fitur ini akan menghentikan pergerakan robot dengan cara membatalkan goal yang telah dikirimkan sebelumnya. Fitur ini hanya berfungsi di mode `Navigation Goal`                                                       |
| Kontrol Kecepatan      | Fitur ini memungkinkan pengguna untuk mengontrol kecepatan pergerakan robot di mode `Joystick`. Satuan kecepatan `Linear` adalah `meter per second`, sedangkan satuan kecepatan `Angular` adalah `radian per second`. |
| Pose                   | Menampilkan informasi posisi dan orientasi dari robot                                                                                                                                                                 |
| Logs                   | Menampilkan feedback dari perintah yang diberikan oleh pengguna                                                                                                                                                       |

## Build

Berikut adalah langkah langkah untuk mengompilasi (build) basis kode menjadi aplikasi desktop.

1. ### Build manual

   - Install tools yang dibutuhkan.

     - [Windows](https://tauri.studio/v1/guides/getting-started/prerequisites#setting-up-windows)
     - [Mac OS](https://tauri.studio/v1/guides/getting-started/prerequisites#setting-up-macos)
     - [Linux](https://tauri.studio/v1/guides/getting-started/prerequisites#setting-up-linux)

   - Install [Node JS](https://nodejs.org/en/)
   - Build

     - npm
       - `npm install`
       - `npm run tauri build`
     - yarn
       - `npm i -g yarn`
       - `yarn`
       - `yarn tauri build`

   - Khusus untuk platform Linux, build dapat dilakukan secara otomatis dengan menjalankan script [build-desktop.sh](./build-desktop.sh).  
     `./build-desktop.sh`

   - Output

     - Saat melakukan build dengan npm atau yarn di lokal, maka outputnya akan berada di `src-tauri/target/release/bundle`

     - Saat melakukan build dengan script `build-desktop.sh`, maka outputnya berada di `build/linux/<tanggal dan waktu build>`

2. ### Build otomatis dengan Github Actions

   Build untuk semua platform dapat dilakukan dengan otomatis menggunakan bantuan Github Actions. Berikut adalah langkah-langkahnya.

   - Buat repo di Github dan setup remote addressnya.
   - Di lokal, buat branch `release`  
     `git checkout -b release`
   - Push kode  
     `git push origin release`
   - Download output  
     Saat build berhasil, maka output untuk ketiga platform akan tersedia otomatis untuk didownload di bagian workflow.

## Demo

[Video Demo Aplikasi ](https://drive.google.com/file/d/1I9Qhymc7dLNifSmQYTbJbVKDRu3idc5F/preview)

## Pengembangan Selanjutnya   

Berikut adalah beberapa tips untuk pengembang selanjutnya yang akan mengerjakan projek ini:
- Pakai VS Code editor
- Install ekstensi [ES6 String HTML](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)   
  `Ekstensi ini berfungsi untuk mewarnai syntax html yang terdapat di dalam vue components`

## Referensi

[1] [Contoh Penggunaan ROS2DJS](http://wiki.ros.org/ros2djs/Tutorials/VisualizingAMap)  
[2] [Contoh Penggunaan NAV2DJS](http://wiki.ros.org/nav2djs/Tutorials/CreatingABasicNav2DWidget)  
[3] [Dokumentasi Vue JS](https://vuejs.org/guide/introduction.html)  
[4] [VueX Untuk State Management](https://vuex.vuejs.org)  
[5] [Vue Router](https://router.vuejs.org)  
[6] [Playlist Tentang Membuat UI Untuk Robot Berbasi ROS](https://www.youtube.com/playlist?list=PLK0b4e05LnzagmZCkKIQo9KKqtGo_3aKj)
