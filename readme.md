# 3d-shapes
## Description
A library for rendering geometric solids comprised of html and svg elements 3d rotated using the transform CSS property, providing interfaces for controlling the rotation and position of rendered shapes.

## Installation
### load as script tag
    <script src='https://unpkg.com/3d-elements'></script>

### NPM 
    npm install --save 3d-elements

## Examples
### rendering shapes in HTML
In the following HTML fragment, the library is loaded from the script tag, so:
- the library will: 
  1. the e3d base stylesheet to the document, 
  2. attach an event listener to the document to run the buildShapesInDom function after the onLoad event. The buildShapesInDom function selects all elements with the "e3d-shape" attribute (except those created in javascript) and calls the fromDom method of the Shape corresponding to the attribute value.
- Decagon.fromDom will be called with the figure element as its argument which so:
  1. any existing children of the e3d-shape element will become e3d-faces, with their children still in place. 
  2. Extra e3d-face children will be added to ensure the e3d-shape element has the right number of faces.
  3. the figure element will be styled based on its size, spin and face-class attribute
  4. the 'gradual' and 'constant' properties will be added to the element - these are interfaces for moving and rotating the shape during runtime.

```
<script src='https://unpkg.com/3d-elements'></script>
<figure e3d-shape="Decagon" 
size="50 100 50" 
spin="30 60 10" 
face-class="preset-e3d-green preset-e3d-centered">
    <div>first face</div>
    <div>
        <p>second face</p>
        <p>it has <b>more</b> content</p>
    </div>
</figure>
```

### creating shapes in javascript
The 'make' object exposes the functions for creating new shapes. Each function returns the e3d-shape element (with the e3d-face element children) which can be appended to the document.

    var dodecahedron = e3d.make.Dodecahedron({
        faceClass:'preset-e3d-black',
        size: [200],
        spin: [0,0,0],
        move: [0,100,0],
        faceContent: '<p>This mark-up will be added to each face</p>'
    })
    document.querySelector('div').appendChild(dodecahedron)

## supported shapes
* Cube
* Pyramid
* Dodecahedron
* Cuboid
* Decagon
* Hexagon
* Icosahedron
* Octahedron
* PentagonalTrapezohedron
* Tetrahedron
* TruncatedCube