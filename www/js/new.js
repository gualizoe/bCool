$(document).on('pageinit', '#new', function(event) {
  console.log('Page loaded successfully!');
  colorPicker();
});

function colorPicker(){
  var colors = ['red', 'blue', 'green', 'lightgreen', 'yellow', 'black', 'white', 'brown', 'cyan', 'pink', 'magenta'];
  $('#color').attr('max', colors.length - 1);
  $('input#color').change(function(event){
    $('#color').css('background-color', colors[$('a.ui-slider-handle').attr('title')]);
    $('#color').css('color', 'white');
  });
}

function capturePhoto() {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoSuccess, function(message) {
    console.log('Image Capture failed');
  }, {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL,
    allowEdit: true,
    encodingType: Camera.EncodingType.JPG,
    targetWidth: 200,
    targetHeight: 200,
    saveToPhotoAlbum: false
  });
}

function onPhotoSuccess(imageURI) {
  //load image
  var image = document.getElementById('picture');
  image.src = "data:image/png;base64," + imageURI;
  //save image
  var gotFileEntry = function(fileEntry) {
    console.log("Default Image Directory " + fileEntry.fullPath);
    var gotFileSystem = function(fileSystem) {
      fileSystem.root.getDirectory("Clothes", {create : true}, function(dataDir) {
        var d = new Date();
        var n = d.getTime();
        //new file name
        var newFileName = n + ".jpg";
        // copy the file
        fileEntry.moveTo(dataDir, newFileName, null, fsFail);
      },
      dirFail
    );
  };
  // get file system to copy or move image file to
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, onFail);
};
// resolve file system for image
window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);
// file system fail
var onFail = function(error) {
  console.log("FileSystem failed " + error.code);
};
// directory fail
var dirFail = function(error) {
  console.log("Directory failed " + error.code);
};
