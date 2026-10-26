/* ==========================================================================
   CRYPT.SH // Gothic & Emo Coder Engine
   Features:
   - Interactive Gothic Matrix Rain & Occult Runes Canvas
   - Web Audio API Dark Ambient Drone Synth & Mechanical Click SFX
   - Realtime Soul Corruption Entropy & Dynamic Hex Cipher
   - Interactive Cyber-Sigil Geometric Canvas
   - Daemon Hacker Terminal with Streaming Logs & Custom Commands
   - Auth Tabs (GUI, CLI Terminal, SSH Dropzone)
   - CRT Scanline Toggle & Aesthetic Aura Switcher
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Live Millisecond UTC Clock
  // ==========================================================================
  const liveClock = document.getElementById('liveClock');
  function updateClock() {
    if (!liveClock) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    liveClock.textContent = `${h}:${m}:${s}.${ms}`;
  }
  setInterval(updateClock, 37);
  updateClock();

  // ==========================================================================
  // 2. CRT Scanline Toggle
  // ==========================================================================
  const toggleCrtBtn = document.getElementById('toggleCrtBtn');
  let crtActive = true;
  if (toggleCrtBtn) {
    toggleCrtBtn.addEventListener('click', () => {
      crtActive = !crtActive;
      document.body.classList.toggle('crt-active', crtActive);
      toggleCrtBtn.querySelector('.btn-text').textContent = crtActive ? 'CRT: ON' : 'CRT: OFF';
      playClickSfx(880, 'sine', 0.05);
      showToast(crtActive ? '📺 CRT Scanlines Engaged' : '📺 CRT Scanlines Disengaged');
    });
  }

  // ==========================================================================
  // 3. Theme Aura Switcher
  // ==========================================================================
  const auraDots = document.querySelectorAll('.aura-dot');
  auraDots.forEach(dot => {
    dot.addEventListener('click', () => {
      auraDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const aura = dot.getAttribute('data-aura');
      document.documentElement.setAttribute('data-theme', aura);
      playClickSfx(1050, 'triangle', 0.08);
      showToast(`⛧ Aura Shifted: ${aura.toUpperCase()}`);
    });
  });

  // ==========================================================================
  // 4. Fullscreen Background: Gothic Matrix Cyber Rain Canvas
  // ==========================================================================
  const canvas = document.getElementById('cyberMatrixCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  let width = 0;
  let height = 0;
  const chars = '0123456789ABCDEF⛧☩♰☠⛓⚰§ΨΩ$#_><{}/!†';
  const fontSize = 16;
  let columns = 0;
  let drops = [];
  let mouseX = -9999;
  let mouseY = -9999;

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  resizeCanvas();

  function drawMatrix() {
    if (!ctx) return;
    ctx.fillStyle = 'rgba(6, 5, 8, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    // Read current accent color
    const style = getComputedStyle(document.documentElement);
    const accentColor = style.getPropertyValue('--accent').trim() || '#e11d48';

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Glow head
      if (Math.random() > 0.88) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = accentColor;
        ctx.shadowBlur = 0;
      }

      ctx.fillText(text, x, y);

      // Repel from mouse slightly
      const dist = Math.hypot(x - mouseX, y - mouseY);
      if (dist < 80) {
        drops[i] += 2.5;
      }

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
  }
  if (canvas) requestAnimationFrame(drawMatrix);

  // ==========================================================================
  // 5. Web Audio API Dark Ambient Drone Synth & SFX
  // ==========================================================================
  let audioCtx = null;
  let isAudioPlaying = false;
  let droneOsc1 = null;
  let droneOsc2 = null;
  let droneSub = null;
  let droneFilter = null;
  let droneGain = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playClickSfx(freq = 800, type = 'sine', duration = 0.05) {
    try {
      initAudioContext();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback safe
    }
  }

  function startGothicDrone() {
    initAudioContext();
    if (!audioCtx) return;

    // Create Low-pass Filter for dark atmospheric mood
    droneFilter = audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(320, audioCtx.currentTime);

    // Master Drone Gain
    droneGain = audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    droneGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2.5);

    // Drone 1: Root A1 (55 Hz - Sawtooth)
    droneOsc1 = audioCtx.createOscillator();
    droneOsc1.type = 'sawtooth';
    droneOsc1.frequency.setValueAtTime(55, audioCtx.currentTime);

    // Drone 2: Fifth E2 (82.4 Hz - Triangle, detuned)
    droneOsc2 = audioCtx.createOscillator();
    droneOsc2.type = 'triangle';
    droneOsc2.frequency.setValueAtTime(82.4, audioCtx.currentTime);
    droneOsc2.detune.setValueAtTime(8, audioCtx.currentTime);

    // Sub Bass: Sub-octave 27.5 Hz
    droneSub = audioCtx.createOscillator();
    droneSub.type = 'sine';
    droneSub.frequency.setValueAtTime(27.5, audioCtx.currentTime);

    // Connect Graph
    droneOsc1.connect(droneFilter);
    droneOsc2.connect(droneFilter);
    droneSub.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    droneOsc1.start();
    droneOsc2.start();
    droneSub.start();
  }

  function stopGothicDrone() {
    if (droneGain && audioCtx) {
      droneGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        try {
          if (droneOsc1) droneOsc1.stop();
          if (droneOsc2) droneOsc2.stop();
          if (droneSub) droneSub.stop();
        } catch (e) {}
      }, 1300);
    }
  }

  const toggleAudioBtn = document.getElementById('toggleAudioBtn');
  const audioPlayToggle = document.getElementById('audioPlayToggle');
  const audioLivePill = document.getElementById('audioLivePill');
  const eqVisualizer = document.getElementById('eqVisualizer');
  const audioTile = document.getElementById('audioTile');

  function toggleAudioState() {
    isAudioPlaying = !isAudioPlaying;

    if (isAudioPlaying) {
      startGothicDrone();
      if (audioPlayToggle) audioPlayToggle.innerHTML = '<span class="play-icon">⏸</span> HALT DRONE';
      if (audioLivePill) {
        audioLivePill.textContent = 'ACTIVE';
        audioLivePill.classList.add('active');
      }
      if (audioTile) audioTile.classList.add('audio-playing');
      if (toggleAudioBtn) {
        document.getElementById('audioIcon').textContent = '🔊';
        document.getElementById('audioText').textContent = 'DRONE: ON';
      }
      showToast('♫ Dark Gothic Atmosphere Online (432Hz)');
    } else {
      stopGothicDrone();
      if (audioPlayToggle) audioPlayToggle.innerHTML = '<span class="play-icon">▶</span> START DRONE';
      if (audioLivePill) {
        audioLivePill.textContent = 'IDLE';
        audioLivePill.classList.remove('active');
      }
      if (audioTile) audioTile.classList.remove('audio-playing');
      if (toggleAudioBtn) {
        document.getElementById('audioIcon').textContent = '🔇';
        document.getElementById('audioText').textContent = 'EMO DRONE';
      }
      showToast('Silence restored to the crypt');
    }
  }

  if (toggleAudioBtn) toggleAudioBtn.addEventListener('click', toggleAudioState);
  if (audioPlayToggle) audioPlayToggle.addEventListener('click', toggleAudioState);

  // ==========================================================================
  // 6. Live Runic Entropy Calculation & Dynamic SHA3 Hash
  // ==========================================================================
  const cipherPass = document.getElementById('cipherPass');
  const entropyFill = document.getElementById('entropyFill');
  const entropyPercent = document.getElementById('entropyPercent');
  const passEntropyBadge = document.getElementById('passEntropyBadge');
  const liveHashString = document.getElementById('liveHashString');
  const runicDisplay = document.getElementById('runicDisplay');
  const scrambleSigilBtn = document.getElementById('scrambleSigilBtn');

  const gothRunes = ['⛧', '☩', '♰', '☠', '⛓', '⚰', '🕷', '†', '🖤', 'Ψ', 'Ω'];

  function pseudoHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = (Math.abs(hash * 99991) + 0x100000000000).toString(16);
    return (hex + '8f00b204e9800998ecf8427e0a4f').slice(0, 32);
  }

  function updateEntropy() {
    const val = cipherPass ? cipherPass.value : '';
    let score = 0;
    if (val.length > 0) score += 20;
    if (val.length >= 8) score += 30;
    if (val.length >= 14) score += 20;
    if (/[A-Z]/.test(val)) score += 10;
    if (/[0-9]/.test(val)) score += 10;
    if (/[^A-Za-z0-9]/.test(val)) score += 10;

    score = Math.min(score, 100);

    if (entropyFill) entropyFill.style.width = `${score}%`;

    if (score < 40) {
      if (entropyPercent) entropyPercent.textContent = `${score}% (CORRUPTIBLE)`;
      if (passEntropyBadge) {
        passEntropyBadge.textContent = 'WEAK';
        passEntropyBadge.style.color = '#ef4444';
        passEntropyBadge.style.borderColor = '#ef4444';
      }
    } else if (score < 75) {
      if (entropyPercent) entropyPercent.textContent = `${score}% (SHADOW VEILED)`;
      if (passEntropyBadge) {
        passEntropyBadge.textContent = 'MEDIUM';
        passEntropyBadge.style.color = '#f59e0b';
        passEntropyBadge.style.borderColor = '#f59e0b';
      }
    } else {
      if (entropyPercent) entropyPercent.textContent = `${score}% (UNBREAKABLE ARCANE)`;
      if (passEntropyBadge) {
        passEntropyBadge.textContent = 'ARCANE';
        passEntropyBadge.style.color = '#10b981';
        passEntropyBadge.style.borderColor = '#10b981';
      }
    }

    // Update Live Hash
    if (liveHashString) {
      liveHashString.textContent = pseudoHash(val || 'empty_soul');
    }

    // Refresh Runic Display
    refreshRunes();
  }

  function refreshRunes() {
    if (!runicDisplay) return;
    const cells = runicDisplay.querySelectorAll('.rune-cell');
    cells.forEach((cell, idx) => {
      if (cell.classList.contains('sigil-rune')) {
        cell.textContent = gothRunes[Math.floor(Math.random() * gothRunes.length)];
      } else {
        const hex = Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0');
        cell.textContent = `0x${hex}`;
      }
    });
  }

  if (cipherPass) {
    cipherPass.addEventListener('input', () => {
      playClickSfx(600 + Math.random() * 400, 'sine', 0.03);
      updateEntropy();
    });
    updateEntropy();
  }

  if (scrambleSigilBtn) {
    scrambleSigilBtn.addEventListener('click', () => {
      refreshRunes();
      playClickSfx(1400, 'square', 0.06);
      showToast('↺ Cryptographic Nonce Reshuffled');
    });
  }

  // Toggle Password Mask
  const togglePassBtn = document.getElementById('togglePassBtn');
  if (togglePassBtn && cipherPass) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = cipherPass.getAttribute('type') === 'password';
      cipherPass.setAttribute('type', isPass ? 'text' : 'password');
      togglePassBtn.textContent = isPass ? '[ MASK ]' : '[ UNMASK ]';
      playClickSfx(900, 'triangle', 0.04);
    });
  }

  // ==========================================================================
  // 7. Interactive Cyber-Sigil Canvas (Tile 6)
  // ==========================================================================
  const miniCanvas = document.getElementById('miniSigilCanvas');
  const miniCtx = miniCanvas ? miniCanvas.getContext('2d') : null;
  const sigilCoord = document.getElementById('sigilCoord');
  let angle = 0;
  let targetAngleSpeed = 0.015;
  let sigilMouseX = 50;
  let sigilMouseY = 50;

  function resizeMiniSigil() {
    if (!miniCanvas || !miniCtx) return;
    const rect = miniCanvas.getBoundingClientRect();
    miniCanvas.width = rect.width;
    miniCanvas.height = rect.height;
  }
  resizeMiniSigil();
  window.addEventListener('resize', resizeMiniSigil);

  if (miniCanvas) {
    miniCanvas.addEventListener('mousemove', (e) => {
      const rect = miniCanvas.getBoundingClientRect();
      sigilMouseX = e.clientX - rect.left;
      sigilMouseY = e.clientY - rect.top;
      if (sigilCoord) {
        sigilCoord.textContent = `X:${Math.round(sigilMouseX)} Y:${Math.round(sigilMouseY)}`;
      }
      targetAngleSpeed = 0.04;
    });

    miniCanvas.addEventListener('mouseleave', () => {
      targetAngleSpeed = 0.015;
    });
  }

  function drawMiniSigil() {
    if (!miniCtx || !miniCanvas) return;
    const w = miniCanvas.width;
    const h = miniCanvas.height;
    const cx = w / 2;
    const cy = h / 2;

    miniCtx.clearRect(0, 0, w, h);

    const style = getComputedStyle(document.documentElement);
    const accentColor = style.getPropertyValue('--accent').trim() || '#e11d48';

    angle += targetAngleSpeed;

    miniCtx.save();
    miniCtx.translate(cx, cy);
    miniCtx.rotate(angle);

    // Outer Circle
    miniCtx.strokeStyle = accentColor;
    miniCtx.lineWidth = 1;
    miniCtx.globalAlpha = 0.4;
    miniCtx.beginPath();
    miniCtx.arc(0, 0, 38, 0, Math.PI * 2);
    miniCtx.stroke();

    // Occult Geometric Star
    miniCtx.globalAlpha = 0.75;
    miniCtx.beginPath();
    const spikes = 5;
    const step = (Math.PI * 2) / spikes;
    for (let i = 0; i < spikes; i++) {
      const a1 = i * step;
      const a2 = ((i + 2) % spikes) * step;
      const x1 = Math.cos(a1) * 36;
      const y1 = Math.sin(a1) * 36;
      const x2 = Math.cos(a2) * 36;
      const y2 = Math.sin(a2) * 36;
      miniCtx.moveTo(x1, y1);
      miniCtx.lineTo(x2, y2);
    }
    miniCtx.stroke();

    // Inner Concentric Ring
    miniCtx.globalAlpha = 0.9;
    miniCtx.beginPath();
    miniCtx.arc(0, 0, 14, 0, Math.PI * 2);
    miniCtx.stroke();

    miniCtx.restore();

    requestAnimationFrame(drawMiniSigil);
  }
  if (miniCanvas) requestAnimationFrame(drawMiniSigil);

  // ==========================================================================
  // 8. Daemon Terminal: Auto-Stream & Interactive Commands (Tile 2)
  // ==========================================================================
  const terminalLogs = document.getElementById('terminalLogs');
  const quickCmdInput = document.getElementById('quickCmdInput');
  const clearLogsBtn = document.getElementById('clearLogsBtn');

  const emoQuotes = [
    '"Code like you are writing the last line before dawn."',
    '"Segmentation fault: my emotions dumped into core."',
    '"git checkout -b heartbreak-fix"',
    '"All dark modes are equal, but some are darker than others."',
    '"Crying in binary: 01100011 01110010 01111001"',
    '"Null pointer exception at feeling.h:404"',
    '"Black nail polish makes compilation 14% faster."',
    '"void soul() { while(true) { breathe(); code(); } }"'
  ];

  function addLog(text, type = 'sys', tag = '[LOG]') {
    if (!terminalLogs) return;
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const timeStr = new Date().toTimeString().split(' ')[0];
    entry.innerHTML = `[${timeStr}] <span class="tag-${type}">${tag}</span> ${text}`;
    terminalLogs.appendChild(entry);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  // Periodic random gothic telemetry
  setInterval(() => {
    if (!terminalLogs) return;
    const rand = Math.random();
    if (rand < 0.4) {
      const quote = emoQuotes[Math.floor(Math.random() * emoQuotes.length)];
      addLog(quote, 'emo', '[EMO]');
    } else if (rand < 0.7) {
      const hex = Array.from({length: 6}, () => Math.floor(Math.random()*256).toString(16).toUpperCase().padStart(2,'0')).join(' ');
      addLog(`Rerouting occult packets: ${hex}`, 'code', '[PACKET]');
    } else {
      addLog('Heartbeat probe acknowledged on /dev/soul', 'info', '[PULSE]');
    }
  }, 7500);

  if (clearLogsBtn) {
    clearLogsBtn.addEventListener('click', () => {
      if (terminalLogs) terminalLogs.innerHTML = '';
      addLog('Terminal buffer purged into oblivion.', 'sys', '[RESET]');
      playClickSfx(700, 'sine', 0.04);
    });
  }

  if (quickCmdInput) {
    quickCmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = quickCmdInput.value.trim().toLowerCase();
        if (!cmd) return;
        quickCmdInput.value = '';
        addLog(`$ ${cmd}`, 'sys', '[EXEC]');
        handleDaemonCommand(cmd);
      }
    });
  }

  function handleDaemonCommand(cmd) {
    playClickSfx(1100, 'square', 0.05);
    switch (cmd) {
      case 'help':
        addLog('Commands: help, bleed, sigil, quote, status, shambhavi, clear', 'info', '[HELP]');
        break;
      case 'shambhavi':
        addLog('User identified: shambhavi • Status: Supreme Arch-Goth Coder', 'info', '[IDENT]');
        showToast('👑 Greetings, Shambhavi. The crypt bows before you.');
        break;
      case 'bleed':
        document.documentElement.setAttribute('data-theme', 'crimson');
        addLog('Bleeding interface into Crimson Obsidian.', 'warn', '[BLEED]');
        showToast('🩸 Crimson aura applied.');
        break;
      case 'sigil':
        refreshRunes();
        addLog('Occult sigil recalculated with dynamic nonce.', 'code', '[SIGIL]');
        break;
      case 'quote':
        const quote = emoQuotes[Math.floor(Math.random() * emoQuotes.length)];
        addLog(quote, 'emo', '[QUOTE]');
        break;
      case 'status':
        addLog('Kernel: 6.6.6-goth-amd64 | Memory: 94% Melancholy | Coffee: Depleted', 'info', '[STATUS]');
        break;
      case 'clear':
        if (terminalLogs) terminalLogs.innerHTML = '';
        addLog('Buffer cleared.', 'sys', '[INIT]');
        break;
      default:
        addLog(`Unknown incantation: '${cmd}'. Type 'help' for available rites.`, 'warn', '[ERR]');
    }
  }

  // ==========================================================================
  // 9. Auth Tabs: GUI, CLI Terminal & SSH
  // ==========================================================================
  const authTabs = document.querySelectorAll('.auth-tab');
  const guiLoginForm = document.getElementById('guiLoginForm');
  const cliLoginView = document.getElementById('cliLoginView');
  const sshLoginView = document.getElementById('sshLoginView');
  const cliInput = document.getElementById('cliInput');
  const cliOutput = document.getElementById('cliOutput');

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      playClickSfx(950, 'sine', 0.04);

      const mode = tab.getAttribute('data-mode');
      if (guiLoginForm) guiLoginForm.style.display = mode === 'gui' ? 'flex' : 'none';
      if (cliLoginView) cliLoginView.style.display = mode === 'cli' ? 'flex' : 'none';
      if (sshLoginView) sshLoginView.style.display = mode === 'ssh' ? 'flex' : 'none';

      if (mode === 'cli' && cliInput) {
        setTimeout(() => cliInput.focus(), 100);
      }
    });
  });

  // CLI Interactive Terminal Login Input
  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cliInput.value.trim();
        if (!val) return;
        cliInput.value = '';

        const line = document.createElement('p');
        line.style.color = '#cbd5e1';
        line.textContent = `root@void-crypt:~$ ${val}`;
        cliOutput.appendChild(line);

        playClickSfx(1200, 'triangle', 0.05);

        const resp = document.createElement('p');
        if (val === 'login' || val.startsWith('login ')) {
          resp.style.color = '#10b981';
          resp.textContent = '>> Crypt handshake accepted. Welcome to the Void kernel, Shambhavi.';
          showToast('⛧ CLI Authentication Granted ⛧');
        } else if (val === 'help') {
          resp.style.color = '#38bdf8';
          resp.textContent = '>> Available commands: login [handle], whoami, cat /etc/soul, clear';
        } else if (val === 'whoami') {
          resp.style.color = '#c084fc';
          resp.textContent = '>> shambhavi_hex (uid=0 root gid=666 emo)';
        } else if (val === 'clear') {
          cliOutput.innerHTML = '';
          return;
        } else {
          resp.style.color = '#f87171';
          resp.textContent = `>> bash: ${val}: command not found in /usr/goth/bin`;
        }
        cliOutput.appendChild(resp);
      }
    });
  }

  // SSH Key Dropzone
  const sshDropzone = document.getElementById('sshDropzone');
  const browseKeyBtn = document.getElementById('browseKeyBtn');
  if (sshDropzone) {
    sshDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      sshDropzone.style.borderColor = 'var(--accent)';
      sshDropzone.style.backgroundColor = 'rgba(var(--accent-rgb), 0.15)';
    });
    sshDropzone.addEventListener('dragleave', () => {
      sshDropzone.style.borderColor = '';
      sshDropzone.style.backgroundColor = '';
    });
    sshDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      sshDropzone.style.borderColor = '';
      sshDropzone.style.backgroundColor = '';
      playClickSfx(1400, 'sine', 0.1);
      showToast('🗝 SSH Ed25519 Crypt Key Verified: Access Granted');
    });
  }
  if (browseKeyBtn) {
    browseKeyBtn.addEventListener('click', () => {
      playClickSfx(1000, 'triangle', 0.05);
      showToast('🗝 Simulation: Select your id_ed25519 key file');
    });
  }

  // ==========================================================================
  // 10. Main Login Form Submission
  // ==========================================================================
  const summonBtn = document.getElementById('summonBtn');
  if (guiLoginForm) {
    guiLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const handle = document.getElementById('coderHandle').value || 'shambhavi_hex';
      
      playClickSfx(440, 'sawtooth', 0.15);
      setTimeout(() => playClickSfx(660, 'triangle', 0.2), 120);
      setTimeout(() => playClickSfx(880, 'sine', 0.35), 240);

      if (summonBtn) {
        summonBtn.innerHTML = `
          <span class="btn-content">
            <span class="btn-sword">⏳</span>
            <span class="btn-label">AUTHENTICATING CIPHER...</span>
            <span class="btn-sword">⏳</span>
          </span>
        `;
        summonBtn.style.filter = 'brightness(1.3)';
      }

      setTimeout(() => {
        showToast(`⚔ SESSION SUMMONED. WELCOME, ${handle.toUpperCase()} ⚔`);
        addLog(`Authentication success for '${handle}'. Binding session token.`, 'sys', '[AUTH_OK]');
        
        if (summonBtn) {
          summonBtn.innerHTML = `
            <span class="btn-content">
              <span class="btn-sword">✓</span>
              <span class="btn-label">ACCESS GRANTED</span>
              <span class="btn-sword">✓</span>
            </span>
          `;
          summonBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)';
          summonBtn.style.borderColor = '#10b981';
        }

        // Revert button after 3s
        setTimeout(() => {
          if (summonBtn) {
            summonBtn.innerHTML = `
              <span class="btn-glitch-bg"></span>
              <span class="btn-content">
                <span class="btn-sword">⚔</span>
                <span class="btn-label">SUMMON SESSION</span>
                <span class="btn-sword">⚔</span>
              </span>
              <span class="btn-glow-edge"></span>
            `;
            summonBtn.style.background = '';
            summonBtn.style.borderColor = '';
            summonBtn.style.filter = '';
          }
        }, 3200);

      }, 1000);
    });
  }

  // Alternative OAuth Buttons
  const btnGithubAuth = document.getElementById('btnGithubAuth');
  const btnTouchAuth = document.getElementById('btnTouchAuth');
  const btnPgpAuth = document.getElementById('btnPgpAuth');

  if (btnGithubAuth) {
    btnGithubAuth.addEventListener('click', () => {
      playClickSfx(900, 'sine', 0.05);
      showToast('⎇ Connecting GitHub Gothic OAuth Provider...');
    });
  }
  if (btnTouchAuth) {
    btnTouchAuth.addEventListener('click', () => {
      playClickSfx(1100, 'triangle', 0.05);
      showToast('◎ Biometric Sigil Scanned: Identity Confirmed');
    });
  }
  if (btnPgpAuth) {
    btnPgpAuth.addEventListener('click', () => {
      playClickSfx(750, 'square', 0.05);
      showToast('§ PGP Key Verified: 0x4B37A99F');
    });
  }

  const lostSpellLink = document.getElementById('lostSpellLink');
  if (lostSpellLink) {
    lostSpellLink.addEventListener('click', (e) => {
      e.preventDefault();
      playClickSfx(550, 'sine', 0.08);
      showToast('🕯 Memory restoration incantation dispatched to your recovery raven.');
    });
  }

  // ==========================================================================
  // 11. Toast Notification Utility
  // ==========================================================================
  function showToast(message) {
    const hub = document.getElementById('toastContainer');
    if (!hub) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color: var(--accent);">⛧</span> <span>${message}</span>`;
    hub.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, 3600);
  }

});
