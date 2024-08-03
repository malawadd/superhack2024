document.addEventListener('DOMContentLoaded', () => {
    const iconSlots = document.querySelectorAll('.icon-slot');
    
    iconSlots.forEach(slot => {
        slot.addEventListener('mouseenter', () => {
            iconSlots.forEach(s => {
                if (s !== slot) {
                    s.style.transform = 'scale(0.8)';
                }
            });
            slot.style.transform = 'scale(1.2)';
        });

        slot.addEventListener('mouseleave', () => {
            iconSlots.forEach(s => {
                s.style.transform = 'scale(1)';
            });
        });

        slot.addEventListener('click', () => {
            const iconType = slot.getAttribute('data-icon');
            console.log(`Clicked on ${iconType} icon`);
            // Add functionality for each icon here
        });
    });

    document.getElementById('home-btn').addEventListener('click', () => {
        console.log('Home button clicked');
    });

    document.getElementById('prior-btn').addEventListener('click', () => {
        console.log('Prior button clicked');
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        console.log('Next button clicked');
    });

    document.getElementById('exit').addEventListener('click', () => {
        console.log('Exit clicked');
        // You might want to use IPC to communicate with the main process to close the app
    });

    // Add world clock functionality
    const worldClockSlot = document.querySelector('[data-icon="world-clock"]');
    const clockDisplay = document.createElement('div');
    clockDisplay.id = 'world-clock';
    worldClockSlot.appendChild(clockDisplay);

    function updateWorldClock() {
        const now = new Date();
        clockDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    }

    setInterval(updateWorldClock, 1000);
    updateWorldClock(); // Initial call to display time immediately
});