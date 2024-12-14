document.addEventListener('DOMContentLoaded', () => {
    const rooms = document.querySelectorAll('.room');
    
    rooms.forEach((room) => {
        const toggle = room.querySelector('.light-toggle');
        const brightnessSlider = room.querySelector('.brightness-slider');
        const colorTempSlider = room.querySelector('.color-temp-slider');
        const brightnessDisplay = room.querySelector('.display-brightness');
        const colorTempDisplay = room.querySelector('.display-color-temp');
        const applyBtn = room.querySelector('.apply-btn');
        const currentStateEl = room.querySelector('.current-state');

        // Initialize "applied" brightness and color from initial values
        let appliedBrightness = brightnessSlider.value;
        let appliedColorTemp = colorTempSlider.value;
        
        // If initially off, disable controls
        updateControlsState();

        // Sliders update their display values but do not change the current state yet
        brightnessSlider.addEventListener('input', () => {
            brightnessDisplay.textContent = brightnessSlider.value + '%';
        });

        colorTempSlider.addEventListener('input', () => {
            colorTempDisplay.textContent = colorTempSlider.value + 'K';
        });

        // Toggle updates the On/Off state immediately in current state and enable/disable controls
        toggle.addEventListener('change', () => {
            // Update the current state to show On/Off immediately
            updateCurrentStateOnOff();
            updateControlsState();
        });

        // Apply button updates the applied brightness and color, if the light is on
        applyBtn.addEventListener('click', () => {
            // Only apply if lights are on
            if (toggle.checked) {
                appliedBrightness = brightnessSlider.value;
                appliedColorTemp = colorTempSlider.value;
                updateCurrentStateOnOff();
                alert(`Applied settings for ${room.dataset.room}: ${currentStateEl.textContent.replace('Current State: ', '')}`);
            }
        });

        function updateCurrentStateOnOff() {
            // If off, just show off
            if (!toggle.checked) {
                currentStateEl.textContent = "Current State: Off";
            } else {
                // If on, show the applied brightness and color
                currentStateEl.textContent = `Current State: On, ${appliedBrightness}%, ${appliedColorTemp}K`;
            }
        }

        function updateControlsState() {
            const isOn = toggle.checked;

            // Disable/enable sliders and apply button based on on/off state
            brightnessSlider.disabled = !isOn;
            colorTempSlider.disabled = !isOn;
            applyBtn.disabled = !isOn;

            // Change room opacity for immediate visual feedback
            room.style.opacity = isOn ? '1' : '0.5';
        }
    });
});

