//sacado de http://luthfihariz.wordpress.com/2011/10/23/android-sqlite-phonegap-jquerymobile/
var DataBase;

//listener pageinit home
$(document).on('pageinit', '#home', function(event) {
  createDataBase();
});

//function will be called when device ready
function createDataBase(){
  console.log("Creating openDatabase...");
  //will create database or open it if doesnt exists
  DataBase = window.openDatabase("bcool", "1.0", "My database", 3072 * 1024); //3MB
  DataBase.transaction(createTable, errorCallBack, successCallBack);
}

//create table and insert some record
function createTable(tx) {
  //create table
  console.log('Dropping Table...');
  tx.executeSql('DROP TABLE IF EXISTS clothes');
  console.log('Creating Table...');
  tx.executeSql('CREATE TABLE IF NOT EXISTS clothes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, style TEXT NOT NULL, color TEXT NOT NULL, weather TEXT NOT NULL)');
  //inserts
  console.log('Inserting data...');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather) VALUES ("sweter", "completo", "rojo", "frio")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather) VALUES ("jersey normal", "cuadros", "verde", "templado")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather) VALUES ("camisa de manga larga", "rayas", "azul", "frio")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather) VALUES ("jersey de cuello alto", "completo", "azul", "frio")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather) VALUES ("camisa de manga corta", "completo", "blanco", "calor")');
}

//function will be called when an error occurred
function errorCallBack(err) {
  console.log("Oh noes! There haz bin a datamabase error! OMAIGAD!1!! (err number: "+err.code+")");
}

//function will be called when process succeed
function successCallBack() {
  console.log("Success! Ewrizing rulezz!");
}

//listener pageinit clothes
$(document).on('pageinit', '#clothes', function(event) {
  DataBase.transaction(queryDataBase,errorCallBack);
});

//select all from table
function queryDataBase(tx){
  console.log('Querying data...');
  tx.executeSql('SELECT * FROM clothes',[],render,errorCallBack);
}

//populate listview
function render(tx,result){
  console.log('Populating list...');
  $('#clothesList').empty();
  for (var i=0; i < result.rows.length; i++) {
    $('#clothesList').append('<li><a href="#"><h2>Ropa</h2><p>Esto es una prueba de ropa</p></a></li>');
  }
  $('#clothesList').listview();
}
