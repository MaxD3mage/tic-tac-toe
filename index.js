const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [[EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY]];

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

let _counter = 0
function cellClickHandler (row, col) {
    // Пиши код тут
    if (!checkWinner()) {
        if (checkMove()) {
            let move = _counter % 2 === 0 ? ZERO : CROSS;
            field[row][col] = move;
            renderSymbolInCell(move, row, col);
            _counter++;
        }
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    field = [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    container.querySelectorAll('tr')

    alert('reset!');
}

function checkMove() {

    for (let column of field) {
        for (let cell of field) {
            if (cell === EMPTY) {
                return true;
            }
        }
    }

    alert('Победила дружба');
    return false;
}

function checkWinner() {
    let winner = false;

    for (let column of field) {
        if (column[0] === column[1] === column[2] !== EMPTY) {
            winner = column[0];
            break;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (field[0][i] === field[1][i] === field[2][i] !== EMPTY) {
            winner = field[0][i];
            break;
        }
    }

    if (field[0][0] === field[1][1] === field[2][2] !== EMPTY) {
        winner = field[0][0];
    }

    if (field[2][0] === field[1][1] === field[0][2] !== EMPTY) {
        winner = field[0][0];
    }

    if (winner) {
        alert(`Победитель: ${winner}`);
        return true;
    }

    return false;
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
