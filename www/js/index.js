// Cambiar animaciones por defecto http://www.w3schools.com/jquerymobile/jquerymobile_transitions.asp
$.mobile.defaultPageTransition = 'flow'; // pages / popup transition
$.mobile.defaultDialogTransition = 'flow'; // dialogs

$('#formNew').submit(function() {
  var params = $('#formNew').serializeArray();
  console.log(params);
});
