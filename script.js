class PomodoroTimer {
    constructor() {
        this.timeLeft = 30 * 60; // 30 minutes in seconds
        this.totalTime = 30 * 60;
        this.isRunning = false;
        this.timerId = null;
        
        // DOM elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startBtn = document.getElementById('start');
        this.pauseBtn = document.getElementById('pause');
        this.resetBtn = document.getElementById('reset');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        
        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.changeMode(btn));
        });
        
        // Initialize display
        this.updateDisplay();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.playAlarm();
                    this.reset();
                }
            }, 1000);
        }
    }
    
    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }
    
    changeMode(btn) {
        // Update active button
        this.modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update timer
        const minutes = parseInt(btn.dataset.time);
        this.totalTime = minutes * 60;
        this.reset();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    playAlarm() {
        // Create and play a simple beep sound
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
        audio.play();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 