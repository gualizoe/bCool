//sacado de http://luthfihariz.wordpress.com/2011/10/23/android-sqlite-phonegap-jquerymobile/
var DataBase;

//listener pageinit home
$(document).on('pageinit', '#home', function(event) {
  createDataBase();
});

//function will be called when device ready
function createDataBase(){
  //will create database or open it if doesnt exists
  DataBase = window.openDatabase("bcool", "1.0", "My database", 3072 * 1024); //3MB
  DataBase.transaction(createTable, errorCallBack, successCallBack);
}

//create table and insert some record
function createTable(tx) {
  //create table
  tx.executeSql('DROP TABLE IF EXISTS clothes');
  tx.executeSql('CREATE TABLE IF NOT EXISTS clothes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, style TEXT NOT NULL, color TEXT NOT NULL, weather TEXT NOT NULL, photo TEXT NOT NULL)');
  //inserts
  tx.executeSql('INSERT INTO clothes(name, style, color, weather, photo) VALUES ("Sweater", "completo", "rojo", "frio", "img/photo/sweater.png")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather, photo) VALUES ("Jersey", "cuadros", "verde", "templado", "img/photo/jersey.png")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather, photo) VALUES ("Camisa de manga larga", "rayas", "azul", "frio", "img/photo/camisamangalarga.png")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather, photo) VALUES ("Jersey de cuello alto", "completo", "azul", "frio", "img/photo/jerseycuelloalto.png")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather, photo) VALUES ("Camisa de manga corta", "completo", "blanco", "calor", "img/photo/camisamangacorta.png")');
  tx.executeSql('INSERT INTO clothes(name, style, color, weather, photo) VALUES ("Pantalones vaqueros", "completo", "azul marino", "templado", "img/photo/pantalonesvaqueros.png")');
}

//function will be called when an error occurred
function errorCallBack(err) {
  console.log("Error: "+err.code);
}

//function will be called when process succeed
function successCallBack() {
  console.log("Success");
}

//listener pageinit clothes
$(document).on('pageinit', '#clothes', function(event) {
  DataBase.transaction(queryDataBase,errorCallBack);
});

//select all from table
function queryDataBase(tx){
  tx.executeSql('SELECT * FROM clothes',[],render,errorCallBack);
}

//populate listview
function render(tx,result){
  //$('#clothesList').empty();
  for (var i=0; i < result.rows.length; i++) {
    var row=result.rows.item(i);
    $('#clothesList').append('<li><a href="details.html"><img src="'+row["photo"]+'"><h2>'+row['name']+'</h2><p>Esto es una prueba de ropa</p></a></li>');
  }
  $('#clothesList').listview("refresh");
}
