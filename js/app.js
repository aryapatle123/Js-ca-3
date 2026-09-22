/**
 * NexusProcure AI - Main Application Logic
 * Navigation, ROI Calculator, Perspective Toggle, Stat Counters, and Modal Handlers
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPerspectiveSwitcher();
    initRoiCalculator();
    initStatCounters();
    initDemoModal();
  });

  /* ==========================================================================
     Navigation & Scrolling
     ========================================================================== */
  function initNavigation() {
    const nav = document.getElementById('site-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        const isHidden = window.getComputedStyle(navLinks).display === 'none';
        navLinks.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '100%';
          navLinks.style.left = '0';
          navLinks.style.width = '100%';
          navLinks.style.background = 'rgba(9, 13, 26, 0.98)';
          navLinks.style.padding = '20px';
          navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
      });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  /* ==========================================================================
     Dual Perspective Switcher (Buyer vs Supplier View)
     ========================================================================== */
  function initPerspectiveSwitcher() {
    const pills = document.querySelectorAll('.perspective-pill');
    const views = document.querySelectorAll('.perspective-view');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const targetView = pill.getAttribute('data-view');
        
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        views.forEach(v => {
          if (v.id === `view-${targetView}`) {
            v.classList.add('active');
          } else {
            v.classList.remove('active');
          }
        });
      });
    });
  }

  /* ==========================================================================
     Interactive ROI Calculator
     ========================================================================== */
  function initRoiCalculator() {
    const spendSlider = document.getElementById('calc-spend');
    const suppliersSlider = document.getElementById('calc-suppliers');
    const teamSlider = document.getElementById('calc-team');

    const spendDisplay = document.getElementById('calc-spend-val');
    const suppliersDisplay = document.getElementById('calc-suppliers-val');
    const teamDisplay = document.getElementById('calc-team-val');

    const outputSavings = document.getElementById('calc-out-savings');
    const outputHours = document.getElementById('calc-out-hours');
    const outputCycleTime = document.getElementById('calc-out-cycle');
    const outputPayback = document.getElementById('calc-out-payback');

    if (!spendSlider || !outputSavings) return;

    function updateCalculations() {
      const spendMillions = parseFloat(spendSlider.value); // e.g. 50 = $50M
      const suppliers = parseInt(suppliersSlider.value, 10); // e.g. 450
      const teamSize = parseInt(teamSlider.value, 10); // e.g. 15

      // Display Labels
      spendDisplay.textContent = `$${spendMillions.toLocaleString()}M`;
      suppliersDisplay.textContent = `${suppliers.toLocaleString()} Vendors`;
      teamDisplay.textContent = `${teamSize} FTEs`;

      // ROI Math:
      // Direct spend optimization: 2.8% to 4.2% average autonomous negotiation discount & leak capture
      const directSavings = (spendMillions * 1000000) * 0.034;
      
      // Operational efficiency: Each buyer spends ~65% time on manual PO chasing, RFQ reconciliation, invoice emails
      // 1 FTE = ~2,000 hrs/yr. Reclaim ~68% of manual communication time.
      const hoursReclaimed = Math.round(teamSize * 2000 * 0.68);

      // Value of hours saved (~$65/hr fully loaded procurement rate)
      const opsSavings = hoursReclaimed * 65;

      const totalAnnualValue = directSavings + opsSavings;

      // Estimated payback in days (based on standard enterprise platform tier)
      const estimatedCost = Math.max(75000, spendMillions * 1000000 * 0.0018);
      const paybackDays = Math.max(18, Math.round((estimatedCost / totalAnnualValue) * 365));

      // Update UI with smooth formatting
      outputSavings.textContent = formatCurrency(totalAnnualValue);
      outputHours.textContent = `${hoursReclaimed.toLocaleString()} hrs`;
      outputCycleTime.textContent = `-74%`;
      outputPayback.textContent = `${paybackDays} Days`;
    }

    function formatCurrency(amount) {
      if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(2)}M / yr`;
      }
      return `$${Math.round(amount).toLocaleString()} / yr`;
    }

    spendSlider.addEventListener('input', updateCalculations);
    suppliersSlider.addEventListener('input', updateCalculations);
    teamSlider.addEventListener('input', updateCalculations);

    // Initial calculation
    updateCalculations();
  }

  /* ==========================================================================
     Stat Numbers Counter Animation
     ========================================================================== */
  function initStatCounters() {
    const statElements = document.querySelectorAll('.stat-counter');
    let animated = false;

    function checkScroll() {
      if (animated) return;

      statElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          animated = true;
          startCount(el);
        }
      });
    }

    function startCount(el) {
      const target = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutQuad(progress);
        const currentVal = target * easeProgress;

        if (target % 1 === 0) {
          el.textContent = `${prefix}${Math.round(currentVal).toLocaleString()}${suffix}`;
        } else {
          el.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    }

    function easeOutQuad(x) {
      return 1 - (1 - x) * (1 - x);
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ==========================================================================
     Demo Booking Modal
     ========================================================================== */
  function initDemoModal() {
    const modal = document.getElementById('demo-modal');
    const openBtns = document.querySelectorAll('.trigger-demo-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const form = document.getElementById('demo-schedule-form');
    const formContent = document.getElementById('modal-form-content');
    const successState = document.getElementById('modal-success-state');

    if (!modal) return;

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (form && successState) {
        setTimeout(() => {
          form.reset();
          formContent.style.display = 'block';
          successState.style.display = 'none';
        }, 300);
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Generating Sandbox Access...';
        submitBtn.disabled = true;

        setTimeout(() => {
          formContent.style.display = 'none';
          successState.style.display = 'block';
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1000);
      });
    }
  }

})();
