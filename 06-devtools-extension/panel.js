chrome.devtools.network.onNavigated.addListener(updateInfoForUrl);
fetchCurrentLocation(updateInfoForUrl);

function fetchCurrentLocation(callback) {
  chrome.devtools.inspectedWindow.eval(
    'window.location.href',
    function(result, isException) {
      if (isException) {
        log('Cannot determine current window.location: ' + result);
        return;
      }
      callback(result);
    }
  );
}

function updateInfoForUrl(url) {
  setLocation(url);
  chrome.devtools.inspectedWindow.eval(
    "jQuery.fn.jquery",
     function(result, isException) {
       if (isException)
         setInfo("The page is not using jQuery");
       else
         setInfo("The page is using jQuery v" + result);
     }
  );
}

function setInfo(text) {
  document.querySelector('#info').textContent = text;
}

function setLocation(text) {
  document.querySelector('#loc').textContent = text;
}

function log(text) {
  document.querySelector('#log').textContent += text + '\n';
}

