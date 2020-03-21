# 3d-shapes
## Description
A library for rendering geometric solids comprised of html and svg elements 3d rotated using the transform CSS property, providing interfaces for controlling the rotation and position of rendered shapes.

## Installation
### load as script tag
    <script src='https://unpkg.com/3d-elements'></script>

### NPM 
    npm install --save 3d-elements

## Example
### rendering shapes in HTML
In the following HTML fragment, the library loaded from the script tag will:
-add the e3d base stylesheet to the document
-attach an onLoad event listener to the document, running the render function, using the attributes as configuration 
-the render function will convert all elements with a valid e3d-shape attribute
-any existing children of the e3d-shape element will become e3d-faces. extra children will be added to ensure the e3d-shape element has the right number of faces

    <script src='https://unpkg.com/3d-elements'></script>
    <figure e3d-shape="Decagon" 
    size="50 100 50" 
    spin="30 60 10" 
    face-class=""preset-e3d-green preset-e3d-numbered"">
        <div>first face</div>
        <div>
            <p>second face</p>
            <p>it has <b>more</b> content</p>
        </div>
    </figure>

### creating shapes in javascript
The 'make' object exposes the functions for creating new shapes. Each function returns the e3d-shape element (with the e3d-face element children) which can be appended to the document.

    var dodecahedron = e3d.make.Dodecahedron({
    faceClass:'e3d-preset-black',
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