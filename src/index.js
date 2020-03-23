import {make, buildShapesInDom} from './core'
import * as presets from './presets/colors'
import css from './e3dStyle.css';
import makeSvgPatternDefinitions from './base/makeSvgPatternDefinitions'

if (typeof window !== 'undefined') {
    window.onload = function() {
        makeSvgPatternDefinitions()
        buildShapesInDom()
    }
}

import * as t from '../testing/transformStack'



export {
    make,presets, buildShapesInDom, t
}