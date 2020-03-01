const allGreen = (face, faceIndex) =>{
    face.classList.add ('preset-e3d-green')
}

const numbered = (face, faceIndex) =>{
    face.classList.add ('preset-e3d-numbered')
    face.innerHTML = `<p>${faceIndex+1}</p>`
}

export {allGreen, numbered}