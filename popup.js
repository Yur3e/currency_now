document.addEventListener('DOMContentLoaded', function() {
  var convertButton = document.getElementById('convertButton');
  var currencyInput = document.getElementById('currency');
  var valueInput = document.getElementById('value');
  var convertToInput = document.getElementById('convertTo');
  var resultDiv = document.getElementById('result');

  convertButton.addEventListener('click', function() {
    var currency = currencyInput.value.toUpperCase().trim();
    var value = valueInput.value.trim();
    var convertTo = convertToInput.value.toUpperCase().trim();

    if (!currency || !value || !convertTo) {
      resultDiv.textContent = "Por favor, preencha todos os campos.";
      return;
    }

    if (isNaN(value)) {
      resultDiv.textContent = "Por favor, insira um valor numérico válido.";
      return;
    }

    chrome.runtime.sendMessage(
      {currency: currency, value: value, convertTo: convertTo}, 
      function(response) {
        if (response.error) {
          resultDiv.textContent = "Erro: " + response.error;
        } else if (response.success) {
          resultDiv.textContent = `${value} ${currency} = ${response.result} ${response.currency} (Taxa: ${response.rate})`;
        } else {
          resultDiv.textContent = "Resposta inesperada da API";
        }
      }
    );
  });
});