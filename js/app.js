//añadir fecha/hora de cada creación de tarea al inicio de la nota
//añadir botón que elimine todas las notas con confirmación (poner icono)
//si se introduce un espacio tampoco se da por válido


//identificación de elementos

const texto = document.querySelector("#contenedor-texto");
const btnAnadir = document.querySelector("#btn-enviar");
const cuadroNotas = document.querySelector("#contenedor-notas");
const cerrarNota = document.querySelector(".cerrar-nota");
const noTarea = document.querySelector("#no-tarea");
const contenedorMensaje = document.querySelector("#contenedor-mensaje");
const textoTarea = document.querySelector("#texto-no-tarea");

let contadorNotas = 0;

// crear nota
let crearNota = () => {

    
    let nota = document.createElement("div");
    nota.setAttribute("class", "nota-anadida");
    nota.innerText= texto.value ;
    cuadroNotas.append ( nota );


//añadir botón cerrar

    const cerrar = document.createElement("p");
    cerrar.setAttribute("class", "cerrar-nota");
    cerrar.innerText= " X ";
    nota.append ( cerrar );
// eliminar nota
    cerrar.addEventListener("click", ()=>{
        nota.style.display ="none";
        contadorNotas -- ;
        if (contadorNotas == 0){
            textoTarea.style.display="block";
        }
         }
     )
   
    //eliminar texto de input

    texto.value = "";
    texto.focus();

};

// pulsar botón añadir

btnAnadir.addEventListener("click", ()=>{

    //añadir texto a cuadroNotas

    if (texto.value != "" && texto.value != " "){
        contenedorMensaje.innerText= "";
        crearNota();
        texto.setAttribute("placeholder", "Introduce tu tarea");
        texto.classList.remove("color-alarma");
        contadorNotas++;
        // quitar texto  "Todavía no tienes ninguna tarea"
        if (contadorNotas > 0){
            //cuadroNotas.removeChild( noTarea );
            textoTarea.style.display="none";
        }
        
}
else{
    texto.value = "";
    texto.focus();
    texto.setAttribute("placeholder", "Introduce una tarea!");
    texto.classList.add("color-alarma");
    //contenedorMensaje.innerText ="! No has introducido texto";
}
});




