<?php
include('cors.php');
include('conexion.php');
$data = json_decode(file_get_contents("php://input"), true);

 $nome = $data['nome'];
 $username = $data['username'];
 $saldo = $data['saldo'];
 $modelo = new Conexion();
 $db = $modelo->getConexion();
 
 $sql = "INSERT INTO colaboradores(nome, username, saldo) 
         VALUES(:nome, :username,:saldo)";

      $query = $db->prepare($sql);
      $query->bindParam(':nome', $nome);
      $query->bindParam(':username', $username);
      $query->bindParam(':saldo', $saldo);

   $query->execute();

echo "registrado";

 
 
?>