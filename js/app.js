// QUERY SELECTOR ES LA NUEVA FORMA DE SELECIONAR ELEMENTOS POCO A POCO SE HA SUSTITUIDO POR GET ELEMENTS BY
const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody');

//JUAN PABLO DECLARA UNA FUNCION PARA NO TENER LOS EVENTLISTENERS AFUERA
eventListeners();
function eventListeners(){
    // CUANDO EL FORMULARIO DE CREAR O EDITAR SE EJECUTA
    formularioContactos.addEventListener('submit', leerFormulario)
}

function leerFormulario(event){
    event.preventDefault();
    
    // Leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;

    if(nombre === '' || empresa === '' || telefono === ''){
        // DOS PARAMETROS TEXTO Y CLASE
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        // Pasa la validadcion, crear llamado a AJAX
        // FORMDATA es la mejor forma de leer un dato para un formulario, incluso archivos y luego pasarlo a AJAX
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        // EL SPREAD OPERATOR PERMITE CREAR UNA COPIA DEL OBJETO
        // console.log(...infoContacto)

        if(accion === 'crear'){
            // Crearemos un nuevo contacto
            insertarDB(infoContacto);
        } else {
            // Editaremos el contacto
        }
    }
}
// INSERTA EN LA BASE DE DATOS VIA AJAX
function insertarDB(datos){
    // llamada a AJAX/ ASI SE LLAMA ESTA SECCION, COMIENZA A PARTIR DE ABAJO

    // CREAR EL OBJETO
    const xhr = new XMLHttpRequest();

    // ABRIR LA CONEXION
    // OPEN TOMA 3 PARAMETROS
    // POST ES CUANDO NORMALMENTE SE INSERTA A LA BASE DE DATOS Y GET CUANDO SE QUIERE OBTENER ALGO QUE ESTA EN EL SERVIDOR
    // 
    xhr.open('POST', 'inc/modelos/modelo-contacto.php', true);

    // PASAR LOS DATOS
    xhr.onload = function() {
        if(this.status === 200){
        // RESPONSETEXT RETORNA TEXTO EN FORMATO STRING
        // JSON.PARSE CONVERTIRA ESE STRING EN JSON EN EL QUE PODEMOS MANIPULAR Y USAR LOS VALORES INDIVIDUALMENTE
            console.log(JSON.parse(xhr.responseText));
        // LEEMOS LA RESPUESTA DE PHP
        const respuesta = JSON.parse(xhr.responseText);
        // INSERTANDO UNA NUEVA RESPUESTA A LA TABLLA
        const nuevoContacto = document.createElement('tr');
        nuevoContacto.innerHTML = `
            <td>${respuesta.datos.nombre}</td>
            <td>${respuesta.datos.empresa}</td>
            <td>${respuesta.datos.telefono}</td>
        `;

        // CREANDO EL CONTENEDOR PARA LOS BOTONES
        const contenedorAcciones = document.createElement('td');
        // CREAR EL ICONO DE EDITAR
        const iconoEditar = document.createElement('i');
        iconoEditar.classList.add('fas', 'fa-edit')
        // CREANDO EL ENLACE PARA EDITAR
        const btnEditar = document.createElement('a');
        // el appendchild incluira como hijo al i (icono)
        btnEditar.appendChild(iconoEditar);
        btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
        btnEditar.classList.add('btn', 'btn-editar');

        // AGREGAMOS EL BOTON DE EDITAR AL PADRE
        contenedorAcciones.appendChild(btnEditar);


        // CREANDO EL ICONO DE ELIMINAR
        const iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-user-minus');

        // CREAR EL BOTON DE ELIMINAR
        const btnEliminar = document.createElement('buttom');
        btnEliminar.appendChild(iconoEliminar);
        btnEliminar.setAttribute('data_id', respuesta.datos.id_insertado);
        btnEliminar.classList.add('btn', 'btn-borrar');
        // agregando el boton de eliminar al padre
        contenedorAcciones.appendChild(btnEliminar);
        // agregandolo al tr
        nuevoContacto.appendChild(contenedorAcciones);
        // agregarlo con los contactos
        listadoContactos.appendChild(nuevoContacto);



        // RESETEANDO EL FORM
        document.querySelector('form').reset();

        // MOSTRANDO LA NOTIFICACION
        mostrarNotificacion('Contacto creado correctamente', 'correcto')
        }
    }
    // ENVIAR LOS DATOS
    xhr.send(datos)
}

// NOTIFICACION EN PANTALLA
function mostrarNotificacion(mensaje, clase){
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase,'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    // FORMULARIO
    // INSERT BEFORE TOMA DOS PARAMETROS: LO QUE VAS A INSERTAR Y DONDE SE VA A INSERTAR
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    // OCULTAR Y MOSTRAR LA NOTIFICACION
    setTimeout(() => {
        // CLASS LIST ES EL EQUIVALENTE AL ADDCLASS DE JQUERY
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible')
            setTimeout(() =>{
                notificacion.remove();
            }, 500)
        }, 3000);
    }, 100);
}