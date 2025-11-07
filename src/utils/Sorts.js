const getNextSortDirection = (currentDirection) => {
    if (currentDirection === null) return 'ascending';
    if (currentDirection === 'ascending') return 'descending';
    return null;
};


function defaultSort(ents, keyInd, direction){
    ents.sort((a, b) => {
        let valA = a[1][Object.keys(a[1])[keyInd]];
        let valB = b[1][Object.keys(a[1])[keyInd]];

        if (!isNaN(parseFloat(valA))) {
            valA = parseFloat(valA)
        }
        if (!isNaN(parseFloat(valB))) {
            valB = parseFloat(valB)
        }

        if (valA === valB) return 0;

        if (direction === 'ascending') {
            return valA > valB ? 1 : -1;
        }
        if (direction === 'descending') {
            return valA < valB ? 1 : -1;
        }
        return 0;
    })
    return ents
}

function priceSort(ents, keyInd, direction){
    ents.sort((a, b) => {
        let valA = a[1][Object.keys(a[1])[keyInd]];
        let valB = b[1][Object.keys(a[1])[keyInd]];

        if (direction !== 'ascending' && direction !== 'descending') return 0

        if (valA.price_min !== valB.price_min) {
            if (valA.price_min === null) return 1
            if (valB.price_min === null) return -1

            if (direction === 'ascending') {
                return valA.price_min > valB.price_min ? 1 : -1;
            }
            if (direction === 'descending') {
                return valA.price_min < valB.price_min ? 1 : -1;
            }
        }
        else if (valA.price_min === null) {
            if (valA.alt_price != valB.alt_price) {
                if (valA.alt_price === 'n/a') return 1
                if (valB.alt_price === 'n/a') return -1

                if (direction === 'ascending') {
                    return valA.alt_price > valB.alt_price ? 1 : -1;
                }
                if (direction === 'descending') {
                    return valA.alt_price < valB.alt_price ? 1 : -1;
                }
            }
            return 0
        } else {
            return 0
        }
    })

    return ents
}

function checkedSort(ents, direction, checked){
    if (direction === null) { return ents }

    ents.sort((a, b) => {
        let valA = checked.has(a[0])
        let valB = checked.has(b[0])
        if (valA === valB) { return 0 }

        if (direction === 'ascending') {
            return valA ? 1 : -1;
        }
        if (direction === 'descending') {
            return valB ? 1 : -1;
        }
    })

    return ents
}

export {getNextSortDirection, defaultSort, priceSort, checkedSort}