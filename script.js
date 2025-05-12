class PomodoroTimer {
    constructor() {
        this.timeLeft = 30 * 60; // 30 minutes in seconds
        this.totalTime = 30 * 60;
        this.isRunning = false;
        this.timerId = null;
        this.isWorkMode = true;
        
        // DOM elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startBtn = document.getElementById('start');
        this.pauseBtn = document.getElementById('pause');
        this.resetBtn = document.getElementById('reset');
        this.modeIcon = document.querySelector('.mode-toggle i');
        this.breakDuration = document.querySelector('.break-duration');
        this.breakBtns = document.querySelectorAll('.break-btn');
        
        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.modeIcon.addEventListener('click', () => this.toggleMode());
        this.breakBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setBreakDuration(btn));
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
    
    toggleMode() {
        this.isWorkMode = !this.isWorkMode;
        
        // Update timer duration
        this.totalTime = this.isWorkMode ? 30 * 60 : 5 * 60;
        
        // Update UI
        this.modeIcon.className = this.isWorkMode ? 'fas fa-moon' : 'fas fa-sun';
        this.breakDuration.style.display = this.isWorkMode ? 'none' : 'flex';
        
        // Reset timer with new duration
        this.reset();
    }
    
    setBreakDuration(btn) {
        const minutes = parseInt(btn.dataset.time);
        this.totalTime = minutes * 60;
        this.reset();
        
        // Update active state of buttons
        this.breakBtns.forEach(b => b.style.opacity = '0.8');
        btn.style.opacity = '1';
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