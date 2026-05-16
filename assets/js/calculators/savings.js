'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const initialInput = document.getElementById('savings-initial');
  const monthlyInput = document.getElementById('savings-monthly');
  const rateInput = document.getElementById('savings-rate');
  const yearsInput = document.getElementById('savings-years');
  const calcBtn = document.getElementById('savings-calculate');
  const resetBtn = document.getElementById('savings-reset');
  const resultDiv = document.getElementById('savings-result');

  let chartInstance = null;

  function formatMoney(value) {
    return '$' + Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  // FV = PV * (1+r)^n + PMT * ((1+r)^n - 1) / r
  // PV = initial principal, PMT = monthly contribution, r = monthly rate, n = total months
  function calculateSavings(initial, monthly, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    let futureValue;
    let totalDeposits = initial + monthly * months;

    if (annualRate === 0) {
      futureValue = totalDeposits;
    } else {
      const fvInitial = initial * Math.pow(1 + monthlyRate, months);
      const fvContributions = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
      futureValue = fvInitial + fvContributions;
    }

    return {
      futureValue: futureValue,
      totalDeposits: totalDeposits,
      totalInterest: futureValue - totalDeposits,
    };
  }

  function generateYearlyData(initial, monthly, annualRate, years) {
    const data = [];
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    let cumulativeDeposits = initial;

    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      cumulativeDeposits += monthly * 12;

      let valueAtYear;
      if (annualRate === 0) {
        valueAtYear = cumulativeDeposits;
      } else {
        const fvInitial = initial * Math.pow(1 + monthlyRate, m);
        const fvContributions = monthly * (Math.pow(1 + monthlyRate, m) - 1) / monthlyRate;
        valueAtYear = fvInitial + fvContributions;
      }

      data.push({
        year: y,
        value: valueAtYear,
        deposits: cumulativeDeposits,
      });
    }

    return data;
  }

  function clearErrors() {
    document.querySelectorAll('.form-group.has-error').forEach(function (el) {
      el.classList.remove('has-error');
    });
  }

  function showError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('has-error');
    group.querySelector('.error-message').textContent = message;
  }

  function validateInputs() {
    clearErrors();
    let valid = true;

    const initial = initialInput.value.trim();
    const monthly = monthlyInput.value.trim();
    const rate = rateInput.value.trim();
    const years = yearsInput.value.trim();

    if (initial === '' || isNaN(Number(initial)) || Number(initial) < 0) {
      showError(initialInput, '請輸入有效的初始存款金額');
      valid = false;
    }

    if (monthly === '' || isNaN(Number(monthly)) || Number(monthly) < 0) {
      showError(monthlyInput, '請輸入有效的每月存入金額');
      valid = false;
    }

    if (!rate || isNaN(Number(rate)) || Number(rate) < 0 || Number(rate) > 100) {
      showError(rateInput, '請輸入 0-100 之間的利率');
      valid = false;
    }

    if (!years || isNaN(Number(years)) || Number(years) < 1 || Number(years) > 70) {
      showError(yearsInput, '請輸入 1-70 之間的年限');
      valid = false;
    }

    return valid;
  }

  function clearInputErrors() {
    [initialInput, monthlyInput, rateInput, yearsInput].forEach(function (input) {
      input.addEventListener('input', function () {
        const group = input.closest('.form-group');
        group.classList.remove('has-error');
      });
    });
  }
  clearInputErrors();

  function renderResult(result, initial, monthly, annualRate, years) {
    document.getElementById('savings-total').textContent = formatMoney(result.futureValue);
    document.getElementById('savings-deposits').textContent = formatMoney(result.totalDeposits);
    document.getElementById('savings-interest').textContent = formatMoney(result.totalInterest);

    resultDiv.style.display = 'block';

    if (chartInstance) {
      chartInstance.destroy();
    }

    const yearlyData = generateYearlyData(initial, monthly, annualRate, years);

    const ctx = document.getElementById('savings-chart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: yearlyData.map(function (d) { return '第' + d.year + '年'; }),
        datasets: [
          {
            label: '帳戶總額',
            data: yearlyData.map(function (d) { return d.value; }),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
          },
          {
            label: '累積存入',
            data: yearlyData.map(function (d) { return d.deposits; }),
            borderColor: '#9ca3af',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#e5e7eb',
              font: {
                size: 13,
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
                return context.dataset.label + ': ' + formatMoney(context.parsed.y);
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(42, 42, 42, 0.5)',
            },
            ticks: {
              color: '#9ca3af',
              font: {
                size: 11,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(42, 42, 42, 0.5)',
            },
            ticks: {
              color: '#9ca3af',
              font: {
                size: 11,
              },
              callback: function (value) {
                if (value >= 10000) {
                  return (value / 10000).toFixed(0) + '萬';
                }
                return value;
              },
            },
          },
        },
      },
    });
  }

  calcBtn.addEventListener('click', function () {
    if (!validateInputs()) return;

    const initial = Number(initialInput.value.trim());
    const monthly = Number(monthlyInput.value.trim());
    const annualRate = Number(rateInput.value.trim());
    const years = Number(yearsInput.value.trim());

    if (initial === 0 && monthly === 0) {
      renderResult({
        futureValue: 0,
        totalDeposits: 0,
        totalInterest: 0,
      }, 0, 0, annualRate, years);
      return;
    }

    const result = calculateSavings(initial, monthly, annualRate, years);
    renderResult(result, initial, monthly, annualRate, years);
  });

  resetBtn.addEventListener('click', function () {
    initialInput.value = '';
    monthlyInput.value = '';
    rateInput.value = '';
    yearsInput.value = '';
    clearErrors();
    resultDiv.style.display = 'none';
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });

  document.querySelectorAll('#savings-initial, #savings-monthly, #savings-rate, #savings-years').forEach(function (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calcBtn.click();
      }
    });
  });
});
