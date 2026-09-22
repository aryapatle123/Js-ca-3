/**
 * NexusProcure AI - Google Gemini API Integration Service
 * Provides direct, client-side connectivity to Google's Gemini Models
 * (e.g. gemini-2.5-flash, gemini-2.5-pro, gemini-flash-latest, gemini-pro-latest)
 * for autonomous supplier bargaining, cognitive reasoning generation, and vendor concierge queries.
 */

class GeminiService {
  constructor() {
    this.storageKey = 'nexusprocure_gemini_api_key';
    this.modelKey = 'nexusprocure_gemini_model';
    this.defaultModel = 'gemini-2.5-flash';
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
    return Boolean(key && key.length > 10);
  }

  /**
   * Fetch all models that support generateContent for the given API key
   */
  async listAvailableModels(apiKey) {
    const key = apiKey || this.getApiKey();
    if (!key) throw new Error("No API key provided");

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}: Failed to fetch models list`);
    }

    const data = await response.json();
    const models = (data.models || [])
      .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
      .map(m => m.name.replace(/^models\//, ''));

    return models;
  }

  /**
   * Validate API Key and auto-detect best working model
   */
  async testConnection(apiKey, preferredModel = 'gemini-2.5-flash') {
    const candidateModels = [
      preferredModel,
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-2.5-pro',
      'gemini-pro-latest',
      'gemini-3.5-flash',
      'gemini-3.7-flash',
      'gemini-2.0-flash'
    ];

    // Remove duplicates while preserving order
    const uniqueModels = [...new Set(candidateModels.filter(Boolean))];

    let lastError = null;

    for (const model of uniqueModels) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello! Reply with 'OK: NexusProcure connected'." }] }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          return { success: true, workingModel: model, reply };
        } else {
          const errorData = await response.json().catch(() => ({}));
          lastError = errorData.error?.message || `HTTP ${response.status}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    return { success: false, error: lastError || "Failed to connect to any Gemini model." };
  }

  /**
   * Autonomous Procurement Bargaining with Gemini
   */
  async generateNegotiationReply(params) {
    const {
      scenarioTitle,
      poNumber,
      vendorName,
      targetPrice,
      batnaPrice,
      userOffer,
      conversationHistory = []
    } = params;

    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error("Gemini API key not configured");

    const model = this.getModel();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemInstruction = `You are NexusProcure AI Agent #042, an autonomous enterprise procurement agent negotiating directly with suppliers.
Your core mission is to protect working capital, secure competitive pricing, ensure SLA delivery integrity, and adhere strictly to enterprise policy guardrails.

CURRENT NEGOTIATION PARAMETERS:
- Contract Scenario: ${scenarioTitle}
- Target Document: ${poNumber}
- Vendor / Counterparty: ${vendorName}
- Target Benchmark Price: ${targetPrice}
- BATNA (Walk-Away Threshold): ${batnaPrice}
- Guardrails: Never accept offers above BATNA without trading payment terms (e.g. Net-15 for discount) or volume MOQ commitments.

INSTRUCTIONS FOR OUTPUT FORMAT:
You MUST respond in valid JSON format with three exact keys:
{
  "cognitive_step": "A concise, highly professional internal reasoning log (1-2 sentences) showing your BATNA calculation, market comparison, and tactical decision.",
  "response_text": "Your professional, diplomatic, and firm negotiation response to the supplier.",
  "erp_badge": "A short status badge tag (e.g. 'SAP PO Updated • Net-15 Agreed' or 'Counter-Offer Staged' or 'BATNA Compromise Reached')"
}
Do NOT include markdown backticks around the JSON. Return only the raw JSON object.`;

    // Format chat history
    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      { role: "model", parts: [{ text: "{\"cognitive_step\":\"Initialized autonomous bargaining model. Ready to negotiate within BATNA guardrails.\",\"response_text\":\"NexusProcure Agent standing by.\",\"erp_badge\":\"Agent Primed\"}" }] }
    ];

    conversationHistory.forEach(msg => {
      contents.push({
        role: msg.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      });
    });

    contents.push({
      role: 'user',
      parts: [{ text: `The counterparty (supplier or buyer) just proposed: "${userOffer}". Analyze this against your BATNA (${batnaPrice}) and generate your response and internal cognitive trace.` }]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 600
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${response.status} from Gemini API`);
    }

    const data = await response.json();
    let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean potential markdown fencing
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    try {
      const parsed = JSON.parse(rawText);
      return {
        cognitiveStep: parsed.cognitive_step || "Analyzed counter-offer against BATNA and ERP constraints.",
        responseText: parsed.response_text || rawText,
        erpBadge: parsed.erp_badge || "✓ Term Negotiated"
      };
    } catch (parseErr) {
      return {
        cognitiveStep: "Evaluating supplier counter-proposal against spot indexes and contract terms.",
        responseText: rawText,
        erpBadge: "✓ Staged for ERP Authorization"
      };
    }
  }

  /**
   * Supplier Concierge Assistant with Gemini
   */
  async generateConciergeReply(supplierQuery, supplierContext = {}) {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error("Gemini API key not configured");

    const model = this.getModel();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const prompt = `You are the NexusProcure Supplier AI Concierge for an enterprise buyer.
You assist verified vendors with payment dates, invoice statuses, Early Payment Discounts (Dynamic Discounting), packaging specs, and logistics inquiries.
Vendor Profile: ${supplierContext.name || "Apex Precision Components"} (Tier 1 Verified).
Active Open Orders: PO-44102 ($162,000.00, scheduled Oct 2), PO-44108 ($105,000.00, in transit), PO-44115 ($24,000.00, goods received).
Policy: Dynamic Discounting offers Net-1 payment for a 1.5% discount. Receiving warehouse hours: 06:00 to 18:00 EST at Dock 4.

Supplier Question: "${supplierQuery}"

Provide a direct, helpful, and courteous answer based on the vendor profile and buyer policies. Keep it under 3 sentences.`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 250
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Thank you for reaching out. Our AP records have verified your inquiry.";
  }
}

// Global instance
window.geminiService = new GeminiService();
