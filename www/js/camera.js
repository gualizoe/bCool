var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  //solo necesitamos que la imagen sea cuadrada, luego los thumbnails del listview lo reducen a 80x80
  takePicture: function() {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit: true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: false
    });

    //success
    function onSuccess(imageData) {
      var image = document.getElementById('picture');
      image.src = "data:image/png;base64," + imageData;
    }

    //fail
    function onFail(message) {
      alert('Failed because: ' + message);
    }
  }
};