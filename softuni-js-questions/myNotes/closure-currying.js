// classic closure

function createCounter () {
    let count = 0;
    return () => {
        count += 1
        return count
    }
}
const closureCreated = createCounter()
console.log(closureCreated())
console.log(closureCreated())
console.log(closureCreated())


// currying closure

function outerFunc(firstMsg){
    return function innerFunc(secondMsf){
        console.log(firstMsg);
        console.log(secondMsf);
    }
}

const halfCurryingCreated = outerFunc('hello');
halfCurryingCreated('world')


// You have to store the creating closure function in a variable, making a function expression which then has the complete closure in it.