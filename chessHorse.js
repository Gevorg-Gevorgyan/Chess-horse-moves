
window.onload = main;
const matrix = [];
const M = 8;
let horseI;
let horseJ;
let count = 0;

function main() {
    createMatrix();
    initMatrix();

console.log(matrix);
}

function isFinshed() {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] !== -1) {
                return false;
            }
        }
    }
    return true;
}

function createMatrix() {
    const tbody = document.getElementById('tbodyId');
    for (let i = 0; i < M; i++) {
        matrix[i] = [];
        const row = document.createElement('tr');
        for (let j = 0; j < M; j++) {
            matrix[i][j] = 0;
            const box = document.createElement('td');
            box.setAttribute('id', `${i}_${j}`);
            if ((i === 0 && j === 0) || (i === 0 && j === 7) || (i === 7 && j === 0) || (i ===7 && j === 7)) {
                box.addEventListener('click', () => onClickPutHorse(i, j));
                box.setAttribute('id', `${i}_${j}`);
            }
            row.appendChild(box);
        }
        tbody.appendChild(row);
    }
}

function onClickPutHorse(i, j) {
    if (count > 0) {
        return
    }
    matrix[i][j] = -1;
    const box = document.getElementById(`${i}_${j}`);
    box.classList.add('green');
    count++;
    horseI = i;
    horseJ = j;
    putHorse();
    const intervalId = setInterval(() => {

        if (isFinshed()) {
            clearInterval(intervalId);
            return;
        }

        initMatrix();
        moveHorse();

    }, 200); 
}

function initMatrix() {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] !== -1) {
                matrix[i][j] = getBoxesAviableMoves(i, j).length;
            }
        }
    }
}

function getBoxesAviableMoves(i, j) {
    const aviableMovesBoxes = [];

    if (i + 2 < M && j + 1 < M && matrix[i + 2][j + 1] !== -1) {
        aviableMovesBoxes.push({i: i + 2, j: j + 1});
    }
    if (i + 2 < M && j - 1 >= 0 && matrix[i + 2][j - 1] !== -1) {
        aviableMovesBoxes.push({i: i + 2, j: j - 1});
    }
    if (i - 2 >= 0 && j + 1 < M && matrix[i - 2][j + 1] !== -1) {
        aviableMovesBoxes.push({i: i - 2, j: j + 1});
    }
    if (i - 2 >= 0 && j - 1 >= 0 && matrix[i - 2][j - 1] !== -1) {
        aviableMovesBoxes.push({i: i - 2, j: j - 1});
    }
    if (i + 1 < M && j + 2 < M && matrix[i + 1][j + 2] !== -1) {
        aviableMovesBoxes.push({i: i + 1, j: j + 2});
    }
    if (i + 1 < M && j - 2 >= 0 && matrix[i + 1][j - 2] !== -1) {
        aviableMovesBoxes.push({i: i + 1, j: j - 2});
    }
    if (i - 1 >= 0 && j + 2 < M && matrix[i - 1][j + 2] !== -1) {
        aviableMovesBoxes.push({i: i - 1, j: j + 2});
    }
    if (i - 1 >= 0 && j - 2 >= 0 && matrix[i - 1][j - 2] !== -1) {
        aviableMovesBoxes.push({i: i - 1, j: j - 2});
    }
    return aviableMovesBoxes;
}

function putHorse() {
    matrix[horseI][horseJ] = -1;
    const box = document.getElementById(`${horseI}_${horseJ}`);
    box.classList.add('red')
}

function moveHorse() {
    const aviableMovesBoxes = getBoxesAviableMoves(horseI, horseJ);

    const minBox = getBoxWithMinValue(aviableMovesBoxes);

    horseI = minBox.i;
    horseJ = minBox.j;
    putHorse();
}

function getBoxWithMinValue(boxes) {
    let minValue = 8;
    let minBox = boxes[0];

    boxes.forEach((box) => {
        if (matrix[box.i][box.j] < minValue) {
            minBox = box;
            minValue = matrix[box.i][box.j];
        }
    });
    return minBox;

}
debugger;

// 1. CreateMtrix
// 2. Initilization matrix
// 3. Put horse
// 4. Initilization matrix;
// 5. Move horse
