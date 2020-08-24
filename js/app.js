// QUERY SELECTOR ES LA NUEVA FORMA DE SELECIONAR ELEMENTOS POCO A POCO SE HA SUSTITUIDO POR GET ELEMENTS BY
const formularioContactos = document.querySelector('#contacto');

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
        console.log(...infoContacto)

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
        // RESPONSE TEXT RETORNA TEZTO EN FORMATO STRING
        // JSON.PARSE CONVERTIRA ESE STRING EN JSON EN EL QUE PODEMOS MANIPULAR Y USAR LOS VALORES INDIVIDUALMENTE
            console.log(xhr.responseText);
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