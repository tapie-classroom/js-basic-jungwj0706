let board;
let score_display;
let score=0;
let bestScore = localStorage.getItem("bestScore") || 0;

document.getElementById("best").textContent = bestScore;

function updateBestscore() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("best").textContent = bestScore;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    board = document.getElementById('board');
    score_display = document.getElementById('score');
    createGrid();
    addGrid();
    addGrid();
})

document.getElementById("newGame").addEventListener("click", () => {
    const confirmReset = confirm("정말로 새 게임을 시작하시겠습니까?");
    if (!confirmReset)
        return;

    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.textContent = "";
        tile.setAttribute("data-value", "");
    })

    score=0;
    score_display.textContent = "0";

    addGrid();
    addGrid();
})

function createGrid() {
    for (let i=0; i<16; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
    }
}

function addGrid() {
    const emptyTiles = Array.from(document.querySelectorAll('.tile')).filter(tile => tile.textContent === "");

    if (emptyTiles.length === 0) 
        return;

    const randomTile = emptyTiles[Math.floor(Math.random()*emptyTiles.length)];
    const number = Math.random() < 0.9 ? 2 : 4;
    randomTile.textContent = number;
    randomTile.setAttribute("data-value", number);
}

document.addEventListener("keydown", keyInput);

function keyInput(event) {
    switch(event.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
    }
}

function moveLeft() {
    const allTiles = Array.from(document.querySelectorAll('.tile'));

    for (let row=0; row<4; row++) {
        const rowTiles = allTiles.slice(row*4, row*4+4);
        let tiles = rowTiles.map(tile => tile.textContent === "" ? 0 : parseInt(tile.textContent));
        tiles = tiles.filter(value => value!=0);

        for (let i=0; i<tiles.length-1; i++) {
            if (tiles[i]==tiles[i+1]) {
                tiles[i] *= 2;
                score += tiles[i];
                score_display.textContent = score;
                updateBestscore();

                rowTiles[i].classList.add("merge");
                setTimeout(() => rowTiles[i].classList.remove("merge"), 100);

                tiles[i+1]=0;
            }
        }
        tiles = tiles.filter(value => value !== 0)
        while (tiles.length < 4) 
            tiles.push(0);

        tiles.forEach((value, i) => {
            rowTiles[i].textContent = value === 0 ? "" : value;
            rowTiles[i].setAttribute("data-value", value === 0 ? "" : value);
        })
    }
    addGrid();  

    if (gameOver()) {
        setTimeout(() => {
            alert("Game Over");
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem("bestScore", bestScore);
                document.getElementById("best").textContent = bestScore;
            }
        })
    }
} 

function moveRight() {
    const allTiles = Array.from(document.querySelectorAll('.tile'));

    for (let row = 0; row < 4; row++) {
        const rowTiles = allTiles.slice(row * 4, row * 4 + 4);
        let tiles = rowTiles.map(tile => tile.textContent === "" ? 0 : parseInt(tile.textContent));
        
        tiles = tiles.filter(value => value !== 0);
        tiles.reverse();

        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] === tiles[i + 1]) {
                tiles[i] *= 2;
                score += tiles[i];
                score_display.textContent = score;
                updateBestscore();

                tiles[i + 1] = 0;
            }
        }

        tiles = tiles.filter(value => value !== 0);
        while (tiles.length < 4) tiles.push(0);
        tiles.reverse();

        tiles.forEach((value, i) => {
            rowTiles[i].textContent = value === 0 ? "" : value;
            rowTiles[i].setAttribute("data-value", value === 0 ? "" : value);
        });
    }

    addGrid();

    if (gameOver()) {
        setTimeout(() => {
            alert("Game Over");
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem("bestScore", bestScore);
                document.getElementById("best").textContent = bestScore;
            }
        });
    }
}


function moveUp() {
    const allTiles = Array.from(document.querySelectorAll('.tile'));

    for (let col=0; col<4; col++) {
        let columnTiles = [];
        for (let row=0; row<4; row++) {
            const index = row*4+col;
            columnTiles.push(allTiles[index]);
        }
        let tiles = columnTiles.map(tile => tile.textContent === "" ? 0 : parseInt(tile.textContent));
        tiles = tiles.filter(value => value !== 0);

        for (let i=0; i<tiles.length; i++) {
            if (tiles[i] === tiles[i+1]) {
                tiles[i] *= 2;
                score += tiles[i];
                score_display.textContent = score;
                updateBestscore();

                columnTiles[i].classList.add("merge");
                setTimeout(() => columnTiles[i].classList.remove("merge"), 100);

                tiles[i+1]=0;
            }
        }
        tiles = tiles.filter(value => value !== 0);
        while (tiles.length < 4) 
            tiles.push(0);

        tiles.forEach((value, i) => {
            columnTiles[i].textContent = value === 0 ? "" : value;
            columnTiles[i].setAttribute("data-value", value === 0 ? "" : value);
        })
    }
    addGrid();

    if (gameOver()) {
        setTimeout(() => {
            alert("Game Over");
            updateBestscore();
        })
    }
}

function moveDown() {
    const allTiles = Array.from(document.querySelectorAll('.tile'));
    for (let col=0; col<4; col++) {
        let columnTiles = [];
        for (let row=0; row<4; row++) {
            const index = row*4+col;
            columnTiles.push(allTiles[index]);
        }
        let tiles = columnTiles.map(tile => tile.textContent === "" ? 0 : parseInt(tile.textContent));
        tiles = tiles.filter(value => value !== 0);
        tiles.reverse();

        for (let i=0; i<tiles.length-1; i++) {
            if (tiles[i] === tiles[i+1]) {
                tiles[i] *= 2;
                score += tiles[i];
                score_display.textContent = score;
                updateBestscore();

                columnTiles[i].classList.add("merge");
                setTimeout(() => columnTiles[i].classList.remove("merge"), 100);

                tiles[i+1]=0;
            } 
        }
        tiles = tiles.filter(value => value !== 0);
        while (tiles.length < 4) 
            tiles.push(0);

        tiles.reverse();
        tiles.forEach((value, i) => {
            columnTiles[i].textContent = value === 0 ? "" : value;
            columnTiles[i].setAttribute("data-value", value === 0 ? "" : value);
        })
    }
    addGrid();

    if (gameOver()) {
        setTimeout(() => {
            alert("Game Over");
            updateBestscore();
        })
    }
}

function gameOver() {
    const tiles = Array.from(document.querySelectorAll(".tile")).map(t => t.textContent === "" ? 0 : parseInt(t.textContent));
    
    if (tiles.includes(0))
        return false;
    for (let row=0; row<4; row++) {
        for (let col=0; col<3; col++) {
            const index = row*4 + col;
            if (tiles[index] === tiles[index+1])
                return false;
        }
    }

    for (let col=0; col<4; col++) {
        for (let row=0; row<3; row++) {
            const index = row*4 + col;
            if (tiles[index] === tiles[index+4])
                return false;
        }
    }
    return true;
}