

//identificación de elementos

const texto = document.querySelector("#contenedor-texto");
const btnAnadir = document.querySelector("#btn-enviar");
const cuadroNotas = document.querySelector("#contenedor-notas");
const cerrarNota = document.querySelector(".cerrar-nota");
const noTarea = document.querySelector("#no-tarea");

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
         }
     )
   
    //eliminar texto de input

    texto.value = "";
    texto.focus();
};

// pulsar botón añadir

btnAnadir.addEventListener("click", ()=>{

    //añadir texto a cuadroNotas
    crearNota();
    // quitar texto  "Todavía no tienes ninguna tarea"
    if (cuadroNotas.childElementCount == 2){
        cuadroNotas.removeChild( noTarea );
    }
});

// pulsar botón X para cerrar nota


