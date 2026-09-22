/**
 * NexusProcure AI - Gemini API Settings Panel UI
 * Self-injecting UI component: floating action button + slide-over settings panel.
 * Drop this script onto any page to enable Gemini connectivity.
 */

(function() {
  'use strict';

  // Fallback pre-configured key (leave empty for user input)
  const DEFAULT_KEY_PREFILL = '';

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.geminiService) return;

    // ── Inject FAB + Panel HTML ──────────────────────────────────
    const panelHTML = `
      <!-- Gemini Floating Action Button -->
      <button class="gemini-fab" id="gemini-fab" title="Gemini AI Settings">
        ✦
      </button>

      <!-- Gemini Slide-Over Settings Panel -->
      <div class="gemini-panel-backdrop" id="gemini-panel-backdrop">
        <div class="gemini-panel" id="gemini-panel">

          <div class="gemini-panel-header">
            <h3>✦ Gemini AI Engine</h3>
            <button class="gemini-panel-close" id="gemini-panel-close">&times;</button>
          </div>

          <div class="gemini-panel-body">

            <!-- Connection Status -->
            <div class="gemini-status-bar disconnected" id="gemini-status-bar">
              <span id="gemini-status-icon">○</span>
              <span id="gemini-status-text">Not Connected — Using Scripted Responses</span>
            </div>

            <!-- Info Box -->
            <div class="gemini-info-box">
              <strong>Connect Google Gemini API</strong> to unlock live AI-powered autonomous negotiations, dynamic cognitive reasoning, and real-time supplier concierge responses.<br><br>
              Your key is stored <strong>only in your browser's localStorage</strong> and communicates directly with Google's API.
            </div>

            <!-- API Key Input -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="gemini-api-key-input">Gemini API Key</label>
              <div style="display: flex; gap: 8px;">
                <input type="password" class="form-control" id="gemini-api-key-input"
                  placeholder="Paste Gemini API Key..."
                  style="flex: 1; font-family: var(--font-mono); font-size: 0.85rem;">
                <button class="btn btn-secondary btn-sm" id="gemini-toggle-key-vis" title="Show/Hide key" style="padding: 8px 12px;">
                  👁
                </button>
              </div>
            </div>

            <!-- Model Selector -->
            <div class="form-group" style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="form-label" for="gemini-model-select" style="margin-bottom: 0;">Model</label>
                <button type="button" id="gemini-btn-refresh-models" style="background: none; border: none; color: var(--cyan-400); font-size: 0.75rem; cursor: pointer; text-decoration: underline;">
                  Fetch My Models
                </button>
              </div>
              <select class="form-control" id="gemini-model-select" style="background: #0f172a; color: #fff;">
                <option value="gemini-2.5-flash" selected>Gemini 2.5 Flash (Fast & Accurate)</option>
                <option value="gemini-flash-latest">Gemini Flash Latest</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (High Reasoning)</option>
                <option value="gemini-pro-latest">Gemini Pro Latest</option>
                <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                <option value="gemini-3.7-flash">Gemini 3.7 Flash</option>
                <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</option>
              </select>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
              <button class="btn btn-primary" id="gemini-btn-connect" style="flex: 1;">
                <span id="gemini-btn-connect-label">Connect & Verify</span>
              </button>
              <button class="btn btn-secondary" id="gemini-btn-disconnect" style="display: none;">
                Disconnect
              </button>
            </div>

            <!-- Test Result Message -->
            <div id="gemini-test-result" style="display: none; padding: 12px 16px; border-radius: var(--radius-md); font-size: 0.85rem; margin-bottom: 20px; line-height: 1.5;"></div>

            <!-- Feature Activation List -->
            <div style="border-top: 1px solid var(--border-subtle); padding-top: 20px;">
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px;">
                Features Activated with Gemini
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                  <span class="gemini-feature-dot" id="feat-negotiate" style="width:8px;height:8px;border-radius:50%;background:var(--text-dim);"></span>
                  <span style="color: var(--text-muted);">Simulator: Live AI Bargaining Engine</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                  <span class="gemini-feature-dot" id="feat-concierge" style="width:8px;height:8px;border-radius:50%;background:var(--text-dim);"></span>
                  <span style="color: var(--text-muted);">Portal: 24/7 Supplier AI Concierge</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                  <span class="gemini-feature-dot" id="feat-language" style="width:8px;height:8px;border-radius:50%;background:var(--text-dim);"></span>
                  <span style="color: var(--text-muted);">Capabilities: Multilingual Intelligence</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', panelHTML);

    // ── DOM Refs ─────────────────────────────────────────────────
    const fab = document.getElementById('gemini-fab');
    const backdrop = document.getElementById('gemini-panel-backdrop');
    const closeBtn = document.getElementById('gemini-panel-close');
    const keyInput = document.getElementById('gemini-api-key-input');
    const modelSelect = document.getElementById('gemini-model-select');
    const connectBtn = document.getElementById('gemini-btn-connect');
    const connectLabel = document.getElementById('gemini-btn-connect-label');
    const disconnectBtn = document.getElementById('gemini-btn-disconnect');
    const statusBar = document.getElementById('gemini-status-bar');
    const statusIcon = document.getElementById('gemini-status-icon');
    const statusText = document.getElementById('gemini-status-text');
    const testResult = document.getElementById('gemini-test-result');
    const toggleVis = document.getElementById('gemini-toggle-key-vis');
    const refreshModelsBtn = document.getElementById('gemini-btn-refresh-models');
    const featureDots = ['feat-negotiate', 'feat-concierge', 'feat-language'].map(id => document.getElementById(id));

    // ── Panel Open / Close ───────────────────────────────────────
    fab.addEventListener('click', () => {
      backdrop.classList.add('open');
      if (!keyInput.value && DEFAULT_KEY_PREFILL) {
        keyInput.value = DEFAULT_KEY_PREFILL;
      }
    });

    closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        backdrop.classList.remove('open');
      }
    });

    // ── Toggle Key Visibility ────────────────────────────────────
    toggleVis.addEventListener('click', () => {
      keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
      toggleVis.textContent = keyInput.type === 'password' ? '👁' : '🔒';
    });

    // ── Fetch dynamic models ─────────────────────────────────────
    async function loadDynamicModels(key) {
      if (!key) return;
      try {
        refreshModelsBtn.textContent = 'Fetching...';
        const models = await window.geminiService.listAvailableModels(key);
        if (models && models.length > 0) {
          modelSelect.innerHTML = '';
          models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            modelSelect.appendChild(opt);
          });
          refreshModelsBtn.textContent = `✓ ${models.length} Models Loaded`;
          setTimeout(() => { refreshModelsBtn.textContent = 'Fetch My Models'; }, 3000);
        }
      } catch (err) {
        refreshModelsBtn.textContent = 'Fetch My Models';
        console.warn('Could not auto-list models:', err.message);
      }
    }

    refreshModelsBtn.addEventListener('click', () => {
      const key = keyInput.value.trim() || window.geminiService.getApiKey() || DEFAULT_KEY_PREFILL;
      loadDynamicModels(key);
    });

    // ── Reflect Existing State ───────────────────────────────────
    function refreshUI() {
      let currentKey = window.geminiService.getApiKey();
      if (!currentKey && DEFAULT_KEY_PREFILL) {
        currentKey = DEFAULT_KEY_PREFILL;
        window.geminiService.setApiKey(currentKey);
      }

      const currentModel = window.geminiService.getModel();

      if (currentKey) keyInput.value = currentKey;
      if (currentModel) modelSelect.value = currentModel;

      if (window.geminiService.isConfigured()) {
        setConnected(currentModel);
      } else {
        setDisconnected();
      }
    }

    function setConnected(modelName) {
      fab.classList.add('connected');
      fab.textContent = '✦';
      statusBar.className = 'gemini-status-bar connected';
      statusIcon.textContent = '●';
      statusText.textContent = `Connected — Live Gemini (${modelName || window.geminiService.getModel()}) Active`;
      connectLabel.textContent = 'Reconnect';
      disconnectBtn.style.display = 'block';
      featureDots.forEach(dot => { if (dot) dot.style.background = 'var(--emerald-400)'; });

      window.dispatchEvent(new CustomEvent('gemini-status-change', { 
        detail: { connected: true, model: modelName || window.geminiService.getModel() } 
      }));
    }

    function setDisconnected() {
      fab.classList.remove('connected');
      fab.textContent = '✦';
      statusBar.className = 'gemini-status-bar disconnected';
      statusIcon.textContent = '○';
      statusText.textContent = 'Not Connected — Using Scripted Responses';
      connectLabel.textContent = 'Connect & Verify';
      disconnectBtn.style.display = 'none';
      featureDots.forEach(dot => { if (dot) dot.style.background = 'var(--text-dim)'; });

      window.dispatchEvent(new CustomEvent('gemini-status-change', { detail: { connected: false } }));
    }

    // ── Connect & Test ───────────────────────────────────────────
    connectBtn.addEventListener('click', async () => {
      const key = keyInput.value.trim();
      if (!key) {
        showTestResult('Please enter your Gemini API key.', 'error');
        return;
      }

      const requestedModel = modelSelect.value;
      connectLabel.textContent = 'Testing & Verifying...';
      connectBtn.disabled = true;
      statusBar.className = 'gemini-status-bar testing';
      statusIcon.textContent = '◌';
      statusText.textContent = 'Verifying key with Google Gemini API...';

      const result = await window.geminiService.testConnection(key, requestedModel);

      connectBtn.disabled = false;

      if (result.success) {
        const workingModel = result.workingModel || requestedModel;
        window.geminiService.setApiKey(key);
        window.geminiService.setModel(workingModel);
        modelSelect.value = workingModel;
        setConnected(workingModel);
        showTestResult(`✓ Connected successfully to ${workingModel}! Live AI negotiation active.`, 'success');
      } else {
        setDisconnected();
        showTestResult(`✗ Connection failed: ${result.error}`, 'error');
      }
    });

    // ── Disconnect ───────────────────────────────────────────────
    disconnectBtn.addEventListener('click', () => {
      window.geminiService.clearApiKey();
      keyInput.value = '';
      setDisconnected();
      showTestResult('Gemini API disconnected. Reverting to scripted responses.', 'info');
    });

    function showTestResult(msg, type) {
      testResult.style.display = 'block';
      testResult.textContent = msg;
      if (type === 'success') {
        testResult.style.background = 'rgba(16, 185, 129, 0.1)';
        testResult.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        testResult.style.color = 'var(--emerald-400)';
      } else if (type === 'error') {
        testResult.style.background = 'rgba(244, 63, 94, 0.1)';
        testResult.style.border = '1px solid rgba(244, 63, 94, 0.3)';
        testResult.style.color = 'var(--rose-400)';
      } else {
        testResult.style.background = 'rgba(6, 182, 212, 0.1)';
        testResult.style.border = '1px solid rgba(6, 182, 212, 0.3)';
        testResult.style.color = 'var(--cyan-400)';
      }
      setTimeout(() => { testResult.style.display = 'none'; }, 8000);
    }

    // ── Init ─────────────────────────────────────────────────────
    refreshUI();
  });
})();
