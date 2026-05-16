'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('currency-amount');
  const fromSelect = document.getElementById('currency-from');
  const toSelect = document.getElementById('currency-to');
  const calcBtn = document.getElementById('currency-calculate');
  const swapBtn = document.getElementById('currency-swap');
  const resetBtn = document.getElementById('currency-reset');
  const resultDiv = document.getElementById('currency-result');

  function formatMoney(value) {
    return '$' + Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatNum(value, decimals) {
    if (decimals === undefined) decimals = 4;
    return Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  function showError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('has-error');
    group.querySelector('.error-message').textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll('.form-group.has-error').forEach(function (el) {
      el.classList.remove('has-error');
    });
  }

  function validateInputs() {
    clearErrors();
    let valid = true;

    const amount = amountInput.value.trim();
    if (amount === '' || isNaN(Number(amount)) || Number(amount) <= 0) {
      showError(amountInput, '請輸入大於 0 的金額');
      valid = false;
    }

    return valid;
  }

  amountInput.addEventListener('input', function () {
    const group = amountInput.closest('.form-group');
    group.classList.remove('has-error');
  });

  // API: https://api.frankfurter.app/latest?from=USD&to=TWD
  async function fetchRate(from, to) {
    if (from === to) {
      return { rate: 1, date: new Date().toISOString().split('T')[0] };
    }

    try {
      const response = await fetch('https://api.frankfurter.app/latest?from=' + from + '&to=' + to);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      return {
        rate: data.rates[to],
        date: data.date,
      };
    } catch (e) {
      // Fallback: try reverse API
      try {
        const response = await fetch('https://api.frankfurter.app/latest?from=' + to + '&to=' + from);
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        return {
          rate: 1 / data.rates[from],
          date: data.date,
        };
      } catch (e2) {
        throw new Error('無法取得匯率資料，請稍後再試');
      }
    }
  }

  async function doConversion() {
    if (!validateInputs()) return;

    const amount = Number(amountInput.value.trim());
    const from = fromSelect.value;
    const to = toSelect.value;

    calcBtn.disabled = true;
    calcBtn.textContent = '轉換中...';

    try {
      const result = await fetchRate(from, to);
      const converted = amount * result.rate;

      document.getElementById('currency-result-value').textContent =
        formatMoney(amount) + ' ' + from + ' = ' + formatMoney(converted) + ' ' + to;

      document.getElementById('currency-result-label').textContent =
        formatMoney(amount) + ' ' + from + ' 等於';

      document.getElementById('currency-rate').textContent =
        '1 ' + from + ' = ' + formatNum(result.rate) + ' ' + to;

      document.getElementById('currency-date').textContent = result.date;

      resultDiv.style.display = 'block';
    } catch (e) {
      showError(amountInput, e.message);
    } finally {
      calcBtn.disabled = false;
      calcBtn.textContent = '轉換';
    }
  }

  calcBtn.addEventListener('click', doConversion);

  swapBtn.addEventListener('click', function () {
    const fromVal = fromSelect.value;
    const toVal = toSelect.value;
    fromSelect.value = toVal;
    toSelect.value = fromVal;

    // If result is visible, re-calculate
    if (resultDiv.style.display !== 'none') {
      doConversion();
    }
  });

  resetBtn.addEventListener('click', function () {
    amountInput.value = '';
    fromSelect.value = 'USD';
    toSelect.value = 'TWD';
    clearErrors();
    resultDiv.style.display = 'none';
  });

  amountInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      calcBtn.click();
    }
  });
});
