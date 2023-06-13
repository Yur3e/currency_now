chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var url = 'https://api.exchangerate-api.com/v4/latest/' + request.currency + '?access_key=YOURKEY';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var rate = data.rates[request.convertTo];
      var convertedValue = parseFloat(request.value) * rate;
      
      // Obtenha o símbolo da moeda de destino com base na configuração regional do usuário
      var toCurrencySymbol = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: request.convertTo }).formatToParts(1)[0].value;
      
      var result = 'Você selecionou ' + request.currency + ' para ' + request.convertTo + ' no valor de ' + new Intl.NumberFormat(navigator.language, { style: 'currency', currency: request.currency }).format(request.value) + ' = ' + toCurrencySymbol + ' ' + convertedValue.toFixed(2);
      sendResponse({result: result});
    });

  return true; // Para permitir o envio assíncrono da resposta
});
