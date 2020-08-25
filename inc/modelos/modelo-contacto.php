<?php

if($_POST['accion'] == 'crear'){
    // SE CREARA UN NUEVO REGISTRO EN LA BASE DE DATOS

    require_once('../funciones/bd.php');

    // VALIDAR LAS ENTRADAS O INYECCION SQL
    // FILTER VAR TOMA DOS PARAMETROS PRIMERO QUE QUIERES VALIDAR Y EL TIPO DE SANITIZACION
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING); 


    // TRY CATCH SIRVE PARA QUE CUANDO SE INTENTE REALIZAR UNA INSERCION A LA BASE DE DATOS Y POR ALGO FALLE EL PROGRAMA SIGA FUNCIONANDO EJ. EL SERVIDOR SE CAE
    try {
        // USANDO PREPARE STATEMENTS, LOS CUALES SON UTILES EN CONTRA LA INYECCION SQL
        // CUANDO SE USAN LOS PREPARE ESTATEMES SE USA ALGO EN LOS VALUES LLAMADO LOS PLACEHOLDERS
        $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)");
        // EN BIND PARAM SE COLOCAN LOS DATOS QUE SE VAN A INSERTAR EN LOS DIFERENTES CAMPOS DE LA BASE DE DATOS
        // AL SER STRING SE COLOCA UNA S, SI FUERAN ENTEROS SE COLOCAN I
        // Y SE LE PASAN LOS VALORES EN EL MISMO ORDEN YA QUE BIND PARAM USA DOS PARAMETROS
        $stmt->bind_param("sss", $nombre, $empresa, $telefono);
        // EJECUTAMOS EL STATEMENT
        $stmt->execute();
        if($stmt->affected_rows == 1){
            $respuesta = array(
                'respuesta' => 'correcto',
                'datos' => array(
                    'nombre' => $nombre,
                    'empresa' => $empresa,
                    'telefono' => $telefono,
                    'id_insertado' => $stmt->insert_id
                )
                // AFFECTED ROWS ES LA FORMA DE SABER SI HUBO CAMBIOS EN LA BASE DE DATOS
            );
        }
        // UNA VEZ QUE SE EJECUTA CERRAMOS EL STATEMENT
        $stmt->close();
        // AYUDAMOS A SQL A CERRAR LA CONEXCION YA QUE NO LA VAMOS A REQUERIR
        $conn->close();
    } catch(Exception $e) {
        // RESPUESTA SERA IGUAL A UN ARREGLO DEBIDO A QUE UN ARREGLO SERA ASOCIATIVO Y LO VAMOS A CONVERTIR A JSON
        $respuesta = array(
        'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}
?>