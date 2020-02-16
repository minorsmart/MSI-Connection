function runFunction() {
    const a = document.getElementById("a-value").value
    const b = document.getElementById("b-value").value
    const result = ggDeler(a, b)[0]
    const runs = ggDeler(a, b)[1]
    document.getElementById("result").innerHTML = result
    document.getElementById("runs").innerHTML = runs
}

function ggDeler(a, b) {
    let d = Math.max(a, b)
    let dd = Math.min(a, b)
    let r = d%dd
    let i = 0
    
    while(r > 0) {
    r = d%dd
    d = dd
    dd = r
    i++
    }
    return [d, i, a, b]
}
