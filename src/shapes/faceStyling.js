function makeList (quantity) {
    let i, list=[]
    for (i=0; i< quantity; i++) {
        list.push({
            width:'',
            height:'',
            transform:'',
        })
    }
    return list
}


function apply(target, faceStyles) {
    const hash = target.getAttribute('hash')
    const style = document.createElement('style')

    faceStyles.forEach ((faceStyle, index) => { 
        style.textContent += `[hash="${hash}"]>[e3d-face="${index}"] {
`
        const props = Object.keys(faceStyle)
        props.forEach (prop => {
            style.textContent +=`${prop}: ${faceStyle[prop]};
`
        })
        style.textContent += `}`
    })


    target.appendChild(style);
}

export {makeList, apply}