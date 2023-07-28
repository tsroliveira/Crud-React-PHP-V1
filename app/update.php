<?php

include('cors.php');
include('conexion.php');

$data = json_decode(file_get_contents("php://input"), true);
 $id = $data['id']; 
 $nome = $data['nome'];
 $username = $data['username'];
 $saldo = $data['saldo'];
 $modelo = new Conexion();
 $db = $modelo->getConexion();

$sql = "UPDATE colaboradores SET nome='$nome', username='$username'
         ,saldo='$saldo' WHERE id=$id";


      $query = $db->prepare($sql);
      $query->execute();
      echo "atualizado";

  ?>

