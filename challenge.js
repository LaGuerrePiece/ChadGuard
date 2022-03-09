function entropy(X) {
    //X est une string de taille N avec n symboles différents
    let N = X.length
    console.log('length : ', X.length)
    let memory = calculaten(X)
    let n = memory.length
    let H = 0
    for (let i = 0; i < n; i++) {
        H -= (memory[i][1]/N)*Math.log2(memory[i][1]/N)
        console.log('lol')
    }
    return H
}


function calculaten(X) {
    let memory = []
    for (let i = 0; i < X.length; i++) {
        let memoryOne = memory.map(x => x[0])
        if (!memoryOne.includes(X[i])) {
            memory.push([X[i], 1])
        } else {
            let a = memoryOne.indexOf(X[i])
            memory[a][1] = memory[a][1] + 1
        }
    }   
    return memory
}


console.log(entropy('1223334444'))