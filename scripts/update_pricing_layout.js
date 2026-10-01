const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('assets/css/style.css', 'utf8');

const oldPricingCss = `/* Pricing Cards */
.pricing-card-featured {
  border: 2px solid var(--accent);
  position: relative;
}

.pricing-ribbon {
  position: absolute;
  top: 16px;
  right: -32px;
  background: var(--accent);
  color: #0b1b3d;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 36px;
  transform: rotate(45deg);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

[dir="rtl"] .pricing-ribbon {
  right: auto;
  left: -32px;
  transform: rotate(-45deg);
}

.pricing-amount {
  font-size: 2.75rem;
  font-weight: 800;
  font-family: var(--font-heading);
  color: var(--primary);
  line-height: 1;
}

[data-bs-theme="dark"] .pricing-amount {
  color: #ffffff;
}

.pricing-installment-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  background-color: var(--secondary-subtle);
  color: var(--secondary);
  border: 1px solid rgba(30, 86, 160, 0.2);
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

[data-bs-theme="dark"] .pricing-installment-badge {
  background-color: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.3);
}`;

const newPricingCss = `/* Pricing Cards */
.pricing-card-featured {
  border: 2px solid var(--accent) !important;
  position: relative;
  overflow: hidden;
}

.pricing-ribbon {
  position: absolute;
  top: 20px;
  right: -34px;
  background: linear-gradient(135deg, var(--accent), #e6c55d);
  color: #0b1b3d;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.6px;
  padding: 5px 38px;
  transform: rotate(45deg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  z-index: 2;
}

[dir="rtl"] .pricing-ribbon {
  right: auto;
  left: -34px;
  transform: rotate(-45deg);
}

.pricing-price-box {
  padding: 0.75rem 0 1.15rem 0;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.pricing-amount-row {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}

.pricing-amount {
  font-size: 2.75rem;
  font-weight: 800;
  font-family: var(--font-heading);
  color: var(--primary);
  line-height: 1;
  letter-spacing: -0.5px;
}

[data-bs-theme="dark"] .pricing-amount {
  color: #ffffff;
}

.pricing-period {
  font-size: 0.88rem;
  color: var(--text-muted);
  font-weight: 500;
  white-space: nowrap;
}

.pricing-installment-badge {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  background-color: var(--secondary-subtle);
  color: var(--secondary);
  border: 1px solid rgba(30, 86, 160, 0.2);
  line-height: 1.35;
  margin-bottom: 0 !important;
  width: 100%;
}

[data-bs-theme="dark"] .pricing-installment-badge {
  background-color: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.3);
}`;

css = css.replace(/\r\n/g, '\n');
const oldCssNorm = oldPricingCss.replace(/\r\n/g, '\n');
const newCssNorm = newPricingCss.replace(/\r\n/g, '\n');

if (css.includes(oldCssNorm)) {
  css = css.replace(oldCssNorm, newCssNorm);
  fs.writeFileSync('assets/css/style.css', css, 'utf8');
  console.log('Successfully updated style.css with enhanced pricing rules!');
} else {
  console.log('Could not find old pricing css in style.css');
}

// 2. Update pricing.html cards
let pricingHtml = fs.readFileSync('pricing.html', 'utf8');
pricingHtml = pricingHtml.replace(/\r\n/g, '\n');

// Card 1
pricingHtml = pricingHtml.replace(
  /<div class="mb-3 text-start">[\s\S]*?<span class="pricing-amount">\$349<\/span>[\s\S]*?100% credited toward full retainer[\s\S]*?<\/div>[\s\S]*?<\/div>/,
  `<div class="pricing-price-box text-start">
              <div class="pricing-amount-row">
                <span class="pricing-amount">$349</span>
                <span class="pricing-period">/ One-Time Audit</span>
              </div>
              <div class="pricing-installment-badge">
                <i class="bi bi-credit-card text-success"></i>
                <span>100% credited toward full retainer</span>
              </div>
            </div>`
);

// Card 2
pricingHtml = pricingHtml.replace(
  /<div class="mb-3 text-start">[\s\S]*?<span class="pricing-amount">\$1,850<\/span>[\s\S]*?Flexible 3 Milestone Installments[\s\S]*?<\/div>[\s\S]*?<\/div>/,
  `<div class="pricing-price-box text-start">
              <div class="pricing-amount-row">
                <span class="pricing-amount">$1,850</span>
                <span class="pricing-period">/ Full Retainer</span>
              </div>
              <div class="pricing-installment-badge">
                <i class="bi bi-calendar-check text-primary"></i>
                <span>Flexible 3 Milestones (30% / 35% / 35%)</span>
              </div>
            </div>`
);

// Card 3
pricingHtml = pricingHtml.replace(
  /<div class="mb-3 text-start">[\s\S]*?<span class="pricing-amount">\$2,950<\/span>[\s\S]*?Flexible 4 Milestone Installments[\s\S]*?<\/div>[\s\S]*?<\/div>/,
  `<div class="pricing-price-box text-start">
              <div class="pricing-amount-row">
                <span class="pricing-amount">$2,950</span>
                <span class="pricing-period">/ Concierge Retainer</span>
              </div>
              <div class="pricing-installment-badge">
                <i class="bi bi-calendar-check text-info"></i>
                <span>Flexible 4 Milestone Installments</span>
              </div>
            </div>`
);

fs.writeFileSync('pricing.html', pricingHtml, 'utf8');
console.log('Successfully updated pricing.html cards structure and padding!');
