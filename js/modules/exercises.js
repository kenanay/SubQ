/**
 * SubQ Egzersizler (Şifa Pratikleri & Dijital Veda Tuvali) Controller
 */
import { SUBQ_DATA } from '../data.js';
import { StorageService } from './storage.js';
import { UIController } from './ui.js';

export const ExercisesController = {
  timerInterval: null,
  timerSeconds: 300,
  timerTotal: 300,
  endTime: null,
  isTimerRunning: false,
  isAudioEnabled: true,
  audioContext: null,
  oscillator: null,
  gainNode: null,
  stopTimeoutId: null,

  // Canvas drawing state
  canvas: null,
  ctx: null,
  isDrawing: false,

  init() {
    this.bindTimerControls();
    this.initDigitalCanvas();
    this.bindVocalCards();
    this.bindProjectionExercise();
    this.bindSomaticCards();
    this.bindVisibilityChange();
  },

  /**
   * Sync background tab visibility changes
   */
  bindVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (this.isTimerRunning && this.endTime) {
        const remaining = Math.max(0, Math.ceil((this.endTime - Date.now()) / 1000));
        this.timerSeconds = remaining;
        this.updateTimerDisplay();
        if (this.timerSeconds <= 0) {
          this.completeTimer();
        }
      }
    });
  },

  /**
   * 1. Uyku Öncesi 5 Dakika Ritüeli Timer & Breath Pulse
   */
  bindTimerControls() {
    const startBtn = document.getElementById('timer-start-btn');
    const pauseBtn = document.getElementById('timer-pause-btn');
    const resetBtn = document.getElementById('timer-reset-btn');
    const audioToggleBtn = document.getElementById('timer-audio-toggle-btn');

    if (startBtn) startBtn.addEventListener('click', () => this.startTimer());
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseTimer());
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetTimer());

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        this.isAudioEnabled = !this.isAudioEnabled;
        audioToggleBtn.textContent = this.isAudioEnabled ? '🔊 Ortam Sesi: Açık' : '🔇 Ortam Sesi: Kapalı';
        if (!this.isAudioEnabled) {
          this.stopAmbientSound();
        } else if (this.isTimerRunning) {
          this.playAmbientHealingTone();
        }
      });
    }

    this.updateTimerDisplay();
  },

  startTimer() {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    this.endTime = Date.now() + (this.timerSeconds * 1000);

    // Toggle button visibility
    const startBtn = document.getElementById('timer-start-btn');
    const pauseBtn = document.getElementById('timer-pause-btn');
    if (startBtn) startBtn.hidden = true;
    if (pauseBtn) pauseBtn.hidden = false;

    // Start visual breathing pulse
    const breathCircle = document.getElementById('breath-pulse-circle');
    if (breathCircle) breathCircle.classList.add('animating');

    // Play subtle ambient sound if enabled
    if (this.isAudioEnabled) {
      this.playAmbientHealingTone();
    }

    this.timerInterval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((this.endTime - Date.now()) / 1000));
      this.timerSeconds = remaining;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        this.completeTimer();
      }
    }, 1000);
  },

  pauseTimer() {
    this.isTimerRunning = false;
    this.endTime = null;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const startBtn = document.getElementById('timer-start-btn');
    const pauseBtn = document.getElementById('timer-pause-btn');
    if (startBtn) startBtn.hidden = false;
    if (pauseBtn) pauseBtn.hidden = true;

    const breathCircle = document.getElementById('breath-pulse-circle');
    if (breathCircle) breathCircle.classList.remove('animating');

    this.stopAmbientSound();
  },

  resetTimer() {
    this.pauseTimer();
    this.timerSeconds = this.timerTotal;
    this.updateTimerDisplay();
  },

  /**
   * Harmonious Singing Bowl Chime upon completion (Web Audio API)
   */
  playCompletionChime() {
    if (!this.isAudioEnabled) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;

      // Harmonic frequencies for meditation chime (432 Hz fundamental + gentle overtones)
      const frequencies = [432, 864, 1296];
      const gains = [0.18, 0.08, 0.03];

      frequencies.forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gains[idx], now + 0.05); // soft strike
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5); // long meditative decay

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 4.5);
      });
    } catch (e) {
      console.log('Chime playback error:', e);
    }
  },

  completeTimer() {
    this.pauseTimer();
    this.playCompletionChime();
    UIController.showToast('✨ 5 Dakikalık Niyet Ritüeli Tamamlandı. Şimdi sakince uykuya dalabilirsiniz.');
  },

  updateTimerDisplay() {
    const display = document.getElementById('timer-display');
    const label = document.getElementById('timer-phase-label');
    if (!display) return;

    const mins = Math.floor(Math.max(0, this.timerSeconds) / 60);
    const secs = Math.max(0, this.timerSeconds) % 60;
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (label && this.isTimerRunning) {
      // 4-7-8 Breath cycle text based on seconds
      const cycle = (300 - this.timerSeconds) % 19;
      if (cycle < 4) {
        label.textContent = '🫁 Sakince Nefes Al (4 sn)...';
      } else if (cycle < 11) {
        label.textContent = '🧘 Nefesini Tut (7 sn)...';
      } else {
        label.textContent = '💨 Yavaşça Ver ve Bırak (8 sn)...';
      }
    }
  },

  /**
   * Web Audio API Ambient Healing Tone (432 Hz gentle wave)
   */
  playAmbientHealingTone() {
    if (!this.isAudioEnabled) return;

    try {
      if (this.stopTimeoutId) {
        clearTimeout(this.stopTimeoutId);
        this.stopTimeoutId = null;
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      if (this.oscillator) {
        try {
          this.oscillator.stop();
          this.oscillator.disconnect();
        } catch (e) {}
        this.oscillator = null;
      }

      this.oscillator = this.audioContext.createOscillator();
      this.gainNode = this.audioContext.createGain();

      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(432, this.audioContext.currentTime);

      this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 2);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);

      this.oscillator.start();
    } catch (e) {
      console.log('Audio playback prevented or unsupported:', e);
    }
  },

  stopAmbientSound() {
    if (this.stopTimeoutId) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }

    try {
      if (this.gainNode && this.audioContext && this.oscillator) {
        const currentOsc = this.oscillator;
        const currentGain = this.gainNode;
        this.oscillator = null;
        this.gainNode = null;

        currentGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
        this.stopTimeoutId = setTimeout(() => {
          try {
            currentOsc.stop();
            currentOsc.disconnect();
          } catch (e) {}
        }, 500);
      }
    } catch (e) {
      this.oscillator = null;
      this.gainNode = null;
    }
  },

  /**
   * 2. Dijital Sembolik Veda Tuvali (Symbolic Canvas Ritual)
   */
  initDigitalCanvas() {
    this.canvas = document.getElementById('symbolic-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.hasDrawn = false;
    this.resizeCanvas();

    window.addEventListener('resize', () => this.resizeCanvas());

    // Mouse & Touch events
    const startDrawing = (e) => {
      if (!this.hasDrawn) {
        this.clearCanvas(true); // clear instruction text on first stroke
        this.hasDrawn = true;
      }
      this.isDrawing = true;
      const pos = this.getCanvasPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = this.getCanvasPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.strokeStyle = '#D97706'; // terracotta amber line
      this.ctx.lineWidth = 3;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();
    };

    const stopDrawing = () => {
      this.isDrawing = false;
    };

    this.canvas.addEventListener('mousedown', startDrawing);
    this.canvas.addEventListener('mousemove', draw);
    this.canvas.addEventListener('mouseup', stopDrawing);

    this.canvas.addEventListener('touchstart', startDrawing, { passive: false });
    this.canvas.addEventListener('touchmove', draw, { passive: false });
    this.canvas.addEventListener('touchend', stopDrawing);

    // Canvas Clear & Burn buttons
    const clearBtn = document.getElementById('canvas-clear-btn');
    const burnBtn = document.getElementById('canvas-burn-btn');

    if (clearBtn) clearBtn.addEventListener('click', () => {
      this.hasDrawn = false;
      this.clearCanvas(false);
    });
    if (burnBtn) burnBtn.addEventListener('click', () => this.burnCanvasRitual());
  },

  resizeCanvas() {
    if (!this.canvas || !this.ctx) return;
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const newWidth = parent.clientWidth || 320;
    const newHeight = 240;

    if (this.canvas.width === newWidth && this.canvas.height === newHeight) return;

    // Save existing canvas image content before resize
    let tempCanvas = null;
    if (this.hasDrawn && this.canvas.width > 0 && this.canvas.height > 0) {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.canvas.width;
      tempCanvas.height = this.canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(this.canvas, 0, 0);
    }

    this.canvas.width = newWidth;
    this.canvas.height = newHeight;

    this.ctx.fillStyle = '#1C1917';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (tempCanvas) {
      this.ctx.drawImage(tempCanvas, 0, 0);
    } else if (!this.hasDrawn) {
      this.ctx.font = '14px system-ui, sans-serif';
      this.ctx.fillStyle = '#78716C';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Dokunarak engeli veya toksik döngüyü buraya çizin...', this.canvas.width / 2, this.canvas.height / 2);
    }
  },

  clearCanvas(blankOnly = false) {
    if (!this.ctx || !this.canvas) return;
    this.ctx.fillStyle = '#1C1917';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (!blankOnly) {
      this.hasDrawn = false;
      this.ctx.font = '14px system-ui, sans-serif';
      this.ctx.fillStyle = '#78716C';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Dokunarak engeli veya toksik döngüyü buraya çizin...', this.canvas.width / 2, this.canvas.height / 2);
    }
  },

  getCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  },

  /**
   * Burn / Dissolve Canvas animation ritual
   */
  burnCanvasRitual() {
    if (!this.canvas || !this.ctx) return;

    this.canvas.classList.add('dissolving');

    UIController.showToast('🔥 Sembolik Veda Gerçekleşti: Kromanyon bu döngünün bittiği mesajını aldı.');

    setTimeout(() => {
      this.clearCanvas();
      this.canvas.classList.remove('dissolving');
    }, 1500);
  },

  /**
   * 3. Interactive Vocal Cards
   */
  bindVocalCards() {
    const cards = document.querySelectorAll('.vocal-prompt-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('active');
      });
    });
  },

  /**
   * 4. Bilinçaltı Projeksiyonu (Masadaki Bardak ve Aile Odası) Egzersizi
   */
  bindProjectionExercise() {
    const stepItems = document.querySelectorAll('.projection-step-item');
    stepItems.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });

    const completeBtn = document.getElementById('projection-complete-btn');
    const input = document.getElementById('projection-target-input');

    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        const target = input ? input.value.trim() : '';
        const topic = target || 'Döngü ve Tıkanıklık';

        // Auto-log to Journal
        StorageService.addJournalEntry({
          feeling: 'Hafiflik',
          region: 'Genel',
          text: `🍵 Bilinçaltı Projeksiyonu (${topic}): Masadaki bardağa yansıttığım yükün atasal kökünü fark ettim. Atalarımın kaderini saygıyla onurlandırıp bedelini ödemeyi bırakıyorum. Kendi yaşamıma izin veriyorum.`
        });

        if (input) input.value = '';

        UIController.showToast('✨ Projeksiyon çalışması tamamlandı ve günlüğünüze kaydedildi!');

        // Dispatch storage update so planner and journal timelines update instantly
        window.dispatchEvent(new CustomEvent('subq-intention-updated'));
        window.dispatchEvent(new CustomEvent('subq-journal-updated'));
      });
    }
  },

  /**
   * 5. Somatik Beden Pusulası & Beden Taraması
   */
  bindSomaticCards() {
    const signalCards = document.querySelectorAll('.somatic-signal-card');
    signalCards.forEach(card => {
      card.addEventListener('click', () => {
        signalCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const signal = card.getAttribute('data-signal');
        const messages = {
          eller: '🤲 Ellerinize odaklanın: 3 derin nefes alarak gevşeyin. Güvendeyiz.',
          gogus: '🫁 Göğsünüze elinizi koyun: Kendi kişisel alanınıza sahipsiniz, özgürce nefes alın.',
          bogaz: '🗣️ Boğazınızı serbest bırakın: İfade edemediğiniz duyguları kendinize itiraf edin.',
          mide: '🫃 Karnınıza elinizi koyun: Kontrol edemediğiniz olayları hazmetmek zorunda değilsiniz.'
        };

        if (messages[signal]) {
          UIController.showToast(messages[signal]);
        }
      });
    });
  }
};
