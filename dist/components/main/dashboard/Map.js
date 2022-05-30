app.component('dashboard-map', {
  template:
    /* HTML */
    ` <div class="card p-2">
      <div
        id="map"
        class="flex justify-center items-center
                sm:h-auto md:h-500"
        :class="navigationModeClass"
      >
        <img v-if="!robotConnected" src="assets/images/map/agv.png" />
      </div>
    </div>`,

  data() {
    return {
      nav: null,
      navCLient: null,
      pathShape: null,
    };
  },

  methods: {
    renderMap() {
      var viewer = new ROS2D.Viewer({
        divID: 'map',
        width: 500,
        height: 500,
      });

      this.navClient = new NAV2D.OccupancyGridClientNav({
        ros: this.ros,
        rootObject: viewer.scene,
        viewer: viewer,
        serverName: '/move_base',
        // markerImage: 'assets/icons/app/agv-marker.png',
        withOrientation: true,
      });

      this.$store.commit('setNavigatorClient', this.navClient);
      emitter.emit('mapLoaded');
    },

    /* 
     * Hapus map ketika koneksi terputus karena ia tidak otomatis terhapus
     */
    removeCanvas() {
      if (!this.robotConnected) {
        var map = document.getElementById('map');
        var canvas = map.getElementsByTagName('canvas');
        while (canvas.length > 0) {
          map.removeChild(canvas[0]);
        }
      }
    },

    /* 
     * Render path shape
     */
    createPathShape() {
      var that = this;
      this.pathShape = new ROS2D.PathShape({
        strokeSize: 1,
        strokeColor: createjs.Graphics.getRGB(0, 8, 255, 0.25),
      });

      this.navClient.rootObject.addChild(this.pathShape);

      var topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/move_base/NavfnROS/plan',
        messageType: 'nav_msgs/Path',
      });

      topic.subscribe(function (message) {
        if (
          message !== null &&
          typeof message !== 'undefined' &&
          typeof message.poses !== 'undefined' &&
          message.poses.length > 0
        ) {
          that.pathShape.setPath(message);
        }
      });
    },

    /* 
     * Hapus path shape saat robot telah sampai tujuan
     */
    removePathShape() {
      this.navClient.rootObject.removeChild(this.pathShape);
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  computed: {
    ros() {
      return this.$store.state.ros;
    },

    robotConnected() {
      return this.$store.state.robotConnected;
    },

    navigationModeClass() {
      return {
        'pointer-events-none':
          this.$store.state.navigationMode === 'Joystick' ||
          this.$store.state.goalSent,
        'bg-gray-100': !this.$store.state.robotConnected,
      };
    },
  },

  mounted() {
    /*
     * Render map saat berhasil terhubung ke ros pertama kali
     */
    emitter.on('connected', () => {
      this.renderMap();
    });

    /*
     * Saat ros masih terhubung dan kemudian kita mengunjungi halaman lain, seperti About, maka
     * map akan hilang. Oleh karena itu, ia perlu dirender kembali saat kembali ke Dashboard.
     */
    if (this.robotConnected) {
      this.renderMap();
    }

    /* 
     * Kirim goal ke ros server
     */
    emitter.on('sendGoal', (pose) => {
      this.navClient.navigator.sendGoal(pose);
      this.createPathShape();
      this.$store.commit('setGoalSet', false);
      this.$store.commit('setGoalSent', true);
      this.sendLog('Goal sent', 'info');
    });

    /* Saat robot berhenti, ada dua kemungkinan yaitu ia telah sampai ke tujuan atau ia dihentikan
     * di tengah jalan (goal canceled). Maka harus diperhatikan statusnya untuk mengirim log yang sesuai
     */
    emitter.on('goalResult', (result) => {
      this.$store.commit('setGoalSent', false);
      this.removePathShape();
      if (result.status === 3) {
        this.sendLog('Goal reached', 'success');
      } else if (result.status === 2) {
        this.sendLog('Goal canceled', 'error');
      }
    });
  },

  updated() {
    /*
     * Saat robot disconnect, hapus canvas/map 
     */
    this.removeCanvas();
  },
});
