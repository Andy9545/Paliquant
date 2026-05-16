'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const monthlyInput = document.getElementById('investment-monthly');
  const rateInput = document.getElementById('investment-rate');
  const yearsInput = document.getElementById('investment-years');
  const calcBtn = document.getElementById('investment-calculate');
  const resetBtn = document.getElementById('investment-reset');
  const resultDiv = document.getElementById('investment-result');

  let chartInstance = null;

  function formatMoney(value) {
    return '$' + Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  // FV = P * ((1+r)^n - 1) / r
  // P = monthly investment, r = monthly rate, n = total months
  function calculateInvestment(monthly, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    const totalPrincipal = monthly * months;

    let futureValue;
    if (annualRate === 0) {
      futureValue = totalPrincipal;
    } else {
      futureValue = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    }

    return {
      futureValue: futureValue,
      totalPrincipal: totalPrincipal,
      totalReturn: futureValue - totalPrincipal,
      returnRate: totalPrincipal > 0 ? ((futureValue - totalPrincipal) / totalPrincipal * 100) : 0,
    };
  }

  function generateYearlyData(monthly, annualRate, years) {
    const data = [];
    const monthlyRate = annualRate / 100 / 12;
    let cumulativePrincipal = 0;

    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      cumulativePrincipal = monthly * m;

      let valueAtYear;
      if (annualRate === 0) {
        valueAtYear = cumulativePrincipal;
      } else {
        valueAtYear = monthly * (Math.pow(1 + monthlyRate, m) - 1) / monthlyRate;
      }

      data.push({
        year: y,
        value: valueAtYear,
        principal: cumulativePrincipal,
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

    const monthly = monthlyInput.value.trim();
    const rate = rateInput.value.trim();
    const years = yearsInput.value.trim();

    if (monthly === '' || isNaN(Number(monthly)) || Number(monthly) <= 0) {
      showError(monthlyInput, '請輸入大於 0 的每月投資金額');
      valid = false;
    }

    if (!rate || isNaN(Number(rate)) || Number(rate) < 0 || Number(rate) > 100) {
      showError(rateInput, '請輸入 0-100 之間的報酬率');
      valid = false;
    }

    if (!years || isNaN(Number(years)) || Number(years) < 1 || Number(years) > 70) {
      showError(yearsInput, '請輸入 1-70 之間的年限');
      valid = false;
    }

    return valid;
  }

  function clearInputErrors() {
    [monthlyInput, rateInput, yearsInput].forEach(function (input) {
      input.addEventListener('input', function () {
        const group = input.closest('.form-group');
        group.classList.remove('has-error');
      });
    });
  }
  clearInputErrors();

  function renderResult(result, monthly, annualRate, years) {
    document.getElementById('investment-final').textContent = formatMoney(result.futureValue);
    document.getElementById('investment-principal').textContent = formatMoney(result.totalPrincipal);
    document.getElementById('investment-return').textContent = formatMoney(result.totalReturn);
    document.getElementById('investment-return-rate').textContent = result.returnRate.toFixed(1) + '%';

    resultDiv.style.display = 'block';

    if (chartInstance) {
      chartInstance.destroy();
    }

    const yearlyData = generateYearlyData(monthly, annualRate, years);

    const ctx = document.getElementById('investment-chart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: yearlyData.map(function (d) { return '第' + d.year + '年'; }),
        datasets: [
          {
            label: '投資總價值',
            data: yearlyData.map(function (d) { return d.value; }),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
          },
          {
            label: '累積投入本金',
            data: yearlyData.map(function (d) { return d.principal; }),
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

    const monthly = Number(monthlyInput.value.trim());
    const annualRate = Number(rateInput.value.trim());
    const years = Number(yearsInput.value.trim());

    const result = calculateInvestment(monthly, annualRate, years);
    renderResult(result, monthly, annualRate, years);
  });

  resetBtn.addEventListener('click', function () {
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

  document.querySelectorAll('#investment-monthly, #investment-rate, #investment-years').forEach(function (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calcBtn.click();
      }
    });
  });
});
