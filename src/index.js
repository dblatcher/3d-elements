import {make, buildShapesInDom} from './core'
import * as presets from './presets/colors'
import css from './e3dStyle.css';

if (typeof window !== 'undefined') {
    window.onload = buildShapesInDom
}

import * as t from '../testing/transformStack'

export {
    make,presets, buildShapesInDom, t
}