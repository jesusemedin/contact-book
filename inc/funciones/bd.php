<?php
// CREDENCIALES DE LA BASE DE DATOS
define('DB_USUARIO', 'root');
define('DB_PASSWORD', '751602');
define('DB_HOST', 'localhost');
define('DB_NOMBRE', 'agendaphp');

$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE);
// ping() SIRVE PARA COMPROBAR QUE SE ESTA HACIENDO UNA CONEXICION A LA BASE DE DATOS
// SI ENVIA 1 SE ESTA HACIENDO LA CONEXCION
// echo $conn -> ping();
?>