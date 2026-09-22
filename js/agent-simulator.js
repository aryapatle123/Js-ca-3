/**
 * NexusProcure AI - Interactive Agent Communication Simulator Engine
 * Provides multi-scenario realistic enterprise supplier negotiation simulations,
 * cognitive thought streaming, real-time typing animation, and interactive roleplay.
 */

(function() {
  'use strict';

  // Scenario Definitions
  const SCENARIOS = {
    rfq: {
      id: 'rfq',
      name: 'Price & Volume RFQ',
      channel: 'Email / Coupa API',
      vendor: {
        name: 'Apex Micro-Electronics GmbH',
        avatar: 'AM',
        avatarColor: '#f59e0b',
        contact: 'Klaus Richter (VP Sales)',
        channelIcon: '✉️'
      },
      cognitiveTrace: [
        { title: 'INGESTION & PARSING', detail: 'Received formal quotation for 10,000 units of MCU-902x. Initial unit price: $68.50.' },
        { title: 'ERP BENCHMARKING', detail: 'Querying SAP S/4HANA: Historical median unit price: $52.80. Market spot index currently down 4.2%.' },
        { title: 'BATNA & ELASTICITY CALC', detail: 'Secondary qualified vendor (SiliconCraft) active at $56.00 with 4-week lead time. Target compromise: $54.00.' },
        { title: 'STRATEGY SELECTION', detail: 'Offer volume commitment across Q3/Q4 + early payment term (2% 10 Net 30) in exchange for $54.20 target.' },
        { title: 'ERP RECORD UPDATE', detail: 'Drafted RFQ Counter #RFQ-2026-881 in Coupa Procurement awaiting vendor response.' }
      ],
      messages: [
        {
          sender: 'vendor',
          time: '10:14:02 AM',
          text: "Hello Procurement Team. Following your RFQ #RFQ-2026-881 for 10,000 units of MCU-902x, our standard tier quote is $68.50/unit with 8 weeks lead time due to ongoing foundry allocation constraints. Please confirm if we should reserve production slots."
        },
        {
          sender: 'ai-agent',
          time: '10:14:06 AM',
          text: "Dear Klaus, thank you for the prompt quotation. We reviewed our annual demand forecast: we can commit to 25,000 units consolidated across Q3 and Q4. Based on current silicon spot pricing and our historical volume benchmark, our target price for this scale is $54.20/unit.\n\nTo support your working capital, we can offer accelerated 2% 10 Net 30 payment terms via automated ACH. Can Apex confirm allocation at $54.20 under these terms?",
          erpBadge: "SAP S/4HANA: RFQ-881 Updated • Target Margin +18.4%"
        },
        {
          sender: 'vendor',
          time: '10:14:28 AM',
          text: "Thank you for the consolidated volume commitment. $54.20 is tight on our margins, but with the 25,000 unit guarantee and 10-day payment term, we can accept $54.80/unit with immediate slot confirmation."
        },
        {
          sender: 'ai-agent',
          time: '10:14:33 AM',
          text: "Thank you Klaus. We accept $54.80/unit for the 25,000 unit blanket order with 2% 10 Net 30 terms. Purchase Order #PO-94022 has been autonomously generated and dispatched to your vendor portal for electronic signature.",
          erpBadge: "PO #94022 Executed • Savings: $342,500 vs Initial Quote"
        }
      ],
      quickReplies: [
        "We accept the $54.80 compromise.",
        "Could you expedite delivery to 4 weeks?",
        "What is the penalty clause for late delivery?"
      ]
    },

    delay: {
      id: 'delay',
      name: 'Critical Supply Delay',
      channel: 'WhatsApp / EDI 855',
      vendor: {
        name: 'TransOcean Logistics & Freight',
        avatar: 'TO',
        avatarColor: '#06b6d4',
        contact: 'Marcus Vance (Logistics Director)',
        channelIcon: '💬'
      },
      cognitiveTrace: [
        { title: 'TELEMETRY EXCEPTION DETECTED', detail: 'EDI 855 update: Container vessel MSC Aurora delayed 11 days at Rotterdam terminal.' },
        { title: 'LINE-STOPPING RISK ANALYSIS', detail: 'Frankfurt Assembly Plant has 6 days buffer stock. Line shutdown risk estimated at $180,000/day.' },
        { title: 'DYNAMIC MITIGATION FORMULATION', detail: 'Evaluate split shipment: Drawdown 400 critical units via Lufthansa Air Freight; leave remaining 2,600 on ocean vessel.' },
        { title: 'CARRIER COST NEGOTIATION', detail: 'Invoke SLA Article 14.2 (Congestion Mitigation Clause). Propose 50/50 cost sharing on expedited air freight.' },
        { title: 'ERP SYNC & ALERT', detail: 'Plant Operations notified. Production schedule re-sequenced without line idle.' }
      ],
      messages: [
        {
          sender: 'vendor',
          time: '08:42:15 AM',
          text: "URGENT UPDATE: Vessel MSC Aurora carrying Container #MSCU881029 (PO #8492, 3,000 hydraulic valves) has encountered severe congestion at Rotterdam. Scheduled berthing is pushed back by 11 calendar days. Earliest port discharge now Oct 14."
        },
        {
          sender: 'ai-agent',
          time: '08:42:19 AM',
          text: "Marcus, our system has flagged this shipment as critical to the Frankfurt assembly line. With an 11-day delay, our safety stock will be breached by Day 7.\n\nPer SLA Article 14.2 on contingency freight, we require 400 units to be de-consolidated and air-freighted via Frankfurt Cargo Hub immediately to bridge the buffer. We will split the air differential 50/50. Can TransOcean arrange air pickup by tomorrow morning?",
          erpBadge: "Risk Shield: Plant Stoppage Prevented ($540K Avoidance)"
        },
        {
          sender: 'vendor',
          time: '08:42:45 AM',
          text: "Understood the urgency. We have freight priority clearance in Rotterdam. We can extract pallet #4 (400 units) today for LH Cargo flight departing 06:30 tomorrow. 50/50 split agreed."
        },
        {
          sender: 'ai-agent',
          time: '08:42:50 AM',
          text: "Authorized. Customs airway bill #AWB-991204 has been generated in our ERP. Plant intake team alerted for arrival Oct 4 at 11:00 CEST. Thank you Marcus for the rapid mitigation.",
          erpBadge: "SAP S/4HANA: Airway Bill AWB-991204 Attached • Status: In Transit"
        }
      ],
      quickReplies: [
        "Air freight pickup confirmed for 06:30.",
        "Can we bill 100% of air freight to insurance?",
        "Please send updated customs manifest."
      ]
    },

    discrepancy: {
      id: 'discrepancy',
      name: '3-Way Match Dispute',
      channel: 'Supplier Portal / Invoice EDI 810',
      vendor: {
        name: 'Krupp Precision Bearings AG',
        avatar: 'KP',
        avatarColor: '#10b981',
        contact: 'Accounts Receivable Dept',
        channelIcon: '📑'
      },
      cognitiveTrace: [
        { title: 'INVOICE INGESTION', detail: 'Incoming Invoice #INV-9821 for $142,800 against PO #PO-4401 ($128,600). Discrepancy: +$14,200 (+11.0%).' },
        { title: 'OCR & LINE ITEM AUDIT', detail: 'Discrepancy pinpointed to Line 3: "Raw Material Surcharge - Grade Titanium 5".' },
        { title: 'MASTER AGREEMENT CLAUSE RETRIEVAL', detail: 'Contract #MSA-2024 §8.4 caps material surcharges at max 3.0% over LME 90-day moving average (allowable: $3,858).' },
        { title: 'DISPUTE NOTICE DISPATCH', detail: 'Polite dispute notification formatted with cited contract clause, LME spot audit trail, and request for credit memo of $10,342.' },
        { title: 'ERP SUSPENSION RULE', detail: 'Invoice placed in partial hold; undisputed base $128,600 queued for release.' }
      ],
      messages: [
        {
          sender: 'vendor',
          time: '14:20:05 PM',
          text: "Billing Notification: Invoice #INV-9821 has been submitted for payment ($142,800.00). Please note line item surcharge reflects global raw material titanium pricing fluctuations during Q3 production."
        },
        {
          sender: 'ai-agent',
          time: '14:20:10 PM',
          text: "Dear Accounts Team, thank you for Invoice #INV-9821. Our automated three-way audit noted a discrepancy of $14,200 (+11.0%) against PO #PO-4401.\n\nPer Master Agreement #MSA-2024 §8.4, raw alloy surcharges are indexed to the London Metal Exchange 90-day moving average and capped at 3.0% ($3,858.00). The current $14,200 surcharge exceeds this threshold by $10,342.00.\n\nTo expedite payment of the undisputed $132,458.00 balance, could you please issue a credit memo of $10,342.00?",
          erpBadge: "Coupa 3-Way Match: Discrepancy Identified ($10,342 Saved)"
        },
        {
          sender: 'vendor',
          time: '14:20:38 PM',
          text: "Apologies for the oversight. Our automated billing system applied spot rate index without applying the contracted cap in §8.4. We have issued Credit Memo #CM-2026-44 for $10,342.00."
        },
        {
          sender: 'ai-agent',
          time: '14:20:44 PM',
          text: "Credit Memo #CM-2026-44 received and verified against contract terms. Net invoice of $132,458.00 approved and released for standard disbursement. Thank you for the swift correction.",
          erpBadge: "SAP Financials: Dispute Resolved in 18 Min • Net Billed: $132,458"
        }
      ],
      quickReplies: [
        "Credit memo #CM-2026-44 issued and sent.",
        "Could you clarify the LME index date used?",
        "Please release the undisputed base payment."
      ]
    },

    multilingual: {
      id: 'multilingual',
      name: 'Cross-Border (Japanese)',
      channel: 'Global Portal / Email',
      vendor: {
        name: 'Kyoto Precision Optics (京都精密光学)',
        avatar: 'KP',
        avatarColor: '#8b5cf6',
        contact: 'Kenji Takahashi (高橋 健二)',
        channelIcon: '🌐'
      },
      cognitiveTrace: [
        { title: 'MULTILINGUAL INGEST', detail: 'Received inquiry in Japanese regarding high-precision optical laser lenses (PO #JP-8812).' },
        { title: 'SEMANTIC & CULTURAL CONTEXT', detail: 'Vendor expresses concern regarding optical tolerance ±0.001mm vs ±0.002mm standard. Tone: formal Business Keigo.' },
        { title: 'ENGINEERING SPEC CHECK', detail: 'Checking PLM specs: ±0.0018mm is acceptable for assembly. Tightening to ±0.001mm increases scrap rate by 34%.' },
        { title: 'NATIVE BUSINESS REASONING', detail: 'Formulate polite reply in native Japanese Keigo offering ±0.002mm baseline with batch inspection reports.' },
        { title: 'BILINGUAL SYNCHRONIZATION', detail: 'Dual-recorded in ERP: Japanese transcript for supplier, English operational notes for internal engineering.' }
      ],
      messages: [
        {
          sender: 'vendor',
          time: '04:15:10 AM',
          text: "拝啓\n貴社益々ご清栄のこととお慶び申し上げます。PO #JP-8812の光学レンズ仕様に関しまして、図面記載の公差±0.001mmは現行設備での歩留まりに影響を及ぼす懸念がございます。公差±0.0025mmへの変更、または単価の見直しをご相談願えませんでしょうか。\n敬具"
        },
        {
          sender: 'ai-agent',
          time: '04:15:15 AM',
          text: "高橋様\n平素は格別のご高配を賜り、厚く御礼申し上げます。\n\n弊社の技術設計部門と確認いたしましたところ、本製品の機能要件上、公差は最大で±0.0020mmまで許容可能であることが確認できました。\n\n歩留まり改善のため、公差±0.0020mmで正式承認し、出荷時検査成績書の添付をお願いできればと存じます。本条件にて現行単価（1個あたり¥14,500）での製造を進めていただけますでしょうか。\n何卒よろしくお願い申し上げます。\n\n[Internal Translation: Approved tolerance relaxation to ±0.0020mm with CMM inspection cert; preserved ¥14,500 base price without hike.]",
          erpBadge: "PLM & SAP Sync: Spec Tolerance Updated • Zero Cost Escalation"
        },
        {
          sender: 'vendor',
          time: '04:15:40 AM',
          text: "迅速なご回答に感謝いたします。公差±0.0020mmであれば目標歩留まりを達成できます。各ロットの検査成績書を添付の上、現行単価¥14,500にて期日通り出荷手配を進めます。"
        },
        {
          sender: 'ai-agent',
          time: '04:15:46 AM',
          text: "ご快諾いただき心より感謝申し上げます。変更仕様書（Rev. 2.1）をサプライヤーポータルに更新いたしました。引き続き何卒よろしくお願い申し上げます。",
          erpBadge: "Engineering Change Notice (ECN-401) Autonomously Approved"
        }
      ],
      quickReplies: [
        "公差±0.0020mmにて承知いたしました。",
        "納期は予定通り来月15日となります。",
        "Could you also confirm the revised packaging specs?"
      ]
    }
  };

  // State
  let currentScenario = 'rfq';
  let messageIndex = 0;
  let isSimulating = false;
  let autonomyLevel = 4;

  // DOM Elements
  let tabsContainer, cognitiveStream, chatMessagesScroll, vendorAvatar, vendorName, vendorContext, channelTag, quickPromptsBar, inputField, sendBtn, typingIndicator;
  let confidenceVal, confidenceProgress, autonomyBadge, autonomySlider;

  function initSimulator() {
    tabsContainer = document.getElementById('scenario-tabs');
    cognitiveStream = document.getElementById('sim-cognitive-stream');
    chatMessagesScroll = document.getElementById('sim-chat-messages');
    vendorAvatar = document.getElementById('sim-vendor-avatar');
    vendorName = document.getElementById('sim-vendor-name');
    vendorContext = document.getElementById('sim-vendor-context');
    channelTag = document.getElementById('sim-channel-tag');
    quickPromptsBar = document.getElementById('quick-prompts-bar');
    inputField = document.getElementById('sim-input-field');
    sendBtn = document.getElementById('sim-send-btn');
    typingIndicator = document.getElementById('sim-typing-indicator');
    confidenceVal = document.getElementById('sim-confidence-val');
    confidenceProgress = document.getElementById('sim-confidence-progress');
    autonomyBadge = document.getElementById('autonomy-badge');
    autonomySlider = document.getElementById('autonomy-slider');

    if (!tabsContainer || !chatMessagesScroll) return;

    setupEvents();
    loadScenario('rfq');
  }

  function setupEvents() {
    // Scenario tabs clicking
    const tabs = tabsContainer.querySelectorAll('.scenario-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const scenarioId = tab.getAttribute('data-scenario');
        if (scenarioId && SCENARIOS[scenarioId]) {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          loadScenario(scenarioId);
        }
      });
    });

    // Autonomy slider
    if (autonomySlider) {
      autonomySlider.addEventListener('input', (e) => {
        autonomyLevel = parseInt(e.target.value, 10);
        const labels = {
          1: 'Level 1: Read-Only Audit',
          2: 'Level 2: Co-Pilot (Approval Required)',
          3: 'Level 3: Guardrailed Autonomous',
          4: 'Level 4: Full Autonomous Execution'
        };
        if (autonomyBadge) {
          autonomyBadge.textContent = labels[autonomyLevel] || 'Level 4';
        }
      });
    }

    // Input submission
    if (sendBtn && inputField) {
      sendBtn.addEventListener('click', handleUserSendMessage);
      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleUserSendMessage();
        }
      });
    }
  }

  function loadScenario(scenarioId) {
    currentScenario = scenarioId;
    const scenario = SCENARIOS[scenarioId];
    if (!scenario) return;

    // Reset simulator view
    chatMessagesScroll.innerHTML = '';
    cognitiveStream.innerHTML = '';

    // Update vendor bar
    if (vendorName) vendorName.textContent = scenario.vendor.name;
    if (vendorContext) vendorContext.textContent = `${scenario.vendor.contact} • Channel: ${scenario.channel}`;
    if (vendorAvatar) {
      vendorAvatar.textContent = scenario.vendor.avatar;
      vendorAvatar.style.background = `linear-gradient(135deg, ${scenario.vendor.avatarColor}, #4338ca)`;
    }
    if (channelTag) {
      channelTag.innerHTML = `<span>${scenario.vendor.channelIcon}</span><span>${scenario.channel}</span>`;
    }

    // Update Quick Prompts
    renderQuickPrompts(scenario.quickReplies);

    // Stream the pre-defined dialogue sequence
    playScenarioDialogue(scenario);
  }

  function renderQuickPrompts(prompts) {
    if (!quickPromptsBar) return;
    quickPromptsBar.innerHTML = '';
    if (!prompts || prompts.length === 0) return;

    prompts.forEach(text => {
      const chip = document.createElement('button');
      chip.className = 'quick-prompt-chip';
      chip.type = 'button';
      chip.textContent = text;
      chip.addEventListener('click', () => {
        if (inputField) {
          inputField.value = text;
          handleUserSendMessage();
        }
      });
      quickPromptsBar.appendChild(chip);
    });
  }

  function playScenarioDialogue(scenario) {
    // Populate Cognitive Steps progressively
    scenario.cognitiveTrace.forEach((step, idx) => {
      setTimeout(() => {
        addCognitiveStep(step.title, step.detail);
      }, idx * 400);
    });

    // Populate Messages progressively
    scenario.messages.forEach((msg, idx) => {
      setTimeout(() => {
        if (msg.sender === 'ai-agent') {
          showTypingIndicator();
          setTimeout(() => {
            hideTypingIndicator();
            appendChatMessage(msg);
          }, 600);
        } else {
          appendChatMessage(msg);
        }
      }, (idx + 1) * 1100);
    });
  }

  function addCognitiveStep(title, detail) {
    if (!cognitiveStream) return;
    const stepEl = document.createElement('div');
    stepEl.className = 'cognitive-step';
    stepEl.innerHTML = `
      <div class="step-icon">⚡</div>
      <div class="step-content">
        <div class="step-title">${title}</div>
        <div class="step-detail">${detail}</div>
      </div>
    `;
    cognitiveStream.appendChild(stepEl);
    cognitiveStream.scrollTop = cognitiveStream.scrollHeight;
  }

  function appendChatMessage(msg) {
    if (!chatMessagesScroll) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${msg.sender}`;

    const now = msg.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const senderTitle = msg.sender === 'ai-agent' ? 'NexusProcure AI' : 'Supplier Representative';

    let erpSnippet = '';
    if (msg.erpBadge) {
      erpSnippet = `<div class="msg-erp-badge"><span>⚡</span> ${msg.erpBadge}</div>`;
    }

    // Format newlines
    const formattedText = msg.text.replace(/\n/g, '<br>');

    msgEl.innerHTML = `
      <div class="chat-bubble">
        <div class="msg-header">
          <span class="sender-name">${senderTitle}</span>
          <span class="msg-time">${now}</span>
        </div>
        <div class="msg-body">${formattedText}</div>
        ${erpSnippet}
      </div>
    `;

    chatMessagesScroll.appendChild(msgEl);
    chatMessagesScroll.scrollTop = chatMessagesScroll.scrollHeight;
  }

  function showTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.style.display = 'inline-flex';
      chatMessagesScroll.appendChild(typingIndicator);
      chatMessagesScroll.scrollTop = chatMessagesScroll.scrollHeight;
    }
  }

  function hideTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.style.display = 'none';
    }
  }

  // Handle custom user input (roleplaying as supplier)
  function handleUserSendMessage() {
    if (!inputField) return;
    const text = inputField.value.trim();
    if (!text) return;

    inputField.value = '';

    // Append user message as supplier
    const userMsg = {
      sender: 'vendor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      text: text
    };
    appendChatMessage(userMsg);

    // AI analyzes user response
    generateAIResponseToUserInput(text);
  }

  function generateAIResponseToUserInput(supplierText) {
    showTypingIndicator();

    // Generate dynamic cognitive thought based on input
    const lower = supplierText.toLowerCase();

    let thoughtTitle = "INTENT CLASSIFICATION & POLICY MATCH";
    let thoughtDetail = `Parsing supplier statement: "${supplierText.substring(0, 45)}...". Evaluating against corporate procurement guardrails.`;
    let responseText = "";
    let erpBadge = "SAP S/4HANA: Live Audit Logged";

    if (lower.includes('accept') || lower.includes('agree') || lower.includes('deal') || lower.includes('承知') || lower.includes('yes')) {
      thoughtTitle = "CONTRACT CLOSURE & AUTOMATED EXECUTION";
      thoughtDetail = "Agreement terms detected. Locking contracted parameters, generating formal PO addendum, and executing bilateral digital signatures.";
      responseText = "Excellent. We appreciate the constructive agreement. The updated Purchase Order with finalized terms has been locked into SAP and dispatched to your procurement inbox. We look forward to successful execution.";
      erpBadge = "PO Status: Confirmed & Finalized in SAP";
    } else if (lower.includes('price') || lower.includes('expensive') || lower.includes('cost') || lower.includes('margin') || lower.includes('discount')) {
      thoughtTitle = "DYNAMIC PRICING ELASTICITY & CONCESSION";
      thoughtDetail = "Supplier raised cost/margin consideration. Computing alternative levers: trade-credit acceleration vs tooling subsidy balance.";
      responseText = "We understand your cost pressures. If unit price is constrained, we can adjust our payment terms from Net 60 to Net 15 via automated supply chain financing, or commit to absorbing outbound freight on subsequent replenishment cycles. Would this structure bridge the gap?";
      erpBadge = "Working Capital Engine: 15-Day Early Pay Proposed";
    } else if (lower.includes('delay') || lower.includes('late') || lower.includes('time') || lower.includes('schedule') || lower.includes('lead') || lower.includes('week')) {
      thoughtTitle = "SUPPLY RISK BUFFER COMPUTATION";
      thoughtDetail = "Schedule adjustment evaluated against master assembly timetable. Safety threshold is 5 business days.";
      responseText = "Our production lines require delivery assurance by the 18th to avoid downstream retooling. Can you commit to a partial batch delivery by the 12th with the remaining balance expedited without penalty?";
      erpBadge = "Risk Matrix: Production Schedule Re-calculated";
    } else if (lower.includes('invoice') || lower.includes('surcharge') || lower.includes('tax') || lower.includes('fee') || lower.includes('credit')) {
      thoughtTitle = "FINANCIAL AUDIT & 3-WAY RECONCILIATION";
      thoughtDetail = "Validating line items against Master Service Agreement tariff schedules.";
      responseText = "Our automated billing engine has cross-referenced the line items against Agreement Clause 12.3. Please ensure the amended credit memorandum is uploaded directly through the supplier portal to release scheduled payment.";
      erpBadge = "ERP Finance: Audit Reconciliation Clear";
    } else {
      thoughtTitle = "MULTI-TURN NEGOTIATION SYNTHESIS";
      thoughtDetail = `Semantic vector alignment score: 96.8%. Formulating collaborative counter-response within autonomous mandate.`;
      responseText = `Thank you for the clarification. We have incorporated this update into our active order telemetry. Our internal procurement workflows and warehouse staging teams have been synchronized accordingly. Is there any additional documentation required from our end?`;
      erpBadge = "Autonomous Agent: Synced with Enterprise ERP";
    }

    setTimeout(() => {
      addCognitiveStep(thoughtTitle, thoughtDetail);
    }, 400);

    setTimeout(() => {
      hideTypingIndicator();
      appendChatMessage({
        sender: 'ai-agent',
        text: responseText,
        erpBadge: erpBadge
      });
    }, 1400);
  }

  // Initialize once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulator);
  } else {
    initSimulator();
  }

})();
