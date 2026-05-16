'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('loan-amount');
  const rateInput = document.getElementById('loan-rate');
  const yearsInput = document.getElementById('loan-years');
  const calcBtn = document.getElementById('loan-calculate');
  const resetBtn = document.getElementById('loan-reset');
  const resultDiv = document.getElementById('loan-result');

  let chartInstance = null;

  function formatMoney(value) {
    return '$' + Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  // Formula: M = P * r * (1+r)^n / ((1+r)^n - 1)
  // P = principal, r = monthly interest rate, n = total months
  function calculateLoan(principal, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    if (annualRate === 0) {
      const monthly = principal / months;
      return {
        monthlyPayment: monthly,
        totalPayment: principal,
        totalInterest: 0,
      };
    }

    const factor = Math.pow(1 + monthlyRate, months);
    const monthlyPayment = principal * monthlyRate * factor / (factor - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: monthlyPayment,
      totalPayment: totalPayment,
      totalInterest: totalInterest,
    };
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
    const rate = rateInput.value.trim();
    const years = yearsInput.value.trim();

    if (!amount || isNaN(Number(amount)) || Number(amount) < 0) {
      const group = amountInput.closest('.form-group');
      group.classList.add('has-error');
      group.querySelector('.error-message').textContent = '請輸入有效的正數金額';
      valid = false;
    }

    if (!rate || isNaN(Number(rate)) || Number(rate) < 0 || Number(rate) > 100) {
      const group = rateInput.closest('.form-group');
      group.classList.add('has-error');
      group.querySelector('.error-message').textContent = '請輸入 0-100 之間的利率';
      valid = false;
    }

    if (!years || isNaN(Number(years)) || Number(years) < 1 || Number(years) > 50) {
      const group = yearsInput.closest('.form-group');
      group.classList.add('has-error');
      group.querySelector('.error-message').textContent = '請輸入 1-50 之間的年限';
      valid = false;
    }

    return valid;
  }

  function clearInputErrors() {
    [amountInput, rateInput, yearsInput].forEach(function (input) {
      input.addEventListener('input', function () {
        const group = input.closest('.form-group');
        group.classList.remove('has-error');
      });
    });
  }
  clearInputErrors();

  function renderResult(result, principal, annualRate, years) {
    document.getElementById('loan-monthly-payment').textContent = formatMoney(result.monthlyPayment);
    document.getElementById('loan-total-payment').textContent = formatMoney(result.totalPayment);
    document.getElementById('loan-total-interest').textContent = formatMoney(result.totalInterest);
    document.getElementById('loan-display-rate').textContent = annualRate + '% / ' + years + ' 年';

    resultDiv.style.display = 'block';

    // Chart
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById('loan-chart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['本金', '總利息'],
        datasets: [{
          data: [principal, result.totalInterest],
          backgroundColor: ['#2563eb', '#f59e0b'],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#e5e7eb',
              font: {
                size: 14,
              },
              padding: 16,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            titleColor: '#e5e7eb',
            bodyColor: '#e5e7eb',
            borderColor: '#333',
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                return context.label + ': ' + formatMoney(context.parsed);
              },
            },
          },
        },
      },
    });
  }

  calcBtn.addEventListener('click', function () {
    if (!validateInputs()) return;

    const principal = Number(amountInput.value.trim());
    const annualRate = Number(rateInput.value.trim());
    const years = Number(yearsInput.value.trim());

    if (principal === 0) {
      renderResult({
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
      }, 0, annualRate, years);
      return;
    }

    const result = calculateLoan(principal, annualRate, years);
    renderResult(result, principal, annualRate, years);
  });

  resetBtn.addEventListener('click', function () {
    amountInput.value = '';
    rateInput.value = '';
    yearsInput.value = '';
    clearErrors();
    resultDiv.style.display = 'none';
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });

  // Enter key support
  document.querySelectorAll('#loan-amount, #loan-rate, #loan-years').forEach(function (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calcBtn.click();
      }
    });
  });
});
