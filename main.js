const boxContainer = document.getElementById('box');
const backBtn = document.getElementById("back");
const selectOption = document.getElementById('select')
let boxSize = selectOption.value
let moveOrder = 0;
let selectedBoxes = { x: [], o: [] };
let winner = '';

selectOption.addEventListener('change', function () {
    boxSize = this.value;
    reset();
    
})

let findMatrix = (n) => {
    let indexes = [];
    let matrix = [];
    for (let i = 0; i < n ** 2; i++) {
        indexes.push(i);
    }
    for (let k = 0; k < n; k++) {
        matrix.push(indexes.slice(k * n, (k + 1) * n))
    }
    return (matrix);
}

let findAllSequence = (n = 3) => {
    let matrix = findMatrix(n);
    let allSeq = [];
    let arr3 = [];
    let arr4 = [];
    for (let i = 0; i < matrix.length; i++) {
        let arr = [];
        let arr2 = [];
        for (let j = 0; j < matrix[i].length; j++) {
            arr.push(matrix[j][i]);
            arr2.push(matrix[i][j]);

        }
        arr3.push(matrix[i][n - 1 - i]);
        arr4.push(matrix[i][i]);


        allSeq.push(arr)
        allSeq.push(arr2)

    }
    allSeq.push(arr3)
    allSeq.push(arr4)

    return allSeq
}




const plot = () => {
    boxContainer.style.gridTemplateColumns = `repeat(${boxSize}, 1fr)`
    boxContainer.innerHTML = '';
    for (let i = 0; i < boxSize ** 2; i++) {
        boxContainer.innerHTML += `<button onclick="select(${i})">${selectedBoxes.x.includes(i) ? "X" : selectedBoxes.o.includes(i) ? "O" : ""}</button>`
    }
}
plot()


function isSubset(moves, sequenceValue) {
    for (let i = 0; i < sequenceValue.length; i++) {
        if (!moves.includes(sequenceValue[i])) {
            return false;
        }
    }
    return true;
}

const reset = () => {
    selectedBoxes.o = [];
    selectedBoxes.x = [];
    moveOrder = 0;
    plot()

}

const select = (index) => {
    let sequances = findAllSequence(boxSize)
    const allSelectedBoxes = selectedBoxes.o.concat(selectedBoxes.x);
    if (!allSelectedBoxes.includes(index)) {
        if (moveOrder % 2) {
            selectedBoxes.o.push(index)
        }
        else {
            selectedBoxes.x.push(index)
        }
        moveOrder++
        plot()
        if (moveOrder >= 2 * boxSize - 1) {

            for (el of sequances) {
                let didXWin = isSubset(selectedBoxes.x, el);
                let didOWin = isSubset(selectedBoxes.o, el);
                winner = didXWin ? "x" : didOWin ? 'o' : "";
                if (winner) return setTimeout(() => { if (window.confirm(`G'olib ${winner}. Qayta o'ynaysizmi?`)) reset() }, 200)
            }
        }
        if (moveOrder >= boxSize ** 2) {
            setTimeout(() => { if (window.confirm(`Durrang. Qayta o'ynaysizmi?`)) reset() }, 200)
        }
    }
}

const moveBack = () => {
    if (moveOrder > 0) {
        if (moveOrder % 2) {
            selectedBoxes.x.pop()
        }
        else {
            selectedBoxes.o.pop()
        }
        moveOrder--;
        plot();
    }
}

