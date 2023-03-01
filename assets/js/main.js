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
        var endGameMessage = document.getElementById("end-game-message");
        endGameMessage.classList.add("hide");
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
        gridContainer.style.width = cellSize * numColumns + 10 + "px";
        grid.innerHTML = "";

        // Imposta il numero di colonne nella griglia
        grid.style.gridTemplateColumns = "repeat(" + numColumns + ", 1fr)";

        // Calcola il numero di bombe in base alla difficoltà selezionata
        var difficulty = document.getElementById("difficulty-select").value;
        var numBombs;
        switch (difficulty) {
            case "facile":
                numBombs = 2;
                break;
            case "medio":
                numBombs = 6;
                break;
            case "difficile":
                numBombs = 10;
                break;
            default:
                numBombs = 2;
                break;
        }

        var bombs = [];
        // Genera le bombe in modo casuale
        while (bombs.length < numBombs) {
            var randomIndex = Math.floor(Math.random() * gridSize);
            if (!bombs.includes(randomIndex)) {
                bombs.push(randomIndex);
            }
        }

        var cellsClicked = 0;
        var cellsToClick = gridSize - numBombs;

        // Crea le celle della griglia
        for (var i = 0; i < gridSize; i++) {
            var cell = document.createElement("div");
            cell.classList.add("cell");

            // Imposta la larghezza e l'altezza delle celle in base alla variabile cellSize
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";

            // Se la cella contiene una bomba, aggiungi la classe "bomb"
            if (bombs.includes(i)) {
                cell.classList.add("bomb");
                cell.style.backgroundColor = "#ddd"; // Nasconde la bomba
                cell.addEventListener("click", function () {
                    this.style.backgroundColor = "red"; // Mostra la bomba al click
                    grid.querySelectorAll(".cell").forEach(function (cell) {
                        cell.removeEventListener("click", cellClickHandler);
                    });
                    // mostra messaggio di sconfitta
                    var endGameMessage = document.getElementById("end-game-message");
                    var endGameHeading = document.getElementById("end-game-heading");
                    var endGameScore = document.getElementById("end-game-score");
                    endGameMessage.classList.remove("hide");
                    endGameHeading.textContent = "Hai perso!";
                    endGameScore.textContent = "Il tuo punteggio è " + cellsClicked;
                });
            } else {
                cell.addEventListener("click", cellClickHandler);
            }

            grid.appendChild(cell);
        }

        function cellClickHandler() {
            this.style.backgroundColor = "white";
            cellsClicked++;
            if (cellsClicked == cellsToClick) {
                grid.querySelectorAll(".cell").forEach(function (cell) {
                    cell.removeEventListener("click", cellClickHandler);
                });
                var endGameMessage = document.getElementById("end-game-message");
                var endGameHeading = document.getElementById("end-game-heading");
                var endGameScore = document.getElementById("end-game-score");
                endGameMessage.classList.remove("hide");
                endGameHeading.textContent = "Hai vinto!";
                endMessage.style.display = "block";
                endGameScore.textContent = "Il tuo punteggio è " + cellsClicked;
            }
        }
    }



}

