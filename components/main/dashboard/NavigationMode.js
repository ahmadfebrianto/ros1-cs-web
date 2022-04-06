app.component('navigation-mode', {
    template: `
    <div class="card shadow-sm">
        <div class="card-body pt-2">
        <small class="text-muted">Mode</small>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="navigation-mode" id="mode-interactive" checked>
            <label class="form-check-label" for="mode-interactive">
            Interactive
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="navigation-mode" id="mode-joystick">
            <label class="form-check-label" for="mode-joystick">
            Joystick
            </label>
        </div>
        </div>
    </div>
    
      `,
  });
  