app.component('interactive', {
  template: `
    <div class="card">
        <div class="flex flex-2 sm:flex-col md:flex-row gap-2 p-2">
            <div class="button bg-blue-primary hover:opacity-80">
                Pause
            </div>
            <div class="button bg-red-500 hover:opacity-80">
                Cancel
            </div>
        </div>
    </div>
    `,
});
