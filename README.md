# ⚡ NexusProcure AI

> **Autonomous AI Agent for Global Supplier Communication, Intelligent Negotiation & Strategic Sourcing**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini%20API-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📖 Overview

**NexusProcure AI** is an enterprise-grade autonomous sourcing and procurement platform designed to automate end-to-end supplier interactions, orchestrate multi-round contractual negotiations, and dynamically optimize procurement costs at scale.

Equipped with real-time **Google Gemini AI** reasoning and multi-modal intelligence, NexusProcure AI analyzes RFQs, models price-volume elasticity curves, mitigates supply chain risks, and engages vendors across 40+ languages.

---

## ✨ Key Features & Modules

### 1. 🤖 Autonomous Agent Simulator Console ([`simulator.html`](./simulator.html))
- **Live Multi-Round Negotiations**: Interactive simulation engine supporting dynamic concession curves (Aggressive, Balanced, Collaborative, Volume-Leveraged).
- **Dual AI Engine**: Powered by Google Gemini (`gemini-2.5-flash`, `gemini-2.5-pro`) with automated offline heuristic fallback.
- **Negotiation Telemetry**: Live metrics for target price convergence, discount percentage, concession pacing, and contract risk scoring.

### 2. 📊 Procurement ROI & Savings Calculator ([`calculator.html`](./calculator.html))
- **Interactive Financial Modeling**: Estimate annual savings, labor hour reductions, negotiation cycle speedups, and multi-year ROI.
- **Dynamic Cost Breakdown**: Visual breakdown of direct material savings, tail-spend capture, and SLA penalty avoidance.

### 3. 🌐 Autonomous Supplier Experience Portal ([`portal.html`](./portal.html))
- **Self-Service Supplier Hub**: Real-time counter-proposal submission, milestone tracking, specification validation, and contract signature workflows.
- **AI Sentiment & Compliance Check**: Automatic assessment of vendor compliance and response tone.

### 4. 🔗 Enterprise Integrations & Developer API ([`integrations.html`](./integrations.html))
- Pre-built connectors for **SAP Ariba**, **Coupa**, **Workday**, **Oracle Cloud ERP**, and **Salesforce**.
- RESTful & Webhook architecture for automated PO generation and ERP synchronization.

### 5. 🛡️ Enterprise Security, Trust & Compliance ([`security.html`](./security.html))
- SOC 2 Type II, ISO 27001, GDPR, and HIPAA compliance readiness.
- End-to-end encryption (AES-256 at rest, TLS 1.3 in transit) with granular role-based access control (RBAC).

### 6. 🧪 Sandbox Provisioning Studio ([`demo.html`](./demo.html))
- Interactive sandbox environment to test custom supplier scenarios, configure guardrails, and audit agent decision trees.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: Vanilla Semantic HTML5 & Modern ES6+ JavaScript (zero build step required).
- **Styling**: Custom modern CSS3 with Glassmorphism, CSS Grid/Flexbox, sleek dark theme, and micro-animations.
- **AI & LLM Integration**: Google Gemini REST API (`js/gemini-service.js` & `js/gemini-ui.js`).
- **Data Visualization**: Real-time canvas charts and interactive DOM metrics.

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/aryapatle123/Js-ca-3.git
cd Js-ca-3
```

### 2. Run Locally
Because this project is built with vanilla web standards, no `npm install` or compilation is required! You can open it directly in any modern browser:

- **Method A**: Double-click [`index.html`](./index.html) to open in your browser.
- **Method B (VS Code Live Server)**:
  1. Open the folder in VS Code.
  2. Right-click [`index.html`](./index.html) and select **"Open with Live Server"**.
- **Method C (Python HTTP Server)**:
  ```bash
  python -m http.server 8000
  ```
  Visit `http://localhost:8000` in your browser.

### 3. (Optional) Configure Gemini AI Key
To enable real-time Gemini AI capabilities:
1. Click the floating **✦ (Gemini AI)** button on any page.
2. Enter your [Google AI Studio API Key](https://aistudio.google.com/).
3. Choose your preferred model (`Gemini 2.5 Flash`, `Gemini 2.5 Pro`, etc.) and click **Save & Test Connection**.

---

## 📁 Repository Structure

```text
├── index.html            # Primary landing page & platform overview
├── capabilities.html     # Deep dive into agent architecture & intelligence
├── simulator.html        # Interactive negotiation simulator console
├── calculator.html       # Enterprise ROI & procurement savings calculator
├── portal.html           # Supplier-facing collaboration portal
├── integrations.html     # ERP/Procurement API & integration directory
├── security.html         # Security architecture & compliance certifications
├── demo.html             # Sandbox environment & interactive demo
├── styles/
│   └── main.css          # Design system, glassmorphism tokens & animations
├── js/
│   ├── app.js            # Global navigation, animations, and page logic
│   ├── agent-simulator.js# Negotiation simulator state machine & algorithms
│   ├── gemini-service.js # Google Gemini API client & prompt engineering
│   └── gemini-ui.js      # Slide-over AI settings panel & model manager
├── assets/               # Visual assets and design diagrams
└── .gitignore            # Git ignore rules (protecting .env & credentials)
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.