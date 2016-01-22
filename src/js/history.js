
function pushInHistory(textLocation, urlPath) {
  window.history.pushState({"html": "","pageTitle": ""}, textLocation, urlPath);
}