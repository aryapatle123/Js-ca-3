/**
 * NexusProcure AI - Groq LLM API Service
 * Single unified AI engine using Groq API (openai/gpt-oss-120b)
 * Provides autonomous procurement negotiation and supplier concierge intelligence.
 * API keys are loaded safely from localStorage or local .env (never committed to repository).
 */

class GroqService {
  constructor() {
    this.storageKey = 'nexusprocure_groq_api_key';
    this.modelKey = 'nexusprocure_groq_model';
    this.defaultModel = 'openai/gpt-oss-120b';
    this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

    if (!localStorage.getItem(this.modelKey)) {
      localStorage.setItem(this.modelKey, this.defaultModel);
    }

    // Attempt to auto-populate from local .env if available
    this.loadEnvKey();
  }

  async loadEnvKey() {
    if (localStorage.getItem(this.storageKey)) return;
    try {
      const res = await fetch('/.env');
      if (res.ok) {
        const text = await res.text();
        const match = text.match(/GROQ_API_KEY\s*=\s*([^\r\n]+)/);
        if (match && match[1]) {
          this.setApiKey(match[1].trim());
        }
      }
    } catch (e) {
      // Running statically without local server
    }
  }

  getApiKey() {
    return localStorage.getItem(this.storageKey) || '';
  }

  setApiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem(this.storageKey, key.trim());
      return true;
    }
    return false;
  }

  clearApiKey() {
    localStorage.removeItem(this.storageKey);
  }

  getModel() {
    return localStorage.getItem(this.modelKey) || this.defaultModel;
  }

  setModel(model) {
    if (model && model.trim()) {
      localStorage.setItem(this.modelKey, model.trim());
    }
  }

  isConfigured() {
    const key = this.getApiKey();
    return Boolean(key && key.startsWith('gsk_'));
  }

  /**
   * Test connection to Groq API
   */
  async testConnection(apiKey, preferredModel) {
    const key = apiKey || this.getApiKey();
    const model = preferredModel || this.getModel();

    if (!key) return { success: false, error: "No Groq API key entered." };

    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Reply with OK.' }],
          max_tokens: 10
        })
      });

      if (res.ok) {
        this.setApiKey(key);
        this.setModel(model);
        return {
          success: true,
          workingModel: model,
          provider: 'Groq AI',
          reply: 'Connected successfully to Groq API.'
        };
      } else {
        const err = await res.json().catch(() => ({}));
        return { success: false, error: err.error?.message || `HTTP ${res.status}` };
      }
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Autonomous Procurement Bargaining with Groq LLM
   */
  async generateNegotiationReply(params) {
    const {
      scenarioTitle = "Supplier RFQ Negotiation",
      vendorName = "Supplier Representative",
      targetPrice = "$54.00",
      batnaPrice = "$58.00",
      userOffer = "",
      conversationHistory = []
    } = params;

    const key = this.getApiKey();
    const model = this.getModel();

    if (!key) {
      throw new Error("Groq API key not configured. Please add in settings or .env.");
    }

    const systemPrompt = `You are NexusProcure AI, an enterprise procurement assistant negotiating with ${vendorName} for ${scenarioTitle}.
Target budget: ${targetPrice}. Maximum walk-away price: ${batnaPrice}.
You must be polite, firm, diplomatic, and trade commercial value (like 10-day payment terms or order volume) to lower prices.
Keep your response concise (2-3 sentences max).

Return ONLY valid JSON with this exact structure:
{
  "cognitive_step": "A 1-sentence plain English explanation of your strategy.",
  "response_text": "Your polite and firm negotiation message to the vendor.",
  "erp_badge": "Short 3-5 word status (e.g. 'Counter-Offer: $54.80' or 'Terms Agreed: Net-15')"
}`;

    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    // Add recent context
    conversationHistory.slice(-4).forEach(m => {
      messages.push({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.text
      });
    });

    messages.push({
      role: 'user',
      content: `The supplier just proposed: "${userOffer}". Analyze against budget target (${targetPrice}) and generate counter-offer.`
    });

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 350
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq HTTP ${response.status}`);
    }

    const data = await response.json();
    let rawText = data.choices?.[0]?.message?.content || '{}';
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    try {
      const parsed = JSON.parse(rawText);
      return {
        cognitiveStep: parsed.cognitive_step || "Analyzed supplier proposal against target budget.",
        responseText: parsed.response_text || rawText,
        erpBadge: parsed.erp_badge || "Counter-Offer Active"
      };
    } catch (e) {
      return {
        cognitiveStep: "Calculated concession curve to reach target budget.",
        responseText: rawText,
        erpBadge: "Counter-Offer Active"
      };
    }
  }

  /**
   * Supplier Concierge Assistant with Groq LLM
   */
  async generateConciergeReply(supplierQuery, supplierContext = {}) {
    const key = this.getApiKey();
    const model = this.getModel();

    if (!key) {
      throw new Error("Groq API key not configured. Please add in settings or .env.");
    }

    const systemPrompt = `You are the NexusProcure Supplier AI Concierge for an enterprise buyer.
You help verified suppliers with payment dates, invoice statuses, warehouse receiving hours, and purchase orders.
Current supplier: ${supplierContext.name || "Apex Precision Components"} (Tier 1 Verified).
Active Orders:
- PO-44102: $162,000, Scheduled payment Oct 2, Status: Approved.
- PO-44108: $105,000, Status: In Transit, Delivery due Oct 8.
- PO-44115: $24,000, Goods received at Dock 4, Payment pending invoice matching.
Policy: Accelerated Net-15 payment is available for a 1.5% discount. Receiving warehouse hours: Mon-Fri 06:00 to 18:00 EST at Dock 4.

Supplier Question: "${supplierQuery}"

Answer directly, clearly, politely, and in simple English (1 to 3 sentences maximum). No robotic jargon.`;

    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: supplierQuery }
        ],
        temperature: 0.2,
        max_tokens: 200
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || "Thank you. Your request has been verified in our procurement system.";
  }
}

// Global instance & backward-compatible aliases
window.groqService = new GroqService();
window.aiService = window.groqService;
window.geminiService = window.groqService;
