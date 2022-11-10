//función anónima autoinvocada ((llamado patrón módulo))
//se utiliza para encapsular el código y que no se pueda acceder a él


(() => {
    "use strict"
})();
    let   deck       = [];
    const tipos      = ["C", "D", "H", "S"],
          especiales = ["A", "J", "Q", "K"];

    let puntosJugadores = [];
    let puntos = 0;
    //Referencias HTML
    
    const btnPedirCarta = document.querySelector ("#btnPedir"),
          btnDetener = document.querySelector ("#btnDetener"),
          btnNuevo = document.querySelector("#btnNuevo");
    const peque = document.querySelectorAll("small"),
          contenedorImagenJugador = document.querySelector("#jugador-cartas"),
          contenedorImagenIA = document.querySelector("#computadora-cartas");



     const inicializarJuego = ( numeroJugadores = 1) => {
            // deck = [];
            // crearDeck();
            for (let i = 0 ; i < numeroJugadores ; i++){
                puntosJugadores.push(0);
             }
    };   
    
    // Añadimos dentro de deck todas las cartas normales
    const crearDeck = () => {
        
        for (let i = 2 ; i <= 10 ; i++ ){       
            for (let tipo of tipos){
                deck.push( i + tipo);
            }
        }
    // Añadimos dentro de deck todas las cartas especiales(as, rey...)
        for (let especial of especiales){       
            for (let tipo of tipos){
                deck.push( especial + tipo);
            }
        }
    // Mezclamos todo el contenido del array
        
        return _.shuffle(deck);
        
    };
  
    //inicializarJuego();
    
    
    // Pedimos carta
    const pedirCarta = () => {
    // Si no hay cartas mostramos la advertencia por consola
        if (deck.length === 0){
            throw "No hay cartas en el deck";
        }
        //Eliminamos carta del principio del array deck
            return deck.shift();
            
    }
    
    
    
    const valorCarta = ( carta ) => {
        //en JS podemos tratar como array un string.
        // en este caso cogemos la primera posición de carta p.ej. [2C] cogemos el 2
        // const valor = carta [0];
        //como tenemos el 10 no nos sirve lo que hicimos anteriormente por eso usamos la función substring
        //le indicamos el indice inicial y el final. En este caso si tiene dos posiciones cogerá solo la primera y si tiene 3 posiciones cogerá las 2 primeras
        const valor = carta.substring(0, carta.length -1);
            return ( isNaN ( valor ) ) ? 
                    ( valor === "A" ) ? 11 : 10
                    : valor * 1 ; 
                }


    //turno 0 = 1er jugador, último = jugador IA
    const acumularPuntosJugador = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        peque[turno].innerText = puntosJugadores[turno];   
        return puntosJugadores[turno]; 
    }
    
    //Turno IA
    
    const turnoIA = ( puntosMinimos ) => {
    
        do{
            const carta = pedirCarta();
            acumularPuntosJugador(carta, puntosJugadores.length -1);
        //puntosIA = puntosIA + valorCarta( carta );
        //como tenemos querySelectorAll, indicamos que el segundo small que encuentra equivaldrá a puntosjugador con [0]
        //peque[1].innerText = puntosIA;    
        //mostramos la carta que equivale a Carta
        const imagen = document.createElement("img");
        //añadimos el atributo src y le ponemos la ruta
        imagen.setAttribute("src", `assets/cartas/${carta}.png`)
        imagen.classList.add("carta");
        contenedorImagenIA.append( imagen );
    
        if (puntosMinimos > 21 ){
            break;
        }
    
        } while(puntosJugadores.length-1 < puntosMinimos && (puntosMinimos <= 21))
    
    }
    
    // ----------Eventos-----------
    
    btnPedirCarta.addEventListener ("click",() => {
        const carta = pedirCarta();
        const puntosJugadores = acumularPuntosJugador(carta, 0);

    //mostramos la carta que equivale a Carta
    const imagen = document.createElement("img");
    //añadimos el atributo src y le ponemos la ruta
    imagen.setAttribute("src", `assets/cartas/${carta}.png`)
    imagen.classList.add("carta");
    contenedorImagenJugador.append( imagen );
    
    if ( puntosJugadores > 21 ){
        console.warn("...Game Over...");
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoIA(puntosJugadores(0));
        
    }
    else if( puntosJugadores[0] === 21 ){
        console.warn("21!");
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoIA(puntosJugadores);
        
    }
    
    })
    
    //boton detener
    
    btnDetener.addEventListener("click", () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoIA( puntosJugadores  );
        logica();
    })
    
    
    //lógica de win/lose
    
    const logica = () => {
    
    if ( puntosJugadores > puntosJugadores.length-1 || puntosJugadores.length-1 > 21){
        console.warn("You win!")
    }
    else if ( puntosJugadores.length-1 > puntosJugadores){
        console.warn("You lose...");
    }
    else {
        console.warn("TABLES");
    }
    }
    
    // botón nuevo juego
    
    btnNuevo.addEventListener("click", () => {
        console.clear();
   
        peque[0].innerText = "0";
        peque[1].innerText = "0";
        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;
        //eliminamos contenido del div de ambos jugadores
        contenedorImagenIA.innerHTML= "";
        contenedorImagenJugador.innerHTML="";
        //añadimos imagen de baraja de carta por detrás en jugador
        const img = document.createElement("img");
        contenedorImagenJugador.append (img );
        img.setAttribute("src", "assets/cartas/grey_back.png");
        img.setAttribute("class", "carta");
    
         //añadimos imagen de baraja de carta por detrás en IA
         const img2 = document.createElement("img");
         contenedorImagenIA.append (img2 );
         img2.setAttribute("src", "assets/cartas/red_back.png");
         img2.setAttribute("class", "carta");
    
    })

