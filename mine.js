/**
 * generate ( n * n ) matrix array
 * 
 * [0,0,0,0,0]
 * [0,0,0,0,0]
 * [0,0,0,0,0]
 * [0,0,0,0,0]
 * [0,0,0,0,0]
 * 
 * @param {*} nSize 
 */
const generateMineArray = nSize => {
    const tempColumeArray = [];

    for (let nColumeIndex = 0; nColumeIndex < nSize; nColumeIndex++) {
        let tempRowArray = [];

        for (let nRowIndex = 0; nRowIndex < nSize; nRowIndex++) {
            tempRowArray.push(0);
        }

        tempColumeArray.push(tempRowArray);
    }

    return tempColumeArray;
}

/**
 * generate 'M' random Mine into mineArray
 * 
 * [0,'M',0,0,0]
 * [0,0,0,'M',0]
 * [0,0,0,0,'M']
 * [0,'M',0,0,0]
 * [0,0,0,'M',0]
 * 
 * @param {*} nSize 
 */
const generateRandomMine = (mineArray, nSize) => {
    const arrayLength = nSize * nSize;
    const randomSet = new Set();
    const generateRandomCoord = () => Math.floor(Math.random(nSize) * nSize);

    while (randomSet.size !== nSize) {
        randomSet.add(generateRandomCoord() + ',' + generateRandomCoord());
    }

    randomSet.forEach((sCoord) => {
        const randomColumn = Number(sCoord.split(',')[0]);
        const randomRow = Number(sCoord.split(',')[1]);

        mineArray[randomColumn][randomRow] = 'M';
    });
}

/**
 * printed mine array to Console
 * 
 * [0,'M',0,0,0]
 * [0,0,0,'M',0]
 * [0,0,0,0,'M']
 * [0,'M',0,0,0]
 * [0,0,0,'M',0]
 * 
 * @param {*} mineArray 
 * @param {*} nSize 
 */
const printMineArray = (mineArray, nSize) => {
    const arrLength = nSize * nSize;

    for (let nIndex = 0; nIndex < arrLength; nIndex++) {
        const rowIndex = nIndex % nSize;
        const columnIndex = Math.floor(nIndex / nSize);

        process.stdout.write('[ ' + mineArray[columnIndex][rowIndex].toString() + ' ]');

        if (rowIndex + 1 == nSize) {
            process.stdout.write('\n');
        }
    }
}

const validateMineCounter = (mineArray, size) => {
    const arrLength = size * size;

    for (let nIndex = 0; nIndex < arrLength; nIndex++) {
        const row = nIndex % size;
        const column = Math.floor(nIndex / size);

        // validate square area except for mine area
        if (mineArray[column][row] != 'M') {
            mineArray[column][row] = getMineCountFromSquareArea({
                row: row,
                column: column,
                mineArray: mineArray,
                size: size
            });
        }
    }
}
/**
 * check area
 * [x][x][x]
 * [x][o][x]
 * [x][x][x]
 * @param {*} mineArray 
 * @param {*} size 
 */
const getMineCountFromSquareArea = ({ row, column, mineArray, size }) => {
    let tempMineCount = 0;

    for (let nIndex = 0; nIndex < 9; nIndex++) {
        const nValidRow = 3;
        const checkColumn = column + Math.floor(nIndex / nValidRow) - 1;
        const checkRow = row + (nIndex % nValidRow - 1);
        const isNotOutBound = checkRow >= 0 && checkRow < size && checkColumn >= 0 && checkColumn < size;

        // validate Outbound area
        if (isNotOutBound) {
            const isContainsMine = mineArray[checkColumn][checkRow] == 'M';
            // validate containing mine 
            if (isContainsMine) {
                tempMineCount = tempMineCount + 1; // added mineCount
            }
        }
    }

    return tempMineCount;
}

const runMineMapping = (size = 10) => {
    let mineMap = generateMineArray(size);
    generateRandomMine(mineMap, size);
    printMineArray(mineMap, size);
    console.log('*********************************************');
    console.log('**    before validate Mine Counter         **');
    console.log('********************************************* \n');

    validateMineCounter(mineMap, size);

    printMineArray(mineMap, size);
    console.log('*********************************************');
    console.log('**    after validate Mine Counter          **');
    console.log('********************************************* \n');
}

console.log('*****  execute mine mapping and find  ***** \n');
runMineMapping(10); // 10 * 10 size matrix mine map