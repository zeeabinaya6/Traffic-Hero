/**
 * @license
 * TRAFFIC HERO - 2D Educational Arcade Traffic Safety Game
 * Vanilla JavaScript (No frameworks, No backend, 100% Client-Side)
 */

// ============================================================================
// AUDIO MANAGER (Web Audio API Synthesizer - 100% Offline & Reliable)
// ============================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playStep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playPoint() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.08); // A5
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  playHorn() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(370, now);
    osc2.frequency.setValueAtTime(440, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.23);
    osc2.stop(now + 0.23);
  }

  playCrash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Low frequency crunch
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  playLevelComplete() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.15, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.3);
    });
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const fanfare = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 },
      { f: 1046.5, d: 0.4 },
    ];
    let offset = 0;
    fanfare.forEach((n) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, now + offset);
      gain.gain.setValueAtTime(0.2, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + n.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + n.d + 0.05);
      offset += n.d * 0.85;
    });
  }

  playGameOver() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [392.0, 349.23, 311.13, 261.63]; // G4, F4, D#4, C4
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.2);
      gain.gain.setValueAtTime(0.12, now + idx * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.2 + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.2);
      osc.stop(now + idx * 0.2 + 0.3);
    });
  }
}

const sounds = new SoundEffects();

// ============================================================================
// PARTICLE SYSTEM (Floating text, collision sparks, confetti)
// ============================================================================
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
  }

  addText(text, x, y, color = '#38bdf8') {
    this.floatingTexts.push({
      text,
      x,
      y,
      color,
      alpha: 1.0,
      vy: -1.2,
      life: 60,
    });
  }

  addBurst(x, y, count = 16, colors = ['#f59e0b', '#ef4444', '#f8fafc']) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = Math.random() * 3 + 1.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: Math.random() * 0.03 + 0.02,
      });
    }
  }

  addConfetti(width, height) {
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * -100,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: 0.005,
      });
    }
  }

  update() {
    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.life--;
      ft.alpha = Math.max(0, ft.life / 60);
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render(ctx) {
    // Render particles
    this.particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Render floating texts
    this.floatingTexts.forEach((ft) => {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.font = 'bold 15px system-ui, sans-serif';
      ctx.fillStyle = ft.color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });
  }

  clear() {
    this.particles = [];
    this.floatingTexts = [];
  }
}

// ============================================================================
// VEHICLE CLASS (Motor, Mobil, Bus with AI braking on red lights)
// ============================================================================
class Vehicle {
  constructor(type, laneY, direction, speed, canvasWidth) {
    this.type = type; // 'motorcycle', 'car', 'bus'
    this.laneY = laneY;
    this.direction = direction; // 1 = right, -1 = left
    this.targetSpeed = speed;
    this.currentSpeed = speed;
    this.canvasWidth = canvasWidth;

    // Dimensions & styling based on type
    if (type === 'motorcycle') {
      this.width = 40;
      this.height = 18;
      this.colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];
    } else if (type === 'bus') {
      this.width = 115;
      this.height = 36;
      this.colors = ['#f59e0b', '#2563eb', '#10b981'];
    } else {
      // Car
      this.width = 62;
      this.height = 28;
      this.colors = ['#38bdf8', '#e11d48', '#f8fafc', '#475569', '#a855f7'];
    }

    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

    // Initial position
    if (this.direction === 1) {
      this.x = -this.width - Math.random() * 120;
    } else {
      this.x = this.canvasWidth + Math.random() * 120;
    }

    this.y = this.laneY - this.height / 2;
    this.isBraking = false;
  }

  update(trafficLight, crosswalks, otherVehicles) {
    // Check if we need to stop for a red traffic light at any crosswalk
    this.isBraking = false;
    let shouldStop = false;
    let stopTargetX = null;

    if (trafficLight && (trafficLight.state === 'RED' || trafficLight.state === 'YELLOW')) {
      for (const cw of crosswalks) {
        // Only stop if crosswalk intersects this road
        if (this.direction === 1) {
          // Moving right -> stop line is before cw.x
          const stopLine = cw.x - 30;
          if (this.x + this.width < stopLine && this.x + this.width + 120 > stopLine) {
            shouldStop = true;
            stopTargetX = stopLine - this.width;
            break;
          }
        } else {
          // Moving left -> stop line is after cw.x + cw.width
          const stopLine = cw.x + cw.width + 30;
          if (this.x > stopLine && this.x - 120 < stopLine) {
            shouldStop = true;
            stopTargetX = stopLine;
            break;
          }
        }
      }
    }

    // Vehicle queuing: check for vehicle ahead in the same lane
    for (const other of otherVehicles) {
      if (other === this || Math.abs(other.y - this.y) > 15) continue;
      if (this.direction === 1) {
        const dist = other.x - (this.x + this.width);
        if (dist > 0 && dist < 45) {
          shouldStop = true;
          stopTargetX = other.x - this.width - 15;
          break;
        }
      } else {
        const dist = this.x - (other.x + other.width);
        if (dist > 0 && dist < 45) {
          shouldStop = true;
          stopTargetX = other.x + other.width + 15;
          break;
        }
      }
    }

    // Adjust speed smoothly
    if (shouldStop) {
      this.isBraking = true;
      if (stopTargetX !== null) {
        if (this.direction === 1 && this.x >= stopTargetX) {
          this.currentSpeed = 0;
          this.x = stopTargetX;
        } else if (this.direction === -1 && this.x <= stopTargetX) {
          this.currentSpeed = 0;
          this.x = stopTargetX;
        } else {
          this.currentSpeed = Math.max(0.3, this.currentSpeed * 0.88);
        }
      } else {
        this.currentSpeed = Math.max(0, this.currentSpeed - 0.2);
      }
    } else {
      // Accelerate back to target speed
      if (this.currentSpeed < this.targetSpeed) {
        this.currentSpeed = Math.min(this.targetSpeed, this.currentSpeed + 0.12);
      }
    }

    // Advance position
    this.x += this.direction * this.currentSpeed;
  }

  isOutOfBounds() {
    if (this.direction === 1) {
      return this.x > this.canvasWidth + 100;
    } else {
      return this.x + this.width < -100;
    }
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Cast soft shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(2, 4, this.width, this.height);

    // Vehicle Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.roundRect(0, 0, this.width, this.height, 6);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#1e293b';
    ctx.stroke();

    // Specific detailing
    if (this.type === 'motorcycle') {
      // Handlebars
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(this.direction === 1 ? this.width - 12 : 6, 2, 6, this.height - 4);
      // Rider Helmet
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (this.type === 'bus') {
      // Bus Windows
      ctx.fillStyle = '#38bdf8';
      const windowCount = 6;
      const wWidth = 10;
      const spacing = 16;
      for (let i = 0; i < windowCount; i++) {
        ctx.fillRect(10 + i * spacing, 4, wWidth, 6);
        ctx.fillRect(10 + i * spacing, this.height - 10, wWidth, 6);
      }
      // Roof AC unit
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.width / 2 - 15, this.height / 2 - 4, 30, 8);
    } else {
      // Standard Car
      // Windshield & rear glass
      ctx.fillStyle = '#38bdf8';
      const frontX = this.direction === 1 ? this.width - 18 : 6;
      const rearX = this.direction === 1 ? 8 : this.width - 18;
      // Front windshield
      ctx.fillRect(frontX, 4, 10, this.height - 8);
      // Rear windshield
      ctx.fillRect(rearX, 5, 8, this.height - 10);
      // Roof
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(rearX + (this.direction === 1 ? 8 : -8), 4, 14, this.height - 8);
    }

    // Headlights (Yellow glowing beams in front)
    ctx.fillStyle = '#fef08a';
    if (this.direction === 1) {
      ctx.fillRect(this.width - 2, 3, 3, 5);
      ctx.fillRect(this.width - 2, this.height - 8, 3, 5);
    } else {
      ctx.fillRect(-1, 3, 3, 5);
      ctx.fillRect(-1, this.height - 8, 3, 5);
    }

    // Taillights / Brake lights (Red)
    ctx.fillStyle = this.isBraking ? '#ff0000' : '#b91c1c';
    if (this.isBraking) {
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 8;
    }
    if (this.direction === 1) {
      ctx.fillRect(-1, 3, 3, 5);
      ctx.fillRect(-1, this.height - 8, 3, 5);
    } else {
      ctx.fillRect(this.width - 2, 3, 3, 5);
      ctx.fillRect(this.width - 2, this.height - 8, 3, 5);
    }

    ctx.restore();
  }

  getBounds() {
    // Generous collision box with 4px padding so gameplay feels fair
    return {
      x: this.x + 4,
      y: this.y + 3,
      width: this.width - 8,
      height: this.height - 6,
    };
  }
}

// ============================================================================
// TRAFFIC LIGHT MANAGER
// ============================================================================
class TrafficLight {
  constructor(greenSec = 7, yellowSec = 2, redSec = 6) {
    this.durations = {
      GREEN: greenSec * 60, // Vehicles move, pedestrians wait
      YELLOW: yellowSec * 60,
      RED: redSec * 60, // Vehicles stop, pedestrians walk
    };
    this.state = 'GREEN';
    this.timer = this.durations.GREEN;
  }

  update() {
    this.timer--;
    if (this.timer <= 0) {
      if (this.state === 'GREEN') {
        this.state = 'YELLOW';
        this.timer = this.durations.YELLOW;
      } else if (this.state === 'YELLOW') {
        this.state = 'RED';
        this.timer = this.durations.RED;
      } else {
        this.state = 'GREEN';
        this.timer = this.durations.GREEN;
      }
    }
  }

  getPedestrianState() {
    // When vehicle light is RED -> Pedestrian signal is GREEN (Aman menyeberang)
    // When vehicle light is GREEN or YELLOW -> Pedestrian signal is RED (Tunggu)
    return this.state === 'RED' ? 'WALK' : 'WAIT';
  }

  getSecondsLeft() {
    return Math.ceil(this.timer / 60);
  }

  render(ctx, x, y) {
    ctx.save();
    // Traffic Light Housing
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(x - 12, y - 40, 24, 60, 6);
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pole
    ctx.fillStyle = '#475569';
    ctx.fillRect(x - 3, y + 20, 6, 25);

    // Bulbs (Red, Yellow, Green for vehicles)
    const bulbRadius = 6;
    const isRed = this.state === 'RED';
    const isYellow = this.state === 'YELLOW';
    const isGreen = this.state === 'GREEN';

    // Red Bulb
    ctx.fillStyle = isRed ? '#ef4444' : '#450a0a';
    if (isRed) {
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
    }
    ctx.beginPath();
    ctx.arc(x, y - 26, bulbRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Yellow Bulb
    ctx.fillStyle = isYellow ? '#f59e0b' : '#451a03';
    if (isYellow) {
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
    }
    ctx.beginPath();
    ctx.arc(x, y - 10, bulbRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Green Bulb
    ctx.fillStyle = isGreen ? '#10b981' : '#022c22';
    if (isGreen) {
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
    }
    ctx.beginPath();
    ctx.arc(x, y + 6, bulbRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pedestrian Signal Box attached to pole
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 14, y - 20, 26, 32);
    ctx.strokeRect(x + 14, y - 20, 26, 32);

    const pedWalk = this.getPedestrianState() === 'WALK';
    ctx.font = '16px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pedWalk ? '🚶' : '🛑', x + 27, y - 4);

    ctx.restore();
  }
}

// ============================================================================
// PLAYER CHARACTER CLASS
// ============================================================================
class Player {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 24;
    this.height = 24;
    this.speed = 3.0;
    this.facing = 'UP'; // UP, DOWN, LEFT, RIGHT
    this.isMoving = false;
    this.walkCycle = 0;
    this.invulnerableTimer = 0; // Invincible after respawn
    this.zebraCrossAwarded = {}; // Track which crosswalks awarded points this attempt
    this.reset();
  }

  reset(toMedianY = null) {
    this.x = this.canvasWidth / 2 - this.width / 2;
    this.y = toMedianY !== null ? toMedianY : this.canvasHeight - 48;
    this.facing = 'UP';
    this.isMoving = false;
    this.invulnerableTimer = 90; // ~1.5 sec flicker
    this.zebraCrossAwarded = {};
  }

  update(keys) {
    let dx = 0;
    let dy = 0;

    if (keys.ArrowUp || keys.KeyW) {
      dy -= 1;
      this.facing = 'UP';
    }
    if (keys.ArrowDown || keys.KeyS) {
      dy += 1;
      this.facing = 'DOWN';
    }
    if (keys.ArrowLeft || keys.KeyA) {
      dx -= 1;
      this.facing = 'LEFT';
    }
    if (keys.ArrowRight || keys.KeyD) {
      dx += 1;
      this.facing = 'RIGHT';
    }

    if (dx !== 0 && dy !== 0) {
      // Normalize diagonal speed
      dx *= 0.7071;
      dy *= 0.7071;
    }

    this.isMoving = dx !== 0 || dy !== 0;

    if (this.isMoving) {
      this.x += dx * this.speed;
      this.y += dy * this.speed;
      this.walkCycle += 0.2;

      // Footstep sound blip occasionally
      if (Math.floor(this.walkCycle) % 8 === 0) {
        sounds.playStep();
      }
    }

    // Keep player within bounds
    this.x = Math.max(12, Math.min(this.canvasWidth - this.width - 12, this.x));
    this.y = Math.max(12, Math.min(this.canvasHeight - this.height - 12, this.y));

    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer--;
    }
  }

  render(ctx) {
    // If invulnerable, flicker
    if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer / 6) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    // Rotate based on facing
    let angle = 0;
    if (this.facing === 'DOWN') angle = Math.PI;
    if (this.facing === 'LEFT') angle = -Math.PI / 2;
    if (this.facing === 'RIGHT') angle = Math.PI / 2;
    ctx.rotate(angle);

    // Walking animation feet swing
    const swing = this.isMoving ? Math.sin(this.walkCycle) * 5 : 0;

    // Shoes / Feet
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.ellipse(-7, -4 + swing, 3.5, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(7, -4 - swing, 3.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body / Shirt (Traffic Safety Teal/Green Jacket)
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.roundRect(-9, -7, 18, 14, 4);
    ctx.fill();

    // Safety reflective vest stripes
    ctx.fillStyle = '#fde047';
    ctx.fillRect(-7, -3, 14, 3);

    // Backpack
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.roundRect(-6, 2, 12, 6, 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#fed7aa'; // Skin tone
    ctx.beginPath();
    ctx.arc(0, -6, 6, 0, Math.PI * 2);
    ctx.fill();

    // Cap / Hair (Yellow safety cap)
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(0, -7, 6, Math.PI, Math.PI * 2);
    ctx.fill();
    // Cap visor
    ctx.fillRect(-4, -13, 8, 3);

    ctx.restore();
  }

  getBounds() {
    return {
      x: this.x + 3,
      y: this.y + 3,
      width: this.width - 6,
      height: this.height - 6,
    };
  }
}

// ============================================================================
// MAIN GAME CONTROLLER
// ============================================================================
class TrafficHeroGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // State
    this.gameState = 'MENU'; // MENU, PLAYING, PAUSED, LEVEL_COMPLETE, GAME_OVER, VICTORY
    this.level = 1;
    this.maxLevel = 3;
    this.score = 0;
    this.lives = 3;
    this.maxLives = 3;
    this.highScore = parseInt(localStorage.getItem('traffic_hero_high_score') || '0', 10);
    this.hitCountThisLevel = 0;

    // Systems
    this.particles = new ParticleSystem();
    this.player = new Player(this.width, this.height);
    this.vehicles = [];
    this.crosswalks = [];
    this.trafficLight = null;
    this.roadZones = [];
    this.sidewalkZones = [];
    this.finishZone = null;

    // Input
    this.keys = {};
    this.lastTip = '';
    this.tipTimer = 0;

    // Animation frame handle
    this.animationId = null;

    // DOM Elements
    this.dom = {
      hud: document.getElementById('game-hud'),
      hudScore: document.getElementById('hud-score'),
      hudLevel: document.getElementById('hud-level'),
      hudLives: document.getElementById('hud-lives'),
      pedBadge: document.getElementById('ped-signal-badge'),
      pedIcon: document.getElementById('ped-signal-icon'),
      pedText: document.getElementById('ped-signal-text'),
      pedTimer: document.getElementById('ped-signal-timer'),
      eduBanner: document.getElementById('edu-banner'),
      eduText: document.getElementById('edu-text'),
      btnSound: document.getElementById('btn-sound-toggle'),
      soundIcon: document.getElementById('sound-icon'),
      btnPause: document.getElementById('btn-pause'),
      // Screens
      screenMenu: document.getElementById('screen-menu'),
      screenPause: document.getElementById('screen-pause'),
      screenLevelComplete: document.getElementById('screen-level-complete'),
      screenGameOver: document.getElementById('screen-game-over'),
      screenVictory: document.getElementById('screen-victory'),
      modalHowToPlay: document.getElementById('modal-how-to-play'),
      // Buttons
      btnStart: document.getElementById('btn-start'),
      btnHowToPlay: document.getElementById('btn-how-to-play'),
      btnCloseHow: document.getElementById('btn-close-how'),
      btnStartFromGuide: document.getElementById('btn-start-from-guide'),
      btnResume: document.getElementById('btn-resume'),
      btnRestartLevel: document.getElementById('btn-restart-level'),
      btnPauseHome: document.getElementById('btn-pause-home'),
      btnNextLevel: document.getElementById('btn-next-level'),
      btnRetry: document.getElementById('btn-retry'),
      btnFailHome: document.getElementById('btn-fail-home'),
      btnPlayAgain: document.getElementById('btn-play-again'),
      btnVictoryHome: document.getElementById('btn-victory-home'),
      // Text displays
      menuHighScore: document.getElementById('menu-high-score'),
      completeLevelTitle: document.getElementById('complete-level-title'),
      completeLevelScore: document.getElementById('complete-level-score'),
      completeBonusScore: document.getElementById('complete-bonus-score'),
      completeTotalScore: document.getElementById('complete-total-score'),
      completeEduTip: document.getElementById('complete-edu-tip'),
      failLevel: document.getElementById('fail-level'),
      failScore: document.getElementById('fail-score'),
      failHighScore: document.getElementById('fail-high-score'),
      failEduTip: document.getElementById('fail-edu-tip'),
      victoryScore: document.getElementById('victory-score'),
      victoryLives: document.getElementById('victory-lives'),
    };

    this.initEvents();
    this.updateHighScoreDisplay();
  }

  initEvents() {
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      // Prevent browser scroll on arrow keys and space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (this.gameState === 'PLAYING') {
          this.pauseGame();
        } else if (this.gameState === 'PAUSED') {
          this.resumeGame();
        }
        return;
      }

      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Button Listeners
    this.dom.btnStart.addEventListener('click', () => this.startNewGame());
    this.dom.btnHowToPlay.addEventListener('click', () => this.openHowToPlay());
    this.dom.btnCloseHow.addEventListener('click', () => this.closeHowToPlay());
    this.dom.btnStartFromGuide.addEventListener('click', () => {
      this.closeHowToPlay();
      this.startNewGame();
    });

    this.dom.btnPause.addEventListener('click', () => this.pauseGame());
    this.dom.btnResume.addEventListener('click', () => this.resumeGame());
    this.dom.btnRestartLevel.addEventListener('click', () => this.restartCurrentLevel());
    this.dom.btnPauseHome.addEventListener('click', () => this.returnToHome());

    this.dom.btnNextLevel.addEventListener('click', () => this.advanceToNextLevel());
    this.dom.btnRetry.addEventListener('click', () => this.startNewGame());
    this.dom.btnFailHome.addEventListener('click', () => this.returnToHome());

    this.dom.btnPlayAgain.addEventListener('click', () => this.startNewGame());
    this.dom.btnVictoryHome.addEventListener('click', () => this.returnToHome());

    // Sound Toggle
    this.dom.btnSound.addEventListener('click', () => {
      const isMuted = sounds.toggleMute();
      this.dom.soundIcon.textContent = isMuted ? '🔇' : '🔊';
    });
  }

  updateHighScoreDisplay() {
    this.dom.menuHighScore.textContent = this.highScore;
  }

  saveHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('traffic_hero_high_score', this.highScore.toString());
      this.updateHighScoreDisplay();
    }
  }

  openHowToPlay() {
    this.dom.modalHowToPlay.classList.remove('hidden');
  }

  closeHowToPlay() {
    this.dom.modalHowToPlay.classList.add('hidden');
  }

  setEducationalTip(text, isAlert = false) {
    this.dom.eduText.textContent = text;
    if (isAlert) {
      this.dom.eduBanner.classList.add('alert');
    } else {
      this.dom.eduBanner.classList.remove('alert');
    }
  }

  // ==========================================================================
  // LEVEL SETUP
  // ==========================================================================
  setupLevel(lvl) {
    this.level = lvl;
    this.vehicles = [];
    this.crosswalks = [];
    this.roadZones = [];
    this.sidewalkZones = [];
    this.hitCountThisLevel = 0;
    this.particles.clear();

    if (lvl === 1) {
      // LEVEL 1: Jalan Perumahan (Residential Street - 2 Lanes)
      // Top Sidewalk (Finish): y 0 to 90
      // Road: y 90 to 450 (2 lanes)
      // Bottom Sidewalk (Start): y 450 to 600
      this.finishZone = { x: 0, y: 0, width: this.width, height: 90 };
      this.sidewalkZones = [
        { x: 0, y: 0, width: this.width, height: 90, label: 'Trotoar Tujuan' },
        { x: 0, y: 460, width: this.width, height: 140, label: 'Trotoar Mulai' },
      ];
      this.roadZones = [{ x: 0, y: 90, width: this.width, height: 370 }];

      // 1 Central Zebra Crossing
      this.crosswalks = [
        { id: 'cw-1', x: 420, y: 90, width: 120, height: 370 },
      ];

      // Traffic Light
      this.trafficLight = new TrafficLight(8, 2, 7);

      // Lane configurations: Lane 1 (going right), Lane 2 (going left)
      this.lanes = [
        { y: 180, direction: 1, speedRange: [2.0, 2.8], types: ['car', 'motorcycle'], spawnTimer: 0, interval: 140 },
        { y: 350, direction: -1, speedRange: [2.0, 2.8], types: ['car', 'motorcycle'], spawnTimer: 60, interval: 140 },
      ];

      this.player.reset();
      this.setEducationalTip('Level 1: Gunakan zebra crossing dan tunggu lampu pejalan hijau sebelum menyeberang!');

    } else if (lvl === 2) {
      // LEVEL 2: Jalan Perkotaan (City Avenue - 4 Lanes with Central Refuge Island)
      // Top Sidewalk (Finish): y 0 to 70
      // Road 1 (2 lanes): y 70 to 240
      // Center Refuge Island (Trotoar Pemisah): y 240 to 320
      // Road 2 (2 lanes): y 320 to 490
      // Bottom Sidewalk (Start): y 490 to 600
      this.finishZone = { x: 0, y: 0, width: this.width, height: 70 };
      this.sidewalkZones = [
        { x: 0, y: 0, width: this.width, height: 70, label: 'Trotoar Finish' },
        { x: 0, y: 240, width: this.width, height: 80, label: 'Trotoar Pemisah (Pulau Aman)' },
        { x: 0, y: 490, width: this.width, height: 110, label: 'Trotoar Mulai' },
      ];
      this.roadZones = [
        { x: 0, y: 70, width: this.width, height: 170 },
        { x: 0, y: 320, width: this.width, height: 170 },
      ];

      // 2 Zebra Crossings (staggered or aligned)
      this.crosswalks = [
        { id: 'cw-north', x: 380, y: 70, width: 110, height: 170 },
        { id: 'cw-south', x: 470, y: 320, width: 110, height: 170 },
      ];

      // Dynamic Traffic Light
      this.trafficLight = new TrafficLight(7, 2, 6);

      this.lanes = [
        // Road 1 (top)
        { y: 115, direction: 1, speedRange: [2.5, 3.2], types: ['car', 'bus'], spawnTimer: 0, interval: 130 },
        { y: 195, direction: 1, speedRange: [2.8, 3.6], types: ['car', 'motorcycle'], spawnTimer: 70, interval: 120 },
        // Road 2 (bottom)
        { y: 365, direction: -1, speedRange: [2.6, 3.4], types: ['bus', 'car'], spawnTimer: 30, interval: 130 },
        { y: 445, direction: -1, speedRange: [3.0, 4.0], types: ['motorcycle', 'car'], spawnTimer: 90, interval: 110 },
      ];

      this.player.reset();
      this.setEducationalTip('Level 2: Manfaatkan Trotoar Pemisah di tengah jalan untuk beristirahat aman sebelum menyeberang bagian berikutnya.');

    } else {
      // LEVEL 3: Simpang Ramai (Busy Boulevard - Rapid Multi-lane traffic)
      // Top Sidewalk: y 0 to 60
      // Center Boulevard: y 60 to 500 (4 dynamic lanes)
      // Bottom Sidewalk: y 500 to 600
      this.finishZone = { x: 0, y: 0, width: this.width, height: 60 };
      this.sidewalkZones = [
        { x: 0, y: 0, width: this.width, height: 60, label: 'Trotoar Finish' },
        { x: 0, y: 500, width: this.width, height: 100, label: 'Trotoar Mulai' },
      ];
      this.roadZones = [{ x: 0, y: 60, width: this.width, height: 440 }];

      // Two zebra cross options
      this.crosswalks = [
        { id: 'cw-left', x: 260, y: 60, width: 100, height: 440 },
        { id: 'cw-right', x: 620, y: 60, width: 100, height: 440 },
      ];

      this.trafficLight = new TrafficLight(6, 2, 7);

      this.lanes = [
        { y: 120, direction: 1, speedRange: [2.8, 3.6], types: ['car', 'bus'], spawnTimer: 0, interval: 110 },
        { y: 215, direction: 1, speedRange: [3.4, 4.4], types: ['motorcycle', 'car'], spawnTimer: 50, interval: 95 },
        { y: 330, direction: -1, speedRange: [2.6, 3.4], types: ['bus', 'car'], spawnTimer: 20, interval: 105 },
        { y: 425, direction: -1, speedRange: [3.6, 4.6], types: ['motorcycle', 'car'], spawnTimer: 80, interval: 90 },
      ];

      this.player.reset();
      this.setEducationalTip('Level 3: Jalanan sangat ramai! Waspadai kendaraan berkecepatan tinggi dan patuhi lampu lalu lintas!');
    }

    // Pre-populate some vehicles on lanes
    this.lanes.forEach((lane) => {
      const type = lane.types[Math.floor(Math.random() * lane.types.length)];
      const speed = lane.speedRange[0] + Math.random() * (lane.speedRange[1] - lane.speedRange[0]);
      const v = new Vehicle(type, lane.y, lane.direction, speed, this.width);
      v.x = Math.random() * (this.width - 200) + 100;
      this.vehicles.push(v);
    });

    this.updateHUD();
  }

  // ==========================================================================
  // GAME LIFECYCLE & STATE MANAGEMENT
  // ==========================================================================
  startNewGame() {
    this.score = 0;
    this.lives = this.maxLives;
    this.level = 1;
    this.hideAllScreens();
    this.dom.hud.classList.remove('hidden');
    this.dom.eduBanner.classList.remove('hidden');
    this.dom.btnPause.classList.remove('hidden');

    this.setupLevel(1);
    this.gameState = 'PLAYING';

    if (!this.animationId) {
      this.lastFrameTime = performance.now();
      this.gameLoop();
    }
  }

  restartCurrentLevel() {
    this.hideAllScreens();
    this.setupLevel(this.level);
    this.gameState = 'PLAYING';
  }

  advanceToNextLevel() {
    this.level++;
    if (this.level > this.maxLevel) {
      this.showVictoryScreen();
    } else {
      this.hideAllScreens();
      this.setupLevel(this.level);
      this.gameState = 'PLAYING';
    }
  }

  pauseGame() {
    if (this.gameState !== 'PLAYING') return;
    this.gameState = 'PAUSED';
    this.dom.screenPause.classList.remove('hidden');
  }

  resumeGame() {
    if (this.gameState !== 'PAUSED') return;
    this.dom.screenPause.classList.add('hidden');
    this.gameState = 'PLAYING';
  }

  returnToHome() {
    this.gameState = 'MENU';
    this.hideAllScreens();
    this.dom.hud.classList.add('hidden');
    this.dom.eduBanner.classList.add('hidden');
    this.dom.btnPause.classList.add('hidden');
    this.dom.screenMenu.classList.remove('hidden');
    this.updateHighScoreDisplay();
  }

  hideAllScreens() {
    this.dom.screenMenu.classList.add('hidden');
    this.dom.modalHowToPlay.classList.add('hidden');
    this.dom.screenPause.classList.add('hidden');
    this.dom.screenLevelComplete.classList.add('hidden');
    this.dom.screenGameOver.classList.add('hidden');
    this.dom.screenVictory.classList.add('hidden');
  }

  showLevelCompleteScreen() {
    this.gameState = 'LEVEL_COMPLETE';
    sounds.playLevelComplete();

    // Scoring
    const levelBase = 100;
    const noHitBonus = this.hitCountThisLevel === 0 ? 50 : 0;
    this.score += levelBase + noHitBonus;
    this.saveHighScore();
    this.updateHUD();

    // Configure complete modal
    this.dom.completeLevelTitle.textContent = `Level ${this.level} Berhasil Dilewati! 🎉`;
    this.dom.completeLevelScore.textContent = `+${levelBase}`;
    this.dom.completeBonusScore.textContent = noHitBonus > 0 ? `+${noHitBonus} (Bonus!)` : '0';
    this.dom.completeTotalScore.textContent = `${this.score}`;

    const tips = [
      'Hebat! Menyeberang di zebra crossing dengan sabar menjamin keselamatanmu dan pengguna jalan lain.',
      'Luar biasa! Trotoar pemisah adalah tempat aman untuk mengecek kembali arah lalu lintas sebelum lanjut.',
      'Sempurna! Kamu telah memahami irama lampu lalu lintas dengan sangat baik.',
    ];
    this.dom.completeEduTip.textContent = `"${tips[this.level - 1] || tips[0]}"`;

    this.dom.screenLevelComplete.classList.remove('hidden');
  }

  showGameOverScreen() {
    this.gameState = 'GAME_OVER';
    sounds.playGameOver();
    this.saveHighScore();

    this.dom.failLevel.textContent = `Level ${this.level}`;
    this.dom.failScore.textContent = `${this.score}`;
    this.dom.failHighScore.textContent = `${this.highScore}`;
    this.dom.screenGameOver.classList.remove('hidden');
  }

  showVictoryScreen() {
    this.gameState = 'VICTORY';
    sounds.playVictory();
    this.particles.addConfetti(this.width, this.height);
    this.saveHighScore();

    this.dom.victoryScore.textContent = `${this.score}`;
    this.dom.victoryLives.textContent = `${this.lives} / ${this.maxLives}`;

    // Stars calculation based on remaining lives & score
    const starsContainer = document.getElementById('victory-stars');
    if (starsContainer) {
      let activeStars = 3;
      if (this.lives === 1) activeStars = 1;
      else if (this.lives === 2) activeStars = 2;
      starsContainer.innerHTML = [1, 2, 3]
        .map((s) => `<span class="star ${s <= activeStars ? 'active' : ''}">★</span>`)
        .join('');
    }

    this.dom.screenVictory.classList.remove('hidden');
  }

  handlePlayerCollision() {
    if (this.player.invulnerableTimer > 0) return;

    this.lives--;
    this.hitCountThisLevel++;
    this.score = Math.max(0, this.score - 20);
    this.particles.addText('-20 Poin!', this.player.x, this.player.y, '#ef4444');
    this.particles.addBurst(this.player.x + 12, this.player.y + 12, 20, ['#ef4444', '#f59e0b', '#ffffff']);
    sounds.playCrash();
    sounds.playHorn();

    this.updateHUD();

    if (this.lives <= 0) {
      this.showGameOverScreen();
    } else {
      // In level 2, if player reached median island, respawn at median island for good fairness
      let respawnY = null;
      if (this.level === 2 && this.player.y < 280) {
        respawnY = 270;
      }
      this.player.reset(respawnY);
      this.setEducationalTip('Aduh! Jangan menyeberang sembarangan saat kendaraan sedang melaju kencang!', true);
    }
  }

  updateHUD() {
    this.dom.hudScore.textContent = this.score;
    this.dom.hudLevel.textContent = `${this.level} / ${this.maxLevel}`;

    // Update lives display
    const hearts = this.dom.hudLives.querySelectorAll('.heart');
    hearts.forEach((heart, idx) => {
      if (idx < this.lives) {
        heart.classList.remove('lost');
      } else {
        heart.classList.add('lost');
      }
    });

    // Update Pedestrian Signal Badge
    if (this.trafficLight) {
      const pedState = this.trafficLight.getPedestrianState();
      const secs = this.trafficLight.getSecondsLeft();
      this.dom.pedTimer.textContent = `${secs}s`;

      if (pedState === 'WALK') {
        this.dom.pedBadge.className = 'ped-signal green';
        this.dom.pedIcon.textContent = '🟢';
        this.dom.pedText.textContent = 'MENYEBERANG';
      } else {
        this.dom.pedBadge.className = 'ped-signal red';
        this.dom.pedIcon.textContent = '🛑';
        this.dom.pedText.textContent = 'TUNGGU';
      }
    }
  }

  // ==========================================================================
  // GAME LOOP: UPDATE & RENDER
  // ==========================================================================
  gameLoop() {
    if (this.gameState === 'PLAYING') {
      this.update();
    }
    this.render();

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // 1. Update Traffic Light
    if (this.trafficLight) {
      this.trafficLight.update();
      this.updateHUD();
    }

    // 2. Spawn & Update Vehicles
    this.lanes.forEach((lane) => {
      lane.spawnTimer++;
      if (lane.spawnTimer >= lane.interval) {
        lane.spawnTimer = 0;
        const type = lane.types[Math.floor(Math.random() * lane.types.length)];
        const speed = lane.speedRange[0] + Math.random() * (lane.speedRange[1] - lane.speedRange[0]);
        this.vehicles.push(new Vehicle(type, lane.y, lane.direction, speed, this.width));
      }
    });

    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      v.update(this.trafficLight, this.crosswalks, this.vehicles);
      if (v.isOutOfBounds()) {
        this.vehicles.splice(i, 1);
      }
    }

    // 3. Update Player
    this.player.update(this.keys);

    // 4. Check Collisions: Player vs Vehicles
    const playerBox = this.player.getBounds();
    for (const v of this.vehicles) {
      const vBox = v.getBounds();
      if (
        playerBox.x < vBox.x + vBox.width &&
        playerBox.x + playerBox.width > vBox.x &&
        playerBox.y < vBox.y + vBox.height &&
        playerBox.y + playerBox.height > vBox.y
      ) {
        this.handlePlayerCollision();
        break;
      }
    }

    // 5. Check Zebra Crossing interactions
    let onZebra = false;
    for (const cw of this.crosswalks) {
      if (
        this.player.x + this.player.width > cw.x &&
        this.player.x < cw.x + cw.width &&
        this.player.y + this.player.height > cw.y &&
        this.player.y < cw.y + cw.height
      ) {
        onZebra = true;
        // Award points if not awarded for this crosswalk yet
        if (!this.player.zebraCrossAwarded[cw.id]) {
          this.player.zebraCrossAwarded[cw.id] = true;
          this.score += 10;
          this.particles.addText('+10 Zebra Cross!', this.player.x, this.player.y - 10, '#34d399');
          sounds.playPoint();
          this.updateHUD();
        }
      }
    }

    // 6. Educational Tip Context Monitor
    this.updateEducationalContext(onZebra);

    // 7. Check Victory condition for current level
    if (this.finishZone && this.player.y <= this.finishZone.height) {
      this.showLevelCompleteScreen();
    }

    // 8. Update Particles
    this.particles.update();
  }

  updateEducationalContext(onZebra) {
    this.tipTimer++;
    if (this.tipTimer < 45) return; // Don't flip tips too rapidly
    this.tipTimer = 0;

    let inRoad = false;
    for (const r of this.roadZones) {
      if (this.player.y > r.y && this.player.y < r.y + r.height) {
        inRoad = true;
        break;
      }
    }

    const pedWalk = this.trafficLight ? this.trafficLight.getPedestrianState() === 'WALK' : false;

    if (inRoad) {
      if (onZebra) {
        if (pedWalk) {
          this.setEducationalTip('✅ Sangat bagus! Menyeberang di zebra crossing saat lampu aman.');
        } else {
          this.setEducationalTip('⚠️ Waspada! Lampu kendaraan masih hijau, perhatikan laju kendaraan!');
        }
      } else {
        this.setEducationalTip('⚠️ Bahaya! Jangan menyeberang di luar zebra crossing!', true);
      }
    } else {
      // On sidewalk
      if (this.trafficLight && !pedWalk) {
        this.setEducationalTip('🛑 Tunggu di trotoar sampai lampu pejalan kaki berubah hijau.');
      } else if (this.trafficLight && pedWalk) {
        this.setEducationalTip('🟢 Lampu pejalan sudah hijau! Silakan menyeberang melalui zebra crossing.');
      } else {
        this.setEducationalTip('🚶 Berjalanlah di trotoar dengan tenang dan selalu awas.');
      }
    }
  }

  // ==========================================================================
  // RENDER WORLD (Background, roads, sidewalks, markings, trees, signs)
  // ==========================================================================
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Road Asphalt
    this.ctx.fillStyle = '#2b303c';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Draw Sidewalks & Curb edges
    this.sidewalkZones.forEach((sw) => {
      // Sidewalk paving pattern
      this.ctx.fillStyle = '#64748b';
      this.ctx.fillRect(sw.x, sw.y, sw.width, sw.height);

      // Sidewalk tiles texture
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      this.ctx.lineWidth = 1;
      const tileSize = 24;
      for (let x = sw.x; x < sw.x + sw.width; x += tileSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, sw.y);
        this.ctx.lineTo(x, sw.y + sw.height);
        this.ctx.stroke();
      }
      for (let y = sw.y; y < sw.y + sw.height; y += tileSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(sw.x, y);
        this.ctx.lineTo(sw.x + sw.width, y);
        this.ctx.stroke();
      }

      // Curb edge border (dark stone line)
      this.ctx.fillStyle = '#475569';
      this.ctx.fillRect(sw.x, sw.y + sw.height - 4, sw.width, 4);
      this.ctx.fillRect(sw.x, sw.y, sw.width, 4);
    });

    // 3. Draw Finish Line Banner (Top Sidewalk)
    if (this.finishZone) {
      this.ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      this.ctx.fillRect(this.finishZone.x, this.finishZone.y, this.finishZone.width, this.finishZone.height);

      // Checkered pattern finish line at finish edge
      const checkSize = 10;
      for (let x = 0; x < this.width; x += checkSize * 2) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x, this.finishZone.height - checkSize, checkSize, checkSize);
        this.ctx.fillStyle = '#10b981';
        this.ctx.fillRect(x + checkSize, this.finishZone.height - checkSize, checkSize, checkSize);
      }

      // Text Area Aman / Finish
      this.ctx.font = 'bold 13px system-ui';
      this.ctx.fillStyle = '#6ee7b7';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('🏁 AREA FINISH (TUJUAN AMAN)', this.width / 2, 28);
    }

    // 4. Draw Road markings (Lanes & Dividers)
    this.lanes.forEach((lane) => {
      // Dashed lane divider line
      this.ctx.strokeStyle = '#f8fafc';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([16, 20]);
      this.ctx.beginPath();
      this.ctx.moveTo(0, lane.y);
      this.ctx.lineTo(this.width, lane.y);
      this.ctx.stroke();
      this.ctx.setLineDash([]); // Reset
    });

    // 5. Draw Zebra Crossings
    this.crosswalks.forEach((cw) => {
      // Dark asphalt backing
      this.ctx.fillStyle = '#1f242d';
      this.ctx.fillRect(cw.x, cw.y, cw.width, cw.height);

      // Crisp White Crosswalk Stripes
      this.ctx.fillStyle = '#f8fafc';
      const stripeHeight = 18;
      const stripeGap = 16;
      for (let y = cw.y + 4; y < cw.y + cw.height - 12; y += stripeHeight + stripeGap) {
        this.ctx.fillRect(cw.x + 6, y, cw.width - 12, stripeHeight);
      }

      // Solid Stop Line for Vehicles before Zebra Crossing
      this.ctx.fillStyle = '#ef4444';
      this.ctx.fillRect(cw.x - 24, cw.y, 6, cw.height);
      this.ctx.fillRect(cw.x + cw.width + 18, cw.y, 6, cw.height);

      // Stop Line Text
      this.ctx.font = 'bold 9px system-ui';
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('GARIS HENTI', cw.x - 21, cw.y + 20);
      this.ctx.fillText('GARIS HENTI', cw.x + cw.width + 21, cw.y + 20);
    });

    // 6. Draw Traffic Light Poles beside crosswalks
    if (this.trafficLight && this.crosswalks.length > 0) {
      this.crosswalks.forEach((cw) => {
        // Place traffic light pole on the upper curb of the road
        this.trafficLight.render(this.ctx, cw.x + cw.width + 28, cw.y + 4);
      });
    }

    // 7. Decorative Urban Elements (Trees, Benches, Streetlights)
    this.renderUrbanDecorations();

    // 8. Render Vehicles
    this.vehicles.forEach((v) => v.render(this.ctx));

    // 9. Render Player Character
    this.player.render(this.ctx);

    // 10. Render Particles & Floating text
    this.particles.render(this.ctx);
  }

  renderUrbanDecorations() {
    // Trees on sidewalks
    const treePositions = [
      { x: 60, y: 35 },
      { x: 220, y: 35 },
      { x: 740, y: 35 },
      { x: 900, y: 35 },
      { x: 80, y: 545 },
      { x: 880, y: 545 },
    ];

    treePositions.forEach((tree) => {
      // Tree shadow
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      this.ctx.beginPath();
      this.ctx.arc(tree.x + 2, tree.y + 2, 14, 0, Math.PI * 2);
      this.ctx.fill();

      // Tree foliage (layered green circles)
      this.ctx.fillStyle = '#15803d';
      this.ctx.beginPath();
      this.ctx.arc(tree.x, tree.y, 14, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = '#22c55e';
      this.ctx.beginPath();
      this.ctx.arc(tree.x - 3, tree.y - 3, 10, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Street Sign (Rambu Lalu Lintas Pejalan)
    const signX = 140;
    const signY = this.height - 40;
    this.ctx.fillStyle = '#3b82f6';
    this.ctx.beginPath();
    this.ctx.arc(signX, signY, 12, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.font = '12px system-ui';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('🚶', signX, signY);
  }
}

// ============================================================================
// BOOTSTRAP APPLICATION
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  const game = new TrafficHeroGame();
  window.trafficHeroGame = game;
});
