# NexusProcure AI

> **Autonomous AI Agent for Global Supplier Communication, Intelligent Negotiation & Strategic Sourcing**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Powered by Groq](https://img.shields.io/badge/AI-Groq%20API-F55036?logo=fastapi&logoColor=white)](https://groq.com/)

---

## Overview

**NexusProcure AI** is an enterprise autonomous sourcing and procurement platform designed to automate end-to-end supplier interactions, orchestrate multi-round contractual negotiations, and dynamically optimize procurement costs.

Powered by ultra-fast **Groq LLM** reasoning (`openai/gpt-oss-120b`), NexusProcure AI analyzes RFQs, negotiates commercial terms like payment acceleration and volume commitments, and answers vendor inquiries 24/7.

---

## Key Features & Modules

### 1. Autonomous Negotiation Simulator ([`simulator.html`](./simulator.html))
- Live multi-round bargaining engine powered by Groq LLM reasoning.
- Negotiation telemetry for target price convergence, discount percentage, and ERP status badges.
- Plain English explanation of the AI agent's negotiation strategy.

### 2. Procurement Savings Calculator ([`calculator.html`](./calculator.html))
- Interactive financial modeling to estimate annual direct spend savings, dispute leakage recovery, and labor hours saved.
- Payback period and ROI estimation.

### 3. Supplier Experience Portal ([`portal.html`](./portal.html))
- 24/7 self-service hub for suppliers to check purchase orders, delivery milestones, and invoice status.
- Real-time Groq AI Concierge assistant answering vendor questions.

### 4. JWT Authentication ([`login.html`](./login.html))
- Client-side JSON Web Token (JWT) authentication using HMAC-SHA256.
- 1-click demo accounts for Buyers, Suppliers, and Admins.
- Live token inspector showing raw JWT and decoded claims.

---

## Tech Stack & Architecture

- **Frontend Core**: Semantic HTML5 and Modern ES6+ JavaScript (zero build step required).
- **Styling**: Clean solid CSS3 design system (gradient-free, high contrast, mobile responsive).
- **AI Engine**: Groq LLM API (`openai/gpt-oss-120b`).
- **Security & Auth**: Client-side HMAC-SHA256 signed JSON Web Tokens (`js/auth.js`).

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/aryapatle123/Js-ca-3.git
cd Js-ca-3
```

### 2. Run Locally
Because this project is built with vanilla web standards, no compilation is required. You can open it directly in any modern browser:

- **Method A**: Double-click [`index.html`](./index.html) to open in your browser.
- **Method B (Python HTTP Server)**:
  ```bash
  python -m http.server 8000
  ```
  Visit `http://localhost:8000` in your browser.

---

## Repository Structure

```text
├── index.html          # Primary landing page with interactive Groq AI preview
├── simulator.html      # Autonomous negotiation simulator console
├── portal.html         # Supplier collaboration portal & 24/7 AI concierge
├── calculator.html     # Procurement ROI & savings calculator
├── login.html          # JWT enterprise authentication screen & token inspector
├── styles/
│   └── main.css        # Master design system (solid, gradient-free, high contrast)
├── js/
│   ├── gemini-service.js # Groq LLM API client (aliased for compatibility)
│   ├── gemini-ui.js      # Groq AI status indicator & settings modal
│   ├── auth.js           # HMAC-SHA256 JWT authentication service
│   └── agent-simulator.js# Negotiation state machine
└── .gitignore          # Git ignore rules (protecting .env & docx reports)
```

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.