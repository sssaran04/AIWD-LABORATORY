class CountdownTimer {
    constructor(eventDate, options = {}) {
        this.eventDate = new Date(eventDate).getTime();
        this.timerInterval = null;
        this.daysElement = options.daysElement || document.getElementById('days');
        this.hoursElement = options.hoursElement || document.getElementById('hours');
        this.minutesElement = options.minutesElement || document.getElementById('minutes');
        this.secondsElement = options.secondsElement || document.getElementById('seconds');
        this.statusElement = options.statusElement || document.getElementById('statusMessage');
        this.formElement = options.formElement || document.getElementById('registrationForm');
        this.submitBtn = options.submitBtn || document.getElementById('submitBtn');
        this.isEventClosed = false;

        if (this.eventDate <= new Date().getTime()) {
            this.handleEventClosed();
        } else {
            this.start();
        }
    }

    start() {
        this.update();
        this.timerInterval = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const timeRemaining = this.eventDate - now;

        if (timeRemaining <= 0) {
            this.stop();
            this.handleEventClosed();
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        this.daysElement.textContent = String(days).padStart(2, '0');
        this.hoursElement.textContent = String(hours).padStart(2, '0');
        this.minutesElement.textContent = String(minutes).padStart(2, '0');
        this.secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    handleEventClosed() {
        this.isEventClosed = true;
        this.daysElement.textContent = '00';
        this.hoursElement.textContent = '00';
        this.minutesElement.textContent = '00';
        this.secondsElement.textContent = '00';
        
        if (this.statusElement) {
            this.statusElement.textContent = 'Registration Closed';
            this.statusElement.classList.add('closed');
        }

        if (this.submitBtn) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Registration Closed';
        }

        if (this.formElement) {
            const inputs = this.formElement.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        }
    }

    destroy() {
        this.stop();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const eventDate = new Date();
    eventDate.setMinutes(eventDate.getMinutes() + 1);

    const timer = new CountdownTimer(eventDate);

    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!timer.isEventClosed) {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                attendees: document.getElementById('attendees').value
            };
            console.log('Registration submitted:', formData);
            alert('Thank you for registering! We will send confirmation to your email.');
            registrationForm.reset();
        }
    });
});
