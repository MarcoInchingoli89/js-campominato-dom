/* Consegna

/*Milestone 1*/

/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */

/*Milestone 2*/

//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.

//Nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

//In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

//La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

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

/*Funzione che genera le celle*/
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

/*Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.*/

//Genero i numeri casuali con una funzione math random
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Imposto le nostre bombe casuali in un range da 1 a 100
const bomb = generateRandomNumber(1, 100);
/* console.log(bomb) */
//Imposto un contatore per le bombe
const bombs = [];
//Imposto i parametri da 1 al mio numero di celle massimo nella mia funzione
generateBombs(1, gridLevel);
function generateBombs(min, max) {
    //Con un ciclo while andiamo a verificare se le bombe casuali sono uguali o meno finché non raggiungiamo il totale di 16 bombe
    while (bombs.lenght !== 16) {
        //Se non ci sono bombe all'interno di bombs ne mette una finché non raggiunge un totale di 16
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    
        return bombs
    }
}


/* console.log(bombs); */

/*In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.*/

//Impostiamo in una variabile le bombe casuali
const randomBombs = generateBombs(1, gridLevel);
//Selezioniamo tutte le celle
const cells = document.getElementsByClassName("cell");
console.log(cells)
for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    console.log(cell)
    cell.addEventListener('click', function () {
        if (i === randomBombs) {
            cell.style.backgroundColor = 'red';
        } else {
            cell.style.backgroundColor = 'aqua';
        }
    })
}