
// Variables 
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// agregamos los articulos al carrito
let articulosCarrito = [];

// cargar eventos
cargarEventListeners() // Se llama la funcion
function cargarEventListeners () {
    // cuando agregas un curso presionando 'agregar al carrito'
    listaCursos.addEventListener ('click', agregarCurso); // creamos una funcion dentro del evento

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos en arreglo

        lipiarHTML (); // eliminamos todo el html
    })
}

// definimos las funciones
function agregarCurso (e) {
    e.preventDefault()
    
    if(e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso (cursoSeleccionado);
    } 
    
}

// Elimina un curso del carrito
function eliminarCurso (e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );
        
        carritoHtml ();
    }
} 

// lee el contenido del html al que le dimos click y extrae la imformacion del curso
function leerDatosCurso (curso) {
    //console.log (curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1  
    }

    // revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
      // actualizamos la cantidad 
       const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son duplicados
            }
       });
       articulosCarrito = [...cursos];
    } else {
        // agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    console.log (articulosCarrito);

    carritoHtml();
}

// muestra el carrito de compras en el HTML
function carritoHtml () {

    // Limpiar el HTML
    lipiarHTML();


    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src = ${imagen} width='100'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='borrar-curso' data-id= ${id}>X</a></td>
        `;

        // Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });  
}

// Elimina los cursos del tbody
function lipiarHTML () {
    // forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}







