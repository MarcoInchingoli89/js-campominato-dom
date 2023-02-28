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

function generateGrid() {

    var playBtn = document.getElementById("play-btn");
    playBtn.addEventListener("click", startGame);

    function startGame() {
        // Nascondi il menu e il pulsante Gioca
        var menu = document.getElementById("menu");
        menu.classList.add("hide");
        var title = document.getElementsByTagName("h1")[0];
        title.classList.add("hide");

        // Nascondi il pulsante Gioca
        playBtn.classList.add("hide");

        // Genera la griglia di gioco in base alla difficoltà selezionata
        var difficulty = document.getElementById("difficulty").value;
        var gridSize = getGridSize(difficulty);
        generateCells(gridSize);
        showGrid();
    }

    function getGridSize(difficulty) {
        switch (difficulty) {
            case "facile":
                return 5;
            case "medio":
                return 8;
            case "difficile":
                return 10;
            default:
                return 5;
        }
    }

    function calculateCellSize(size) {
        var gridSize = size * size;
        var gridWidth = document.getElementById("grid-container").offsetWidth;
        var cellSize = Math.floor(gridWidth / Math.sqrt(gridSize)) - 10; // sottrai 10px per il bordo della cella
        return cellSize;
    }

    function generateCells(size) {
        console.log("Generating grid with size:", size);
        var gridSize = size * size;
        var grid = document.getElementById("grid");
        var gridContainer = document.getElementById("grid-container");
        gridContainer.style.width = (cellSize * numColumns + 10) + "px";
        grid.innerHTML = "";
        // Calcola il numero di colonne in base alla dimensione della griglia
        var numColumns = Math.sqrt(gridSize);
        var cellSize = calculateCellSize(size);
        for (var i = 1; i <= gridSize; i++) {
            var cell = document.createElement("div");
            cell.innerHTML = i;
            cell.classList.add("cell");
            // Calcola la larghezza delle celle in base al numero di colonne
            var cellSize = Math.floor(500 / numColumns) - 5;
            // Imposta la larghezza e l'altezza delle celle in base alla variabile cellSize
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            cell.addEventListener("click", function () {
                this.style.backgroundColor = "blue";
                console.log(this.innerHTML);
            });
            grid.appendChild(cell);
        }
        // Imposta il numero di colonne nella griglia
        grid.style.gridTemplateColumns = "repeat(" + numColumns + ", 1fr)";

    }

}

