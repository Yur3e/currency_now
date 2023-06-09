document.addEventListener('DOMContentLoaded', function() {
    var convertButton = document.getElementById('convertButton');
    var currencyInput = document.getElementById('currency');
    var valueInput = document.getElementById('value');
    var convertToInput = document.getElementById('convertTo');
    var resultDiv = document.getElementById('result');
  
    convertButton.addEventListener('click', function() {
      var currency = currencyInput.value;
      var value = valueInput.value;
      var convertTo = convertToInput.value;
  
      chrome.runtime.sendMessage({currency: currency, value: value, convertTo: convertTo}, function(response) {
        resultDiv.textContent = response.result;
      });
    });
  });
  