var ioRequest = function (requestObj) {
  var method      = requestObj && requestObj.method || "GET",
      url         = requestObj && requestObj.url || "",
      body        = requestObj && requestObj.body || null,
      callback    = requestObj.callback,
      httpRequest = new XMLHttpRequest();

  if(!url) {
      return "No URL provided.";
  }
  httpRequest.onreadystatechange = httpResponse;
  httpRequest.open(method, url);

  function httpResponse(response) {
      try {
          if(httpRequest.readyState === XMLHttpRequest.OPENED) {
              httpRequest.setRequestHeader("Accept", "*/*");
              httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              console.log("mybody; " + body);
              httpRequest.send(JSON.stringify(body));
          }
          if(httpRequest.readyState === XMLHttpRequest.DONE) {
              if(httpRequest.status === 200) {
                  onSuccess();
              } else {
                  onError();
              }
          }
      } catch (e) {
          console.error(e)
      }
  }

  function onSuccess() {
      callback(JSON.parse(httpRequest.response));
  }

  function onError() {
      callback(JSON.parse(httpRequest.response))
  }
};

var ioWSocket = function(requestObj) {
    var url = requestObj.url,
        port = requestObj.port;
    
    var socketUrl = port ? url + ":" + port : url;
    var socket = new WebSocket(socketUrl);
    
    socket.onopen = onSocketOpened;
    
    function onSocketOpened(ev) {
        console.log("WebSocket is open.");
        console.log(ev);
        socket.send();
    }
    
    function onMessageReceived(ev) {
        console.log("messageReceived.");
        console.log(ev);
    }
};