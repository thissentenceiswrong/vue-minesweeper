function numDigits(x) {
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}

function xyToIndex(x, y, maxX, maxY) {
    if (hasUndefined([x, y, maxX, maxY])) {
        throw "Undefined param";
    }

    return maxY * x + y;
}

/**
 * Convert index in range [0, x*y] to two number x and y
 * @param index
 * @param maxX
 * @param maxY
 * @returns {{x: number, y: number}}
 */
function indexToxy(index, maxX, maxY) {
    if (hasUndefined([index, maxX, maxY])) {
        throw "Undefined param";
    }

    return {
        x: Math.floor(index / maxY),
        y: index % maxY
    }
}

function hasUndefined(arr) {
    let hasUndefined = false;
    arr.forEach((e) => {
        if (e === undefined) {
            hasUndefined = true;
        }
    });
    return hasUndefined;
}

function nearbyCells(x, y, maxX, maxY) {
    if (hasUndefined([x, y, maxX, maxY])) {
        throw "Undefined param";
    }

    const arr = [];
    for (let lopX = x - 1; lopX <= x + 1; lopX++) {
        for (let lopY = y - 1; lopY <= y + 1; lopY++) {
            if (lopX < 0 || lopY < 0 || lopX >= maxX || lopY >= maxY) {
                continue;
            }

            // skip itself
            if (lopX === x && lopY === y) {
                continue;
            }

            arr.push({x: lopX, y: lopY});
        }
    }

    return arr;
}

export {numDigits, xyToIndex, indexToxy, nearbyCells};