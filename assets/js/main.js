/* Consegna

L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */

/* Istruzioni */

/*Creiamo la griglia*/
//Crea un container su html
//Seleziona il container con queryselector
//Lo inseriamo in una variabile
const gridContainer = document.querySelector('.container');
//Seleziona il pulsante
//Inseriscilo in una variabile
const playButton = document.querySelector('button');
//Numero massimo di celle per livello
const gridLevel = 100;
/* console.log(cellsPerRow); */

/* Pulsante che genera la griglia */
//Aggiungiamo un eventListener al click del pulsante per generare la griglia
playButton.addEventListener('click', function () {
    /* console.log('Ho cliccato'); */
    //Svuoto il container al click
    gridContainer.innerHTML = '';
    generateCells(gridContainer, gridLevel);

})

/*Funzione che general le celle*/
//Scriviamo una funzione per generare le celle
function generateCells(grid, cellsNumber) {
    for (let i = 1; i <= cellsNumber; i++) {
        //Inserisco il markup con la classe cell e i numeri inclusi nella variabile i all'interno del mio html
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.innerText = i;
        grid.insertAdjacentElement("beforeend", cellElement);

        /*Al click la cella cambia colore e stampa il numero della cella*/
        //Creo un eventListener per celle in modo che cambino colore al click
        cellElement.addEventListener('click', function () {
            //Imposto un colore di sfondo da js
            this.style.backgroundColor = 'aqua';
            //Stampo il numero della cella cliccata su console con innerText che mi scrive il testo all'interno di un elemento, il numero in questo caso
            console.log(this.innerText);
        })
    }



}

