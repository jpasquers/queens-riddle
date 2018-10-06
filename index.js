let DIM = 8;
let NUM_QUEENS = 8;

let itemsUnique = (locs) => {
    let set = new Set(locs);
    return set.size == locs.length;
}

let checkSuccess = (queenLocs) => {
    if (!itemsUnique(queenLocs.map((queenLoc) => getRow(queenLoc)))) return false;
    if (!itemsUnique(queenLocs.map((queenLoc) => getCol(queenLoc)))) return false;
    if (!itemsUnique(queenLocs.map((queenLoc) => getRow(queenLoc) - getCol(queenLoc)))) return false;
    if (!itemsUnique(queenLocs.map((queenLoc) => (DIM - getRow(queenLoc)) - getCol(queenLoc)))) return false;

    return true;
}

let getRow = (loc) => {
    return Math.floor(loc / DIM);
}

let getCol = (loc) => {
    return loc % DIM;
}

let prettyPrint = (queenLocs) => {
    let printArr = [];
    for (let i=0; i<DIM; i++) {
        let subArr = [];
        for (let j=0; j<DIM; j++) {
            subArr.push("0");
        }
        printArr.push(subArr);
    }
    queenLocs.forEach((queenLoc) => {
        printArr[getRow(queenLoc)][getCol(queenLoc)] = "Q";
    })
    console.log(printArr);
}

let finish = false;
let run = (start, end, currentArray) => {
    if (finish) return;
    for (let i=start; i<end; i++) {
        let nextArray = currentArray.concat([i]);
        if (nextArray.length > 1 && !checkSuccess(nextArray)) continue;
        if (end == Math.pow(DIM,2) && checkSuccess(nextArray)) {
            prettyPrint(nextArray);
            finish = true;
            return;
        }
        run(i+1,end+1, nextArray);
    }
}

run(0, Math.pow(DIM,2) - NUM_QUEENS + 1, []);