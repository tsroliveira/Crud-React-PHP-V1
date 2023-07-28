<?php
include('cors.php');
include('conexion.php');
$array=array();
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$modelo = new Conexion();
 $db = $modelo->getConexion();

 $sql = "SELECT id, nome, username, saldo FROM colaboradores WHERE id='$id'";
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

