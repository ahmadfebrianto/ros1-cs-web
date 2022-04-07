app.component('about', {
    template: `
    <div id="content" style="padding: 20px 0">
      <h3><strong>SLAM Team</strong></h3>
      <p>Slam Team merupakan nama kelompok projek pengembangan produk Robot AGV. Slam Team terdiri dari 4
        anggota yang terdiri dari 1 Hardware Engineer, 2 Software Engineer dan 1 3D Designer. Berikut profile nya :
      </p>
      <div class="flex-container">
        <div class="flex-item">
          <div class="row row-cols-1 row-cols-md-4 g-4">
            <div class="col">
              <div class="card">
                <img src="assets/images/about/hilal.png" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">M. Hilal Yahya H.</h5>
                  <p class="card-text">Hardware Engineer</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <img src="assets/images/about/febri.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Ahmad Febrianto</h5>
                  <p class="card-text">Software Engineer 1</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <img src="assets/images/about/mujib.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Abdul Mujib</h5>
                  <p class="card-text">Software Engineer 2</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <img src="assets/images/about/dwikky.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Dwikky Nugroho</h5>
                  <p class="card-text">3D Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr>
      <h3><strong>AGV Project</strong></h3>
      <p>AGV banyak digunakan di berbagai lingkup manufaktur  memindahkan material ataupun barang dari satu tempat ke tempat lain. Beberapa AGV masih menggunakan sistem line following untuk menentukan jalur yang akan dilewati. Dengan sistem tersebut pergerakan AGV masih terbatas. Di proyek ini kita akan Trackless AGV sehingga nantinya akan lebih adaptive dengan ruang kerja AGV tersebut.</p>
    </div>
      `,
  });
  