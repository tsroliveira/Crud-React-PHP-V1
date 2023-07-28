<?php 
include('cors.php');
include('conexion.php');
 $array=array();
 $modelo = new Conexion();
 $db = $modelo->getConexion();
 $sql = 'SELECT id, nome, username, saldo FROM colaboradores ORDER BY nome';
 $query = $db->prepare($sql);
 $query->execute();
   
  while($fila = $query->fetch()) {
    $array[] = array(
      "id" => $fila['id'],
      "nome" => $fila['nome'],
      "username" => $fila['username'],
      "saldo" => $fila['saldo'] 
    ); 
  } 

  $json = json_encode($array);

  echo $json;
?>