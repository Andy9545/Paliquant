'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const ageInput = document.getElementById('retirement-age');
  const targetInput = document.getElementById('retirement-target');
  const lifespanInput = document.getElementById('retirement-lifespan');
  const savingsInput = document.getElementById('retirement-savings');
  const monthlyInput = document.getElementById('retirement-monthly');
  const rateInput = document.getElementById('retirement-rate');
  const inflationInput = document.getElementById('retirement-inflation');
  const neededInput = document.getElementById('retirement-needed');
  const calcBtn = document.getElementById('retirement-calculate');
  const resetBtn = document.getElementById('retirement-reset');
  const resultDiv = document.getElementById('retirement-result');

  let chartInstance = null;

  function formatMoney(value) {
    return '$' + Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  function formatNum(value, decimals) {
    if (decimals === undefined) decimals = 0;
    return Number(value).toLocaleString('zh-TW', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  // Step 1: Calculate future value of current savings + monthly contributions at retirement
  function calculateRetirement(currentAge, targetAge, lifespan, currentSavings, monthlySaving, annualRate, inflation, monthlyNeeded) {
    const yearsToRetire = targetAge - currentAge;
    const yearsInRetirement = lifespan - targetAge;
    const monthsToRetire = yearsToRetire * 12;
    const monthsInRetirement = yearsInRetirement * 12;
    const monthlyRate = annualRate / 100 / 12;

    // Future value of current savings at retirement
    let fvSavings;
    if (annualRate === 0) {
      fvSavings = currentSavings;
    } else {
      fvSavings = currentSavings * Math.pow(1 + monthlyRate, monthsToRetire);
    }

    // Future value of monthly contributions at retirement
    let fvContributions;
    if (annualRate === 0) {
      fvContributions = monthlySaving * monthsToRetire;
    } else {
      fvContributions = monthlySaving * (Math.pow(1 + monthlyRate, monthsToRetire) - 1) / monthlyRate;
    }

    const totalAtRetirement = fvSavings + fvContributions;

    // Calculate monthly withdrawal during retirement (PV of annuity)
    // PMT = PV * r / (1 - (1+r)^(-n))
    let monthlyIncome;
    if (annualRate === 0) {
      monthlyIncome = totalAtRetirement / monthsInRetirement;
    } else {
      monthlyIncome = totalAtRetirement * monthlyRate / (1 - Math.pow(1 + monthlyRate, -monthsInRetirement));
    }

    // Adjust desired monthly income for inflation at retirement
    const inflationRate = inflation / 100;
    let adjustedNeeded;
    if (inflationRate === 0) {
      adjustedNeeded = monthlyNeeded;
    } else {
      adjustedNeeded = monthlyNeeded * Math.pow(1 + inflationRate, yearsToRetire);
    }

    const isSufficient = monthlyIncome >= adjustedNeeded;
    const gap = adjustedNeeded - monthlyIncome;

    return {
      totalAtRetirement: totalAtRetirement,
      monthlyIncome: monthlyIncome,
      adjustedNeeded: adjustedNeeded,
      isSufficient: isSufficient,
      gap: gap,
      yearsToRetire: yearsToRetire,
      yearsInRetirement: yearsInRetirement,
    };
  }

  function generateAssetProjection(currentAge, targetAge, lifespan, currentSavings, monthlySaving, annualRate) {
    const data = [];
    const monthlyRate = annualRate / 100 / 12;

    // Show projection from current age to life expectancy
    for (let age = currentAge; age <= lifespan; age++) {
      const yearsElapsed = age - currentAge;
      const m = yearsElapsed * 12;

      let totalAssets;
      if (annualRate === 0) {
        totalAssets = currentSavings + monthlySaving * m;
      } else {
        const fvSavings = currentSavings * Math.pow(1 + monthlyRate, m);
        const fvContributions = monthlySaving * (Math.pow(1 + monthlyRate, m) - 1) / monthlyRate;
        totalAssets = fvSavings + fvContributions;
      }

      data.push({
        age: age,
        assets: totalAssets,
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

    const age = Number(ageInput.value.trim());
    const target = Number(targetInput.value.trim());
    const lifespan = Number(lifespanInput.value.trim());
    const savings = Number(savingsInput.value.trim());
    const monthly = Number(monthlyInput.value.trim());
    const rate = Number(rateInput.value.trim());
    const inflation = Number(inflationInput.value.trim());
    const needed = Number(neededInput.value.trim());

    // Validate each field
    if (ageInput.value.trim() === '' || isNaN(age) || age < 18 || age > 100) {
      showError(ageInput, '請輸入 18-100 之間的年齡');
      valid = false;
    }

    if (targetInput.value.trim() === '' || isNaN(target) || target < age || target > 100) {
      showError(targetInput, '退休年齡必須大於目前年齡且不超過 100');
      valid = false;
    }

    if (lifespanInput.value.trim() === '' || isNaN(lifespan) || lifespan <= target || lifespan > 120) {
      showError(lifespanInput, '預期壽命必須大於退休年齡且不超過 120');
      valid = false;
    }

    if (savingsInput.value.trim() === '' || isNaN(savings) || savings < 0) {
      showError(savingsInput, '請輸入有效的退休金金額');
      valid = false;
    }

    if (monthlyInput.value.trim() === '' || isNaN(monthly) || monthly < 0) {
      showError(monthlyInput, '請輸入有效的每月儲蓄金額');
      valid = false;
    }

    if (rateInput.value.trim() === '' || isNaN(rate) || rate < 0 || rate > 30) {
      showError(rateInput, '請輸入 0-30 之間的報酬率');
      valid = false;
    }

    if (inflationInput.value.trim() === '' || isNaN(inflation) || inflation < 0 || inflation > 20) {
      showError(inflationInput, '請輸入 0-20 之間的通膨率');
      valid = false;
    }

    if (neededInput.value.trim() === '' || isNaN(needed) || needed <= 0) {
      showError(neededInput, '請輸入大於 0 的生活費需求');
      valid = false;
    }

    return valid;
  }

  function clearInputErrors() {
    [ageInput, targetInput, lifespanInput, savingsInput, monthlyInput, rateInput, inflationInput, neededInput].forEach(function (input) {
      input.addEventListener('input', function () {
        const group = input.closest('.form-group');
        group.classList.remove('has-error');
      });
    });
  }
  clearInputErrors();

  function renderResult(result, currentAge, targetAge, lifespan, currentSavings, monthlySaving, annualRate) {
    document.getElementById('retirement-total').textContent = formatMoney(result.totalAtRetirement);
    document.getElementById('retirement-monthly-income').textContent = formatMoney(result.monthlyIncome);
    document.getElementById('retirement-needed-adjusted').textContent = formatMoney(result.adjustedNeeded);

    const statusEl = document.getElementById('retirement-status');
    const statusContainer = document.getElementById('retirement-status-container');
    const statusLabel = document.getElementById('retirement-status-label');

    statusContainer.style.display = 'block';
    if (result.isSufficient) {
      statusEl.textContent = '每月餘裕 ' + formatMoney(result.gap * -1);
      statusEl.style.color = '#10b981';
      statusLabel.textContent = '✅ 退休金充足 — 每月多出';
    } else {
      statusEl.textContent = '每月不足 ' + formatMoney(result.gap);
      statusEl.style.color = '#ef4444';
      statusLabel.textContent = '⚠️ 退休金不足 — 每月差額';
    }

    resultDiv.style.display = 'block';

    if (chartInstance) {
      chartInstance.destroy();
    }

    const projectionData = generateAssetProjection(currentAge, targetAge, lifespan, currentSavings, monthlySaving, annualRate);

    // Highlight retirement age point
    const colors = projectionData.map(function (d) {
      return d.age <= targetAge ? '#2563eb' : '#f59e0b';
    });

    const ctx = document.getElementById('retirement-chart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: projectionData.map(function (d) { return d.age + '歲'; }),
        datasets: [{
          label: '累積資產',
          data: projectionData.map(function (d) { return d.assets; }),
          backgroundColor: colors,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            titleColor: '#e5e7eb',
            bodyColor: '#e5e7eb',
            borderColor: '#333',
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                return '資產總額: ' + formatMoney(context.parsed.y);
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
                size: 10,
              },
              maxTicksLimit: 20,
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

    const currentAge = Number(ageInput.value.trim());
    const targetAge = Number(targetInput.value.trim());
    const lifespan = Number(lifespanInput.value.trim());
    const currentSavings = Number(savingsInput.value.trim());
    const monthlySaving = Number(monthlyInput.value.trim());
    const annualRate = Number(rateInput.value.trim());
    const inflation = Number(inflationInput.value.trim());
    const monthlyNeeded = Number(neededInput.value.trim());

    const result = calculateRetirement(currentAge, targetAge, lifespan, currentSavings, monthlySaving, annualRate, inflation, monthlyNeeded);
    renderResult(result, currentAge, targetAge, lifespan, currentSavings, monthlySaving, annualRate);
  });

  resetBtn.addEventListener('click', function () {
    ageInput.value = '';
    targetInput.value = '';
    lifespanInput.value = '';
    savingsInput.value = '';
    monthlyInput.value = '';
    rateInput.value = '';
    inflationInput.value = '';
    neededInput.value = '';
    clearErrors();
    resultDiv.style.display = 'none';
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });

  document.querySelectorAll('#retirement-age, #retirement-target, #retirement-lifespan, #retirement-savings, #retirement-monthly, #retirement-rate, #retirement-inflation, #retirement-needed').forEach(function (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calcBtn.click();
      }
    });
  });
});
