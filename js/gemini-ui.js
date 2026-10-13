/**
 * NexusProcure AI - Groq AI Engine Settings UI
 * Clean, simple status indicator and settings modal for Groq API
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const ai = window.groqService || window.aiService || window.geminiService;
    if (!ai) return;

    // Inject Clean Button & Modal HTML
    const modalHTML = `
      <!-- Floating AI Status Button -->
      <button class="ai-status-pill-btn" id="ai-status-pill-btn" title="Groq AI Settings">
        <span class="ai-pill-dot" id="ai-pill-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;margin-right:4px;"></span>
        <span class="ai-pill-text" id="ai-pill-text">Groq AI: Active</span>
      </button>

      <!-- Groq AI Settings Modal -->
      <div class="ai-modal-backdrop" id="ai-modal-backdrop">
        <div class="ai-modal" id="ai-modal">
          <div class="ai-modal-header">
            <div>
              <h3 style="margin:0;font-size:1.1rem;color:#fff;">Groq AI Engine</h3>
              <p style="margin:0;font-size:0.8rem;color:#94a3b8;">Powers autonomous negotiations & supplier responses</p>
            </div>
            <button class="ai-modal-close" id="ai-modal-close">&times;</button>
          </div>

          <div class="ai-modal-body">
            <div class="ai-status-banner connected" id="ai-status-banner">
              <span id="ai-status-label">Groq API Connected (Ready)</span>
            </div>

            <div class="form-group" style="margin-bottom:14px;">
              <label class="form-label" for="ai-key-input">Groq API Key</label>
              <div style="display:flex;gap:8px;">
                <input type="password" class="form-control" id="ai-key-input"
                  placeholder="gsk_..."
                  style="flex:1;font-family:monospace;font-size:0.85rem;">
                <button type="button" class="btn btn-secondary btn-sm" id="ai-toggle-vis" style="padding:0 12px;">Show</button>
              </div>
              <small style="color:#64748b;font-size:0.75rem;margin-top:4px;display:block;">
                Connected to Groq Cloud for ultra-fast LLM responses.
              </small>
            </div>

            <div class="form-group" style="margin-bottom:18px;">
              <label class="form-label" for="ai-model-select">Groq Model</label>
              <select class="form-control" id="ai-model-select">
                <option value="openai/gpt-oss-120b" selected>openai/gpt-oss-120b (High Reasoning)</option>
                <option value="openai/gpt-oss-20b">openai/gpt-oss-20b (Ultra Fast)</option>
                <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b</option>
              </select>
            </div>

            <div id="ai-test-msg" style="display:none;padding:10px 14px;border-radius:6px;font-size:0.85rem;margin-bottom:16px;"></div>

            <div style="display:flex;gap:10px;">
              <button class="btn btn-primary" id="ai-btn-save" style="flex:1;">
                Save & Test Connection
              </button>
              <button class="btn btn-secondary" id="ai-btn-reset">
                Reset Default
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const btn = document.getElementById('ai-status-pill-btn');
    const backdrop = document.getElementById('ai-modal-backdrop');
    const closeBtn = document.getElementById('ai-modal-close');
    const keyInput = document.getElementById('ai-key-input');
    const modelSelect = document.getElementById('ai-model-select');
    const saveBtn = document.getElementById('ai-btn-save');
    const resetBtn = document.getElementById('ai-btn-reset');
    const statusBanner = document.getElementById('ai-status-banner');
    const statusLabel = document.getElementById('ai-status-label');
    const testMsg = document.getElementById('ai-test-msg');
    const toggleVis = document.getElementById('ai-toggle-vis');
    const pillText = document.getElementById('ai-pill-text');
    const pillDot = document.getElementById('ai-pill-dot');

    function syncState() {
      const currentKey = ai.getApiKey();
      const currentModel = ai.getModel();

      if (currentKey) keyInput.value = currentKey;
      if (currentModel) modelSelect.value = currentModel;

      if (ai.isConfigured()) {
        pillText.textContent = `Groq AI: Active`;
        pillDot.style.background = '#10b981';
        statusBanner.className = 'ai-status-banner connected';
        statusLabel.textContent = `Groq API Connected (${currentModel})`;
      } else {
        pillText.textContent = 'Groq AI: Inactive';
        pillDot.style.background = '#ef4444';
        statusBanner.className = 'ai-status-banner disconnected';
        statusLabel.textContent = 'No Groq API Key Configured';
      }
    }

    syncState();

    btn.addEventListener('click', () => {
      syncState();
      backdrop.classList.add('open');
    });

    closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('open');
    });

    toggleVis.addEventListener('click', () => {
      keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
      toggleVis.textContent = keyInput.type === 'password' ? 'Show' : 'Hide';
    });

    saveBtn.addEventListener('click', async () => {
      const key = keyInput.value.trim();
      const model = modelSelect.value;
      if (!key) {
        showMsg('Please provide your Groq API key.', 'error');
        return;
      }

      saveBtn.disabled = true;
      saveBtn.textContent = 'Testing Connection...';

      try {
        const res = await ai.testConnection(key, model);
        if (res.success) {
          ai.setApiKey(key);
          ai.setModel(res.workingModel || model);
          syncState();
          showMsg('Verified! Connected to Groq API successfully.', 'success');
          setTimeout(() => { backdrop.classList.remove('open'); }, 1200);
        } else {
          showMsg(`Connection test failed: ${res.error}`, 'error');
        }
      } catch (err) {
        showMsg(`Error: ${err.message}`, 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save & Test Connection';
      }
    });

    resetBtn.addEventListener('click', () => {
      ai.setApiKey(ai.defaultKey);
      ai.setModel(ai.defaultModel);
      syncState();
      showMsg('Reset to default Groq API configuration.', 'success');
    });

    function showMsg(text, type) {
      testMsg.style.display = 'block';
      testMsg.textContent = text;
      if (type === 'success') {
        testMsg.style.background = '#064e3b';
        testMsg.style.color = '#6ee7b7';
        testMsg.style.border = '1px solid #059669';
      } else {
        testMsg.style.background = '#450a0a';
        testMsg.style.color = '#fca5a5';
        testMsg.style.border = '1px solid #dc2626';
      }
    }
  });
})();
