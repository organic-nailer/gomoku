let tableData = [...Array(19)].map(() => Array(19).fill("-"));
let nextPlayerIsO = true;

function resetTable() {
    tableData = [...Array(19)].map(() => Array(19).fill("-"));
    let nextPlayerIsO = true;
    updateTable();
    updatePlayer();
}

function updateTable() {
    const table = document.getElementById("gameTable");
    table.innerHTML = "";
    for(var row = 0; row < tableData.length; row++) {
        const newRow = document.createElement("tr");
        for(var col = 0; col < tableData[0].length; col++) {
            const newCell = document.createElement("td");
            const img = new Image();
            if(tableData[row][col] == "o") img.src = "white.png";
            if(tableData[row][col] == "x") img.src = "black.png";
            const cellText = document.createTextNode(
                tableData[row][col]
            );
            newCell.appendChild(img);
            newCell.onclick = () => cellClicked(newCell);
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
    }
}

const randRange = (max) => Math.floor(Math.random() * max);

const cellClicked = (cell) => {
    const row = cell.parentNode.rowIndex;
    const col = cell.cellIndex;
    console.log(`${row},${col}`);
    if(tableData[row][col] != "-") {
        return;
    }
    tableData[row][col] = nextPlayerIsO ? "o" : "x";
    nextPlayerIsO = !nextPlayerIsO;
    updateTable();
    if(checkWin(row,col)) {
        const playerView = document.getElementById("playerView");
        playerView.innerHTML = "終了";
    }
    else {
        updatePlayer();
    }
};

const updatePlayer = () => {
    const playerView = document.getElementById("playerView");
    if(nextPlayerIsO) {
        playerView.innerHTML = "次はOの手番です";
    }
    else {
        playerView.innerHTML = "次はXの手番です";
    }
}

const checkWin = (row,col) => {
    return checkLineWin(row - 4,col,1,0,9)
    || checkLineWin(row,col-4,0,1,9)
    || checkLineWin(row-4,col-4,1,1,9)
    || checkLineWin(row+4,col-4,-1,1,9);
}

const checkLineWin = (startRow,startCol,moveX,moveY,len) => {
    var x = startRow;
    var y = startCol;
    var data = 0;
    for(var i = 0; i < len; i++) {
        if(x < 0 || x >= tableData.length
            || y < 0 || y >= tableData[0].length) {
            x += moveX;
            y += moveY;
            continue;
        }
        var cell = tableData[x][y];
        if(cell == "-") {
            x += moveX;
            y += moveY;
            data = 0;
            continue;
        }
        if(cell == "o") {
            if(data >= 0) {
                data++;
                x += moveX;
                y += moveY;
                if(data >= 5) return true;
            }
            else {
                data = 1;
                x += moveX;
                y += moveY;
                continue;
            }
        }
        if(cell == "x") {
            if(data <= 0) {
                data--;
                x += moveX;
                y += moveY;
                if(data <= -5) return true;
            }
            else {
                data = -1;
                x += moveX;
                y += moveY;
                continue;
            }
        }
    }
    return false;
}
