/**
 * StudyDesk AI Engine Logic Architecture
 * Native vanilla runtime for real-time focus analytics simulations,
 * localStorage data mappings, DOM tracking matrices, and UX routers.
 */

class StudyDeskEngine {
    constructor() {
        this.sessionActive = false;
        this.sessionPaused = false;
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.timerInterval = null;
        this.simulationInterval = null;

        // Core Tracking Vectors Metrics
        this.metrics = {
            studyTime: 0,
            focusTime: 0,
            distractionTime: 0,
            streak: 0,
            maxStreak: 0,
            blinks: 0,
            breaks: 0,
            awayTime: 0,
            focusScore: 100,
            prodScore: 100,
            postureScore: 100
        };

        // Static Target Configuration Map
        this.config = {
            goalMinutes: 45,
            dailyTargetHours: 4,
            alertThresholdSec: 10,
            audioAlerts: true,
            persistentStorage: true
        };

        // Predefined Unlocked State Milestones System
        this.achievements = [
            { id: '30m-focus', icon: '🏆', title: '30 Minute Focus', desc: 'Maintain complete active focus for a 30-minute block.', unlocked: false },
            { id: '1h-session', icon: '⚡', title: 'One Hour Session', desc: 'Complete a single study run logging 60 execution minutes.', unlocked: false },
            { id: 'perf-posture', icon: '🧘', title: 'Perfect Posture', desc: 'Achieve a posture calibration compliance score above 90%.', unlocked: false },
            { id: 'no-distract', icon: '🛡️', title: 'Zero Distractions', desc: 'Register no distraction timeline alarms during a run.', unlocked: false },
            { id: 'deep-focus', icon: '🧬', title: 'Deep Focus Node', desc: 'Reach a concurrent focus engine streak of 20 minutes.', unlocked: false },
            { id: '7d-streak', icon: '📅', title: 'Seven Day Streak', desc: 'Trigger the monitoring client across 7 continuous intervals.', unlocked: false }
        ];

        this.initDOMRefs();
        this.bindEventRouting();
        this.bootLocalSystemEngines();
    }

    initDOMRefs() {
        // Structural Nav & Top Controls
        this.navItems = document.querySelectorAll('.nav-item');
        this.viewPanes = document.querySelectorAll('.view-pane');
        this.clockElement = document.getElementById('nav-clock');
        this.dateElement = document.getElementById('nav-date');
        this.durationDisplay = document.getElementById('session-duration-display');
        
        // Command Buttons
        this.btnStart = document.getElementById('btn-start');
        this.btnPause = document.getElementById('btn-pause');
        this.btnResume = document.getElementById('btn-resume');
        this.btnEnd = document.getElementById('btn-end');
        this.btnSaveSettings = document.getElementById('btn-save-settings');
        this.btnPrintReport = document.getElementById('btn-print-report');
        this.btnExportJson = document.getElementById('btn-export-json');

        // Streaming Components
        this.video = document.getElementById('webcam-video');
        this.videoPlaceholder = document.getElementById('webcam-placeholder');
        this.timelineStream = document.getElementById('timeline-stream');
        this.toastContainer = document.getElementById('toast-container');
        
        // Text Overlays & Badges
        this.badgePresence = document.getElementById('ai-presence-badge');
        this.overlayGaze = document.getElementById('overlay-gaze');
        this.overlayPosture = document.getElementById('overlay-posture');
    }

    bindEventRouting() {
        // App Views Navigation Controller Routing
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                this.navItems.forEach(nav => nav.classList.remove('active'));
                this.viewPanes.forEach(pane => pane.classList.remove('active'));
                
                item.classList.add('active');
                const runTarget = item.getAttribute('data-target');
                document.getElementById(`view-${runTarget}`).classList.add('active');
            });
        });

        // Core Pipeline Action Directives
        this.btnStart.addEventListener('click', () => this.bootSession());
        this.btnPause.addEventListener('click', () => this.togglePauseSession(true));
        this.btnResume.addEventListener('click', () => this.togglePauseSession(false));
        this.btnEnd.addEventListener('click', () => this.terminateSession());
        this.btnSaveSettings.addEventListener('click', () => this.writeSettingsFormData());
        this.btnPrintReport.addEventListener('click', () => window.print());
        this.btnExportJson.addEventListener('click', () => this.triggerDatasetDownload());
    }

    bootLocalSystemEngines() {
        this.loadEngineSettings();
        this.renderStaticAchievementsGrid();
        this.generateStaticReportVisualizers();
        
        // Init system real-time clock loops
        setInterval(() => {
            const now = new Date();
            this.clockElement.textContent = now.toTimeString().split(' ')[0];
            this.dateElement.textContent = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }, 1000);
    }

    // --- Session Control Actions ---
    async bootSession() {
        try {
            const constraints = { video: { width: 640, height: 480 }, audio: false };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = stream;
            this.videoPlaceholder.classList.add('hidden');
        } catch (err) {
            this.spawnToast('Webcam hardware stream unavailable. Running simulation mode safely.');
        }

        this.sessionActive = true;
        this.sessionPaused = false;
        this.elapsedSeconds = 0;
        this.resetInternalMetrics();

        this.btnStart.disabled = true;
        this.btnPause.disabled = false;
        this.btnEnd.disabled = false;
        
        this.badgePresence.className = "badge-status status-focus";
        this.badgePresence.textContent = "Analyzing Core";

        this.timelineStream.innerHTML = ''; // Wipe timeline clean

        // Execute processing clock generators
        this.timerInterval = setInterval(() => this.processTimerTick(), 1000);
        this.simulationInterval = setInterval(() => this.evaluateSimulationTelemetry(), 3000);
        
        this.appendTimelineEvent('Session Initiated', 'Vision array local engine pipeline live.');
        this.spawnToast('AI Attention Session Online');
    }

    togglePauseSession(shouldPause) {
        this.sessionPaused = shouldPause;
        if (shouldPause) {
            this.btnPause.classList.add('hidden');
            this.btnResume.classList.remove('hidden');
            this.badgePresence.className = "badge-status status-offline";
            this.badgePresence.textContent = "Paused";
            this.appendTimelineEvent('Session Suspended', 'Data telemetry streaming intercepted.');
        } else {
            this.btnResume.classList.add('hidden');
            this.btnPause.classList.remove('hidden');
            this.badgePresence.className = "badge-status status-focus";
            this.badgePresence.textContent = "Analyzing Core";
            this.appendTimelineEvent('Session Resumed', 'Vision processing loop active.');
        }
    }

    terminateSession() {
        this.sessionActive = false;
        clearInterval(this.timerInterval);
        clearInterval(this.simulationInterval);

        if (this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
        }
        this.videoPlaceholder.classList.remove('hidden');

        this.btnStart.disabled = false;
        this.btnPause.disabled = true;
        this.btnResume.classList.add('hidden');
        this.btnPause.classList.remove('hidden');
        this.btnEnd.disabled = true;

        this.badgePresence.className = "badge-status status-offline";
        this.badgePresence.textContent = "Offline";

        this.appendTimelineEvent('Session Termination', 'Final metrics routed to generator pipeline.');
        this.compileReportSummary();
        this.persistSessionToLocalHistory();
        
        // Auto navigate dashboard view to compiled analysis frame
        this.spawnToast('Session Processed Successfully');
        document.querySelector('[data-target="reports"]').click();
    }

    processTimerTick() {
        if (this.sessionPaused) return;
        this.elapsedSeconds++;
        this.metrics.studyTime = this.elapsedSeconds;

        // Render format mapping helper
        const format = (sec) => {
            const h = Math.floor(sec / 3600).toString().padStart(2, '0');
            const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
            const s = (sec % 60).toString().padStart(2, '0');
            return `${h}:${m}:${s}`;
        };

        this.durationDisplay.textContent = format(this.elapsedSeconds);
        document.getElementById('m-study-time').textContent = `${Math.floor(this.elapsedSeconds / 60)}m ${this.elapsedSeconds % 60}s`;
    }

    // --- Dynamic Simulation Array (Replaces MediaPipe Hook) ---
    evaluateSimulationTelemetry() {
        if (this.sessionPaused) return;

        // Generate synthetic state array variables inside target matrices
        const states = ['Optimal Focus', 'Optimal Focus', 'Looking Right', 'Slouching Detected', 'User Away'];
        const roll = states[Math.floor(Math.random() * states.length)];

        const fListScreen = document.getElementById('f-gaze-screen').querySelector('.indicator');
        const fListAway = document.getElementById('f-gaze-away').querySelector('.indicator');
        const fFaceDetected = document.getElementById('f-face-detected').querySelector('.indicator');
        const fPostureGood = document.getElementById('f-posture-good').querySelector('.indicator');
        const fPostureSlouch = document.getElementById('f-posture-slouch').querySelector('.indicator');

        // Reset runtime visualization components states
        fListScreen.className = "indicator"; fListAway.className = "indicator"; fFaceDetected.className = "indicator";
        fPostureGood.className = "indicator"; fPostureSlouch.className = "indicator";

        if (roll === 'Optimal Focus') {
            this.metrics.focusTime += 3;
            this.metrics.streak += 0.05; // Increment fractional step minutes
            if (this.metrics.streak > this.metrics.maxStreak) this.metrics.maxStreak = this.metrics.streak;
            
            this.metrics.focusScore = Math.min(100, this.metrics.focusScore + 2);
            this.metrics.postureScore = Math.min(100, this.metrics.postureScore + 1);
            
            this.overlayGaze.textContent = "Screen Focus";
            this.overlayPosture.textContent = "Good";
            this.badgePresence.className = "badge-status status-focus";
            this.badgePresence.textContent = "Active Focus";

            fListScreen.classList.add('active');
            fFaceDetected.classList.add('active');
            fPostureGood.classList.add('active');

            if (Math.random() > 0.4) this.metrics.blinks += 1;

        } else if (roll === 'Looking Right') {
            this.metrics.distractionTime += 3;
            this.metrics.streak = 0;
            this.metrics.focusScore = Math.max(0, this.metrics.focusScore - 4);
            
            this.overlayGaze.textContent = "Looking Left/Right";
            this.badgePresence.className = "badge-status status-distracted";
            this.badgePresence.textContent = "Distracted";

            fListAway.classList.add('active-warn');
            fFaceDetected.classList.add('active');
            fPostureGood.classList.add('active');
            
            if (Math.random() > 0.7) this.appendTimelineEvent('Distraction Trace', 'Gaze vector drifted away from screen alignment.');

        } else if (roll === 'Slouching Detected') {
            this.metrics.focusTime += 3;
            this.metrics.postureScore = Math.max(0, this.metrics.postureScore - 6);
            
            this.overlayPosture.textContent = "Slouching Profile";
            fListScreen.classList.add('active');
            fFaceDetected.classList.add('active');
            fPostureSlouch.classList.add('active-warn');

            if (Math.random() > 0.7) this.appendTimelineEvent('Posture Deficit', 'Ergonomic check failed: Spine slouch signature detected.');

        } else if (roll === 'User Away') {
            this.metrics.awayTime += 3;
            this.metrics.streak = 0;
            this.metrics.focusScore = Math.max(0, this.metrics.focusScore - 5);
            
            this.overlayGaze.textContent = "Absence Detected";
            this.overlayPosture.textContent = "N/A";
            this.badgePresence.className = "badge-status status-offline";
            this.badgePresence.textContent = "Desk Vacant";

            if (Math.random() > 0.8) {
                this.metrics.breaks += 1;
                this.appendTimelineEvent('Absence Alert', 'User identity left workspace monitor perimeter.');
            }
        }

        // Systemic Processing Formula Compiling
        this.metrics.prodScore = Math.round((this.metrics.focusScore * 0.7) + (this.metrics.postureScore * 0.3));
        this.refreshUIDashboardElements();
        this.evaluateAchievementUnlocks();
    }

    refreshUIDashboardElements() {
        // Text strings updates
        document.getElementById('m-focus-time').textContent = `${Math.floor(this.metrics.focusTime / 60)}m ${this.metrics.focusTime % 60}s`;
        document.getElementById('m-distraction-time').textContent = `${Math.floor(this.metrics.distractionTime / 60)}m ${this.metrics.distractionTime % 60}s`;
        document.getElementById('m-focus-streak').textContent = `${this.metrics.streak.toFixed(1)}m`;
        document.getElementById('m-long-streak').textContent = `Max: ${this.metrics.maxStreak.toFixed(1)}m`;
        document.getElementById('m-blink-rate').innerHTML = `${this.metrics.blinks} <span class="unit">/min</span>`;
        document.getElementById('m-breaks').innerHTML = `${this.metrics.breaks} <span class="unit">breaks</span>`;
        document.getElementById('m-away-time').textContent = `Away: ${this.metrics.awayTime}s`;
        document.getElementById('v-posture-score').textContent = `${this.metrics.postureScore}%`;

        // Progress lines updates
        const totalSampled = (this.metrics.focusTime + this.metrics.distractionTime) || 1;
        document.getElementById('p-focus-time').style.width = `${(this.metrics.focusTime / this.metrics.studyTime) * 100}%`;
        document.getElementById('p-distraction-time').style.width = `${(this.metrics.distractionTime / this.metrics.studyTime) * 100}%`;

        // Radial Ring updates using dynamic styling system
        const ringFocus = document.getElementById('ring-focus');
        const ringProd = document.getElementById('ring-prod');
        ringFocus.style.setProperty('--percent', this.metrics.focusScore);
        ringProd.style.setProperty('--percent', this.metrics.prodScore);
        document.getElementById('v-ring-focus').textContent = `${this.metrics.focusScore}%`;
        document.getElementById('v-ring-prod').textContent = `${this.metrics.prodScore}%`;

        // Composite dual bar charts logic calculations
        const fPct = (this.metrics.focusTime / totalSampled) * 100;
        const dPct = (this.metrics.distractionTime / totalSampled) * 100;
        document.getElementById('bar-comp-focus').style.width = `${fPct}%`;
        document.getElementById('bar-comp-distract').style.width = `${dPct}%`;
    }

    appendTimelineEvent(title, detail) {
        const timestamp = new Date().toTimeString().split(' ')[0];
        const row = document.createElement('div');
        row.className = 'timeline-item';
        row.innerHTML = `
            <span class="tl-time">${timestamp}</span>
            <div class="tl-msg"><strong>${title}</strong> — ${detail}</div>
        `;
        
        // Remove standard static layout placeholder if present
        const ph = this.timelineStream.querySelector('.timeline-placeholder');
        if (ph) ph.remove();

        this.timelineStream.prepend(row);
    }

    // --- Report Calculations Framework ---
    compileReportSummary() {
        document.getElementById('rep-timestamp').textContent = `Generated on ${new Date().toLocaleString()}`;
        document.getElementById('rep-duration').textContent = this.durationDisplay.textContent;
        document.getElementById('rep-focus-score').textContent = `${this.metrics.focusScore}%`;
        document.getElementById('rep-prod-score').textContent = `${this.metrics.prodScore}%`;
        document.getElementById('rep-posture').textContent = `${this.metrics.postureScore}%`;
        document.getElementById('rep-blink').textContent = `${this.metrics.blinks}/min`;
        document.getElementById('rep-streak').textContent = `${this.metrics.maxStreak.toFixed(1)} mins`;
    }

    generateStaticReportVisualizers() {
        // Build analytical visualizer profiles natively
        const heatmap = document.getElementById('heatmap-grid');
        heatmap.innerHTML = '';
        for (let i = 0; i < 28; i++) {
            const cell = document.createElement('div');
            let level = '0';
            if (i % 5 === 0) level = '1';
            if (i % 7 === 0) level = '2';
            if (i % 11 === 0) level = '3';
            cell.className = `heatmap-cell lvl-${level}`;
            heatmap.appendChild(cell);
        }

        const barChart = document.getElementById('daily-bar-chart');
        barChart.innerHTML = '';
        const dayHours = [2.4, 4.1, 1.2, 0, 3.8, 5.2, 2.9];
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        dayHours.forEach((hr, idx) => {
            const col = document.createElement('div');
            col.className = 'bar-column';
            // Compute percentage height allocation boundary limits
            const pct = (hr / 6) * 100;
            col.style.height = `${pct}%`;
            col.setAttribute('data-lbl', labels[idx]);
            barChart.appendChild(col);
        });
    }

    // --- Dynamic Target Unlocks Metrics Evaluator ---
    evaluateAchievementUnlocks() {
        this.achievements.forEach(ach => {
            if (ach.unlocked) return;

            let conditionMet = false;
            if (ach.id === '30m-focus' && this.metrics.focusTime >= 1800) conditionMet = true;
            if (ach.id === '1h-session' && this.metrics.studyTime >= 3600) conditionMet = true;
            if (ach.id === 'perf-posture' && this.metrics.postureScore >= 92 && this.metrics.studyTime > 60) conditionMet = true;
            if (ach.id === 'deep-focus' && this.metrics.maxStreak >= 20) conditionMet = true;
            
            if (conditionMet) {
                ach.unlocked = true;
                this.spawnToast(`🏆 Achievement Unlocked: ${ach.title}`);
                this.renderStaticAchievementsGrid();
            }
        });
    }

    renderStaticAchievementsGrid() {
        const container = document.getElementById('achievements-container');
        container.innerHTML = '';

        this.achievements.forEach(ach => {
            const card = document.createElement('div');
            card.className = `card achieve-card ${ach.unlocked ? 'unlocked' : ''}`;
            card.innerHTML = `
                <div class="achieve-icon">${ach.icon}</div>
                <div class="achieve-title">${ach.title}</div>
                <div class="achieve-desc">${ach.desc}</div>
                <div style="margin-top:12px; font-size:11px; font-weight:600; color:#2563EB;">
                    ${ach.unlocked ? 'UNLOCKED CORE' : 'LOCKED TARGET'}
                </div>
            `;
            container.appendChild(card);
        });
    }

    // --- Configuration Persistence Mappings ---
    writeSettingsFormData() {
        this.config.goalMinutes = parseInt(document.getElementById('set-study-goal').value) || 45;
        this.config.dailyTargetHours = parseInt(document.getElementById('set-daily-target').value) || 4;
        this.config.alertThresholdSec = parseInt(document.getElementById('set-alert-duration').value) || 10;
        this.config.audioAlerts = document.getElementById('set-toggle-notifications').checked;
        this.config.persistentStorage = document.getElementById('set-toggle-persistence').checked;

        if (this.config.persistentStorage) {
            localStorage.setItem('studydesk_config', JSON.stringify(this.config));
        }
        this.spawnToast('System configuration flushed to local storage.');
    }

    loadEngineSettings() {
        const local = localStorage.getItem('studydesk_config');
        if (!local) return;
        try {
            this.config = JSON.parse(local);
            document.getElementById('set-study-goal').value = this.config.goalMinutes;
            document.getElementById('set-daily-target').value = this.config.dailyTargetHours;
            document.getElementById('set-alert-duration').value = this.config.alertThresholdSec;
            document.getElementById('set-toggle-notifications').checked = this.config.audioAlerts;
            document.getElementById('set-toggle-persistence').checked = this.config.persistentStorage;
        } catch (e) {
            console.error("Configuration memory error structural parse crash.", e);
        }
    }

    persistSessionToLocalHistory() {
        if (!this.config.persistentStorage) return;
        const record = {
            timestamp: new Date().toISOString(),
            metrics: this.metrics,
            durationFormatted: this.durationDisplay.textContent
        };
        let history = [];
        try {
            history = JSON.parse(localStorage.getItem('studydesk_history') || '[]');
        } catch(e) {}
        history.push(record);
        localStorage.setItem('studydesk_history', JSON.stringify(history));
    }

    triggerDatasetDownload() {
        const payload = {
            metadata: { engine: "StudyDesk AI Engine Workspace V1", generated: new Date().toISOString() },
            sessionMetrics: this.metrics,
            configurationProfileSnapshot: this.config
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `studydesk-metrics-${Date.now()}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
    }

    // --- UX Elements ---
    spawnToast(msg) {
        const el = document.createElement('div');
        el.className = 'toast-msg';
        el.textContent = msg;
        this.toastContainer.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }

    resetInternalMetrics() {
        this.metrics = { studyTime: 0, focusTime: 0, distractionTime: 0, streak: 0, maxStreak: 0, blinks: 0, breaks: 0, awayTime: 0, focusScore: 100, prodScore: 100, postureScore: 100 };
    }
}

// Instantiate internal application layer engine upon layout load
window.addEventListener('DOMContentLoaded', () => {
    window.AppEngineInstance = new StudyDeskEngine();
});