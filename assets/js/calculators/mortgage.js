'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const priceInput = document.getElementById('mortgage-price');
  const downInput = document.getElementById('mortgage-down');
  const rateInput = document.getElementById('mortgage-rate');
  const yearsInput = document.getElementById('mortgage-years');
  const calcBtn = document.getElementById('mortgage-calculate');
  const resetBtn = document.getElementById('mortgage-reset');
  const resultDiv = document.getElementById('mortgage-result');

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

  function calculateMortgage(principal, annualRate, years) {
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

  function generateAmortizationSchedule(principal, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    const schedule = [];

    if (annualRate === 0) {
      const monthly = principal / months;
      for (let i = 1; i <= months; i++) {
        schedule.push({
          period: i,
          payment: monthly,
          principal: monthly,
          interest: 0,
          balance: principal - monthly * i,
        });
      }
      return schedule;
    }

    const factor = Math.pow(1 + monthlyRate, months);
    const monthlyPayment = principal * monthlyRate * factor / (factor - 1);
    let balance = principal;

    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      let principalPaid = monthlyPayment - interest;
      if (i === months) {
        principalPaid = balance;
      }
      balance -= principalPaid;
      if (balance < 0) balance = 0;

      schedule.push({
        period: i,
        payment: principalPaid + (i === months ? balance + interest : interest),
        principal: principalPaid,
        interest: interest,
        balance: balance,
      });
    }

    return schedule;
  }

  function clearErrors() {
    document.querySelectorAll('.form-group.has-error').forEach(function (el) {
      el.classList.remove('has-error');
    });
  }

  function validateInputs() {
    clearErrors();
    let valid = true;

    const price = priceInput.value.trim();
    const down = downInput.value.trim();
    const rate = rateInput.value.trim();
    const years = yearsInput.value.trim();

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      showError(priceInput, '請輸入有效的大於 0 的房屋總價');
      valid = false;
    }

    if (down === '' || isNaN(Number(down)) || Number(down) < 0) {
      showError(downInput, '請輸入有效的自備款金額');
      valid = false;
    }

    if (down !== '' && price !== '' && Number(down) >= Number(price)) {
      showError(downInput, '自備款不能大於等於房屋總價');
      valid = false;
    }

    if (!rate || isNaN(Number(rate)) || Number(rate) < 0 || Number(rate) > 100) {
      showError(rateInput, '請輸入 0-100 之間的利率');
      valid = false;
    }

    if (!years || isNaN(Number(years)) || Number(years) < 1 || Number(years) > 50) {
      showError(yearsInput, '請輸入 1-50 之間的年限');
      valid = false;
    }

    return valid;
  }

  function showError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('has-error');
    group.querySelector('.error-message').textContent = message;
  }

  function clearInputErrors() {
    [priceInput, downInput, rateInput, yearsInput].forEach(function (input) {
      input.addEventListener('input', function () {
        const group = input.closest('.form-group');
        group.classList.remove('has-error');
      });
    });
  }
  clearInputErrors();

  function renderTable(schedule) {
    const tbody = document.getElementById('mortgage-table-body');
    const rows = schedule.slice(0, 12);
    tbody.innerHTML = '';
    rows.forEach(function (row) {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + row.period + '</td>' +
        '<td>' + formatMoney(row.payment) + '</td>' +
        '<td>' + formatMoney(row.principal) + '</td>' +
        '<td>' + formatMoney(row.interest) + '</td>' +
        '<td>' + formatMoney(row.balance) + '</td>';
      tbody.appendChild(tr);
    });
  }

  function renderResult(result, principal, price, down, annualRate, years, schedule) {
    document.getElementById('mortgage-loan-amount').textContent = formatMoney(principal);
    document.getElementById('mortgage-monthly').textContent = formatMoney(result.monthlyPayment);
    document.getElementById('mortgage-total-payment').textContent = formatMoney(result.totalPayment);
    document.getElementById('mortgage-total-interest').textContent = formatMoney(result.totalInterest);
    document.getElementById('mortgage-down-ratio').textContent = formatNum(down / price * 100, 1) + '%';
    document.getElementById('mortgage-display-rate').textContent = annualRate + '% / ' + years + ' 年';

    resultDiv.style.display = 'block';

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById('mortgage-chart').getContext('2d');
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
              font: {
                size: 14,
              },
              padding: 16,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ': ' + formatMoney(context.parsed);
              },
            },
          },
        },
      },
    });

    renderTable(schedule);
  }

  calcBtn.addEventListener('click', function () {
    if (!validateInputs()) return;

    const price = Number(priceInput.value.trim());
    const down = Number(downInput.value.trim());
    const annualRate = Number(rateInput.value.trim());
    const years = Number(yearsInput.value.trim());
    const principal = price - down;

    if (principal === 0) {
      renderResult({
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
      }, 0, price, down, annualRate, years, []);
      return;
    }

    const result = calculateMortgage(principal, annualRate, years);
    const schedule = generateAmortizationSchedule(principal, annualRate, years);
    renderResult(result, principal, price, down, annualRate, years, schedule);
  });

  resetBtn.addEventListener('click', function () {
    priceInput.value = '';
    downInput.value = '';
    rateInput.value = '';
    yearsInput.value = '';
    clearErrors();
    resultDiv.style.display = 'none';
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });

  document.querySelectorAll('#mortgage-price, #mortgage-down, #mortgage-rate, #mortgage-years').forEach(function (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calcBtn.click();
      }
    });
  });
});
