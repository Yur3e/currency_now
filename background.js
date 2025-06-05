chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!request.currency || !request.convertTo || !request.value) {
    sendResponse({error: "Dados incompletos"});
    return;
  }

  // URL corrigida - usando a moeda de origem corretamente
  var url = `https://v6.exchangerate-api.com/v6/d0611b60031f57d5f70186ae/latest/${request.currency}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (!data.conversion_rates || !data.conversion_rates[request.convertTo]) {
      throw new Error("Moeda não encontrada");
    }

    const rate = data.conversion_rates[request.convertTo];
    const convertedValue = parseFloat(request.value) * rate;
    
    sendResponse({
      success: true,
      result: convertedValue.toFixed(2),
      rate: rate,
      currency: request.convertTo
    });
  })
  .catch(error => {
    console.error("Erro na conversão:", error);
    sendResponse({error: "Falha na conversão: " + error.message});
  });

  return true;
});