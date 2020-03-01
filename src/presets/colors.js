const allGreen = (face, faceIndex) =>{
    face.classList.add ('preset-e3d-green')
}

const allBlack = (face, faceIndex) =>{
    face.classList.add ('preset-e3d-black')
}

const checkered = (face, faceIndex) =>{
    face.classList.add (faceIndex%2 === 0 ? 'preset-e3d-black' : 'preset-e3d-white')
}

const numbered = (face, faceIndex) =>{
    face.classList.add ('preset-e3d-numbered')
    face.innerHTML = `<p>${faceIndex+1}</p>`
}

export {allGreen, numbered, checkered,allBlack}