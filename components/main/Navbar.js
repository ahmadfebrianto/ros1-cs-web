app.component('navbar', {
  template:
    /*HTML*/
    `
    <nav class="container-fluid navbar shadow py-2 ">
      <button type="button" id="sidebarCollapse" class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-justify-left" viewBox="0 0 16 16">
         <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </button>
      <div 
        class="col-auto ml-auto rounded-pill" style="padding: 7px 20px;"
        :class="this.$store.state.status === 'Connected' ? 'bg-success' : 'bg-danger'">
        <small class="text-white">{{ this.$store.state.status }}</small>
      </div>
    </nav>
    `,

  data() {
    return {};
  },

  methods: {},

  created() {},
});
