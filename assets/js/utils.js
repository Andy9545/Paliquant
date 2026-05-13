'use strict';

const FinCalc = window.FinCalc || {};

FinCalc.Utils = {
  formatCurrency(value, currency = 'NTD') {
    const formatter = new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: currency === 'NTD' ? 'TWD' : currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  },

  formatNumber(value, decimals = 2) {
    return Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  },

  formatPercent(value, decimals = 2) {
    return Number(value).toFixed(decimals) + '%';
  },

  validateNumber(value, { min = 0, max = Infinity, required = true } = {}) {
    if (required && (value === '' || value === null || value === undefined)) {
      return { valid: false, message: '請輸入數值' };
    }
    const num = Number(value);
    if (isNaN(num)) {
      return { valid: false, message: '請輸入有效數字' };
    }
    if (num < min) {
      return { valid: false, message: `數值不能小於 ${min}` };
    }
    if (num > max) {
      return { valid: false, message: `數值不能大於 ${max}` };
    }
    return { valid: true, value: num };
  },

  validatePositiveNumber(value, { required = true } = {}) {
    return FinCalc.Utils.validateNumber(value, { min: 0, required });
  },

  validateRate(value, { required = true } = {}) {
    return FinCalc.Utils.validateNumber(value, { min: 0, max: 100, required });
  },

  showError(inputElement, message) {
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;
    formGroup.classList.add('has-error');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = message;
    }
  },

  clearError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;
    formGroup.classList.remove('has-error');
  },

  clearAllErrors(formElement) {
    formElement.querySelectorAll('.form-group.has-error').forEach((el) => {
      el.classList.remove('has-error');
    });
  },

  getElement(id) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Element #${id} not found`);
    }
    return el;
  },

  getValue(id) {
    const el = FinCalc.Utils.getElement(id);
    return el ? el.value.trim() : '';
  },

  setText(id, text) {
    const el = FinCalc.Utils.getElement(id);
    if (el) {
      el.textContent = text;
    }
  },

  getFormattedDate() {
    return new Date().toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
};

window.FinCalc = FinCalc;
