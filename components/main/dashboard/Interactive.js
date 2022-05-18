app.component('interactive', {
  template: `
    <div class="card">
        <div class="p-5 flex gap-x-5 gap-y-2 justify-center
                    sm:flex-col
                    lg:flex-row">
            <div class="bg-orange-500 rounded-full sm:basis-2 w-full">
                <button class="w-full text-white-primary px-3 py-1 text-sm font-bold tracking-wide">Pause</button>
            </div>
            <div class="bg-red-500 rounded-full sm:basis-1">
                <button class="w-full text-white-primary px-3 py-1 text-sm font-bold tracking-wide">Cancel</button>
            </div>
        </div>
    </div>
    `,
});
