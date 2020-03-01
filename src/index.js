
import Cube from './shapes/cube'
import Pyramid from './shapes/pyramid'
import Dodecahedron from './shapes/dodecahedron'
import Cuboid from './shapes/cuboid'
import Decagon from './shapes/decagon'
import Hexagon from './shapes/hexagon'
import Icosahedron from './shapes/icosahedron'
import Octahedron from './shapes/Octahedron'
import PentagonalTrapezohedron from './shapes/PentagonalTrapezohedron'
import Tetrahedron from './shapes/Tetrahedron'

import * as presets from './presets/colors'

import css from './e3dStyle.css';

const make = {
    Cube, Pyramid, Dodecahedron, Cuboid,Decagon,
    Hexagon, Icosahedron, Octahedron, PentagonalTrapezohedron,
    Tetrahedron
}

export {
    make,presets
}