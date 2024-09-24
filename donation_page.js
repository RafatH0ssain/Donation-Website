tailwind.config = {
    theme: {
      extend: {
        colors: {
          'FundFlow-green': '#B4F461',
          'header-bg': '#F9F7F3',
        }
      }
    }
  }


  document.addEventListener('DOMContentLoaded', function() {

    // Function to be repeatedly used
    function donation_handler(buttonId, amountId, totalId) {
      document.getElementById(buttonId).addEventListener('click', function() {
        const amount_donated = parseInt(document.getElementById(amountId).value);
        const total_element = document.getElementById(totalId);
        const total_amount = parseInt(total_element.textContent.replace(/,/g, ''));
        
        if(amount_donated<=0 || isNaN(amount_donated)) {
          document.getElementById('popup-box').showModal();
          return;
        }
        const new_total = total_amount + amount_donated;
        total_element.textContent = new_total.toLocaleString();
        let account_balance = parseInt(document.getElementById('available-balance').innerText.replace(/,/g, ''));
        if(account_balance - amount_donated < 0) {
          document.getElementById('popup-box-2').showModal();
          return;
        }
        account_balance -= amount_donated;
        document.getElementById('available-balance').innerText = account_balance.toLocaleString();
        document.getElementById('popup-box-3').showModal();
        addHistory(amount_donated, totalId);
        return;
        
      });
    }

    function addHistory(amount, totalId) {
      const historyContainer = document.getElementById('history-cards');
      
      const transactionCard = document.createElement('div');
      transactionCard.className = "card bg-base-100 shadow-xl p-4";
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const name = document.getElementById('cause-name').innerText;
      transactionCard.innerHTML = `
          <h3 class="card-title">Donation of BDT ${amount} to "${name}!"</h3>
          <p>Date: ${hours}:${minutes}:${seconds}, ${month}/${day}/${year} </p>
      `;
      
      historyContainer.appendChild(transactionCard);
      document.getElementById('transaction-history').classList.remove('hidden');
  }
  
    donation_handler('noakhali-button', 'noakhali-amount', 'noakhali-amount-total');
    donation_handler('feni-button', 'feni-amount', 'feni-amount-total');
    donation_handler('quota-button', 'quota-amount', 'quota-amount-total');


    document.getElementById('history-button').addEventListener('click', function() {
      document.getElementById('card-container').classList.add('hidden');
      document.getElementById('history-button').classList.add('bg-FundFlow-green');
      document.getElementById('history-button').classList.remove('border-2');
      document.getElementById('donation-button').classList.remove('bg-FundFlow-green');
      document.getElementById('donation-button').classList.add('border-2', 'border-black');
      document.getElementById('history-container').classList.remove('hidden');
    });
    document.getElementById('donation-button').addEventListener('click', function() {
      document.getElementById('card-container').classList.remove('hidden');
      document.getElementById('history-button').classList.remove('bg-FundFlow-green');
      document.getElementById('history-button').classList.add('border-2');
      document.getElementById('donation-button').classList.add('bg-FundFlow-green');
      document.getElementById('donation-button').classList.remove('border-2', 'border-black');
      document.getElementById('history-container').classList.add('hidden');
    });
  });