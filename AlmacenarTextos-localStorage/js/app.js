/* ------------- Variables ------------- */

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let vectorTweets = []; // Aqui van almacenados los tweets 


/* ------------- eventListeners ------------- */


document.addEventListener('DOMContentLoaded', () => {

    eventListeners(); // iniciamos los Listeneres para asegurar que tanto el fomulario como  la lista de tweets estan disponibles

    // recupera los tweets del JSON
    tweets = JSON.parse(localStorage.getItem('tweets'));

    if (tweets) {
        vectorTweets = tweets;
    }

    // Fucion que muestra los tweets la ponemos dentro del DOMContentLoaded para que se muestren nada mas cargar la pagina
    mostrarTweets();

});


/* lisener para agreagar un tweet */
function eventListeners() {

    formulario.addEventListener('submit', agregarTweet);
    // usamos formulario para recoger el tweet y pasamos la fucion  que vamos a crear para agreagr un tweet
    console.log("tweet agregado")
}


/* ------------- funciones ------------- */


function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;

    if (tweet.trim() === '') { //Si quitando los espacios en blanco la cada es vacia se cumple el if
        const mensajeError = document.querySelector('.error');
        const error = document.createElement('p');
        if (mensajeError) {
            mensajeError.remove(); // evitamos que se nos acumulen los mensajes de error 
        }
     
        error.textContent = 'Un mensaje no puede ir vacio'; // contenido del mensaje
        error.classList.add('error');  // añadimos la clase a la etiqueta

        const contenido = document.querySelector('#contenido');
        contenido.appendChild(error);
        return
    }

    vectorTweets.push(tweet); // insertamos los tweets en el arry

    console.log(vectorTweets); // comprobamos que se añadan con un conole log

    guardarLocalStorage();

    mostrarTweets(); // lo mostramos. 

}

function mostrarTweets() {

    listaTweets.innerHTML = ''; // para limpiar el contenido interno de lista tweets y evitar duplicados

    vectorTweets.forEach(tweet => {  // Recorremos el array de tweets

        const li = document.createElement('li'); // creamos el elemento de la lista
        li.textContent = tweet;

        // por cada tweet que imprimamos hagamos un boton para borrar el tweet
        const btnBorrar = document.createElement('a');
        btnBorrar.textContent = 'X'; // contenido del eliminar 
        btnBorrar.classList.add('borrar-tweet'); // le das una clase a borrar
        // funcion para dar funcionalidad al eliminar
        btnBorrar.onclick = () => eliminarTweet(tweet);

        // Pintamos la lista de tweets
        listaTweets.appendChild(li);
        // por cada tweet se agrega un boton de eliminar
        li.appendChild(btnBorrar);

    });

}

// funcion para guardar los  tweets en el localStorage.
function guardarLocalStorage() {

    localStorage.setItem('tweets', JSON.stringify(vectorTweets));
}

function eliminarTweet(tweet) {

    //filtra el array para eliminar el tweet que conicida con el texto
    vectorTweets = vectorTweets.filter(t => t !== tweet);

    guardarLocalStorage();

    mostrarTweets();

}



