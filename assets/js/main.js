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
    var resetBtn = document.getElementById("reset-btn");
    playBtn.addEventListener("click", startGame);
    resetBtn.addEventListener("click", resetGame);

    function startGame() {
        // Nascondi il menu
        var menu = document.getElementById("menu");
        menu.classList.add("hide");

        // Mostra il pulsante reset dopo aver nascosto il menu
        resetBtn.classList.remove("hide");

        // Genera la griglia di gioco in base alla difficoltà selezionata
        var difficulty = document.getElementById("difficulty-select").value;
        var gridSize = getGridSize(difficulty);
        generateCells(gridSize);

        // Mostra la griglia di gioco
        var grid = document.getElementById("grid");
        grid.classList.remove("hide");
    }

    function resetGame() {
        // Mostra il menu e nascondi la griglia di gioco e il pulsante Reset
        var menu = document.getElementById("menu");
        menu.classList.remove("hide");
        var title = document.getElementsByTagName("h1")[0];
        title.classList.remove("hide");
        var grid = document.getElementById("grid");
        grid.classList.add("hide");
        resetBtn.classList.add("hide");
        // Rimuovi eventuali stili inline impostati sui nodi HTML
        var cells = document.getElementsByClassName("cell");
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("style");
        }
        var gridContainer = document.getElementById("grid-container");
        gridContainer.removeAttribute("style");
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
        var maxCellSize = Math.floor(gridWidth / Math.sqrt(gridSize)) - 10; // sottrai 10px per il bordo della cella
        var maxGridSize = maxCellSize * Math.sqrt(gridSize);
        var cellSize = maxCellSize;
        if (maxGridSize > gridWidth) {
            cellSize = Math.floor(gridWidth / Math.sqrt(gridSize)) - 20; // sottrai 20px per il bordo della cella e il margine tra le celle
        }

        return cellSize;
    }

    function generateCells(size) {
        console.log("Generating grid with size:", size);
        var gridSize = size * size;
        var grid = document.getElementById("grid");
        var gridContainer = document.getElementById("grid-container");
        var numColumns = Math.sqrt(gridSize);
        var cellSize = calculateCellSize(size);
        gridContainer.style.width = (cellSize * numColumns + 10) + "px";
        grid.innerHTML = "";
        // Calcola il numero di colonne in base alla dimensione della griglia
        for (var i = 1; i <= gridSize; i++) {
            var cell = document.createElement("div");
            cell.innerHTML = i;
            cell.classList.add("cell");
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

