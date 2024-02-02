


function useMemo(cb, depNum) {
    let cachedResult = null;
    let cachedDepNum = null;
    return () => {
        if (cachedDepNum != depNum && cachedResult != cb) {
                cachedResult = cb;
                cachedDepNum = depNum;
        }
        return cachedResult
    }

}

function sum(a, b) {
    return a + b;
}

console.log(useMemo(sum(1, 2), 1)())
console.log(useMemo(sum(1, 2), 1)())
console.log(useMemo(sum(1, 3), 2)())






