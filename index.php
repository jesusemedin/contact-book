<?php include 'inc/layout/header.php'; ?>
<div class="contenedor-barra">
    <h1>Agenda de contacto</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form id="contacto" action="#">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>

    <?php include 'inc/layout/formulario.php'?>
    </form>
</div>

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contacto...">
    
        <p class="total-contactos"><span>3</span> Contactos</p>

        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jesus Medina</td>
                        <td>American Airlines</td>
                        <td>04121934690</td>
                        <td>
                            <a class="btn-editar btn" href="editar.php?id=1"><i class="fas fa-edit"></i></a>
                            <button class="btn-borrar btn" data-id="1" type="button"><i class="fas fa-user-minus"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jesus Medina</td>
                        <td>American Airlines</td>
                        <td>04121934690</td>
                        <td>
                            <a class="btn-editar btn" href="editar.php?id=1"><i class="fas fa-edit"></i></a>
                            <button class="btn-borrar btn" data-id="1" type="button"><i class="fas fa-user-minus"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jesus Medina</td>
                        <td>American Airlines</td>
                        <td>04121934690</td>
                        <td>
                            <a class="btn-editar btn" href="editar.php?id=1"><i class="fas fa-edit"></i></a>
                            <button class="btn-borrar btn" data-id="1" type="button"><i class="fas fa-user-minus"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php include 'inc/layout/footer.php'; ?>