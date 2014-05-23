var db;

//bindeamos un evento al home de la web, que se lanzare on pageinit
$(document).on('pageinit', '#home', function(event) {
  //creamos una base de datos nueva o la abrimos
  //http://docs.phonegap.com/es/3.4.0/cordova_storage_storage.md.html#Almacenamiento
  //var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_sizeKB);
  db = window.openDatabase("database","0.1","database", 1000000);
  db.transaction(createDb, txError, txSuccess);
});

function createDb(tx) {
  tx.executeSql("DROP TABLE IF EXISTS clothes");
  tx.executeSql("CREATE TABLE IF NOT EXISTS clothes (id INTEGER PRIMARY KEY ASC,name TEXT)");
}

function txError(error) {
  console.log(error);
  console.log("Database error: " + error);
}

function txSuccess() {
  console.log("Success");
}