//listener pageinit home
$(document).on('pageinit', '#index', function(event) {
  console.log('Page loaded successfully!');
});

// Cambiar animaciones por defecto http://www.w3schools.com/jquerymobile/jquerymobile_transitions.asp
$.mobile.defaultPageTransition = 'flip'; // pages / popup transition
$.mobile.defaultDialogTransition = 'flip'; // dialogs
