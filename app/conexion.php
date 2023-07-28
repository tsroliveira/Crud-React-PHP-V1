
<?php

class Conexion {
	
  public function getConexion(){
    $host = "localhost"; //127.0.0.1 0 localhost
    $db = "colaborador"; //base de datos de mysql
    $usuario = "root";   // usuario de mysql
    $clave = "root";     //contraseña de mysql

    $db = new PDO("mysql:host=$host;dbname=$db;", $usuario, $clave);

    return $db;
  }
}

?>