const rootText = {
    get: function() {
        const textNodeArray = Array.prototype.slice.call( this.childNodes, 0 )
        .filter( node => node.nodeName === '#text');
        if (textNodeArray.length === 0 ) {return ''}
        if (textNodeArray.length === 1) {return textNodeArray[0].textContent}
        return textNodeArray.map(node => node.textContent)
    },

    set: function(values) {
        let i
        if (!Array.isArray(values)) { values = [values]}
        for (i = 0; i < values.length; i++) {
            if (values[i].toString) {values[i] = values[i].toString()}
        }
        values = values.map (value => {
            if (typeof value === 'string') return value;
            return ''; 
        })

        const textNodeArray = Array.prototype.slice.call( this.childNodes, 0 )
        .filter( node => node.nodeName === '#text');

        for (i = 0; i < values.length; i++) {
            if (textNodeArray[i]) {textNodeArray[i].textContent = values[i]}
            else {this.appendChild( document.createTextNode(values[i]))}
        }

        if (textNodeArray.length > values.length) {
            for (i = textNodeArray.length-1; i >= values.length ; i--) {
                this.removeChild(textNodeArray[i])
            }
        }
    }
}

const pointerTarget = {
    get: function() {
        let i
        for (i=0; i<this.childElementCount; i++) {
            if (this.children[i].getAttribute('e3d-svg')) {
                return this.children[i].children[0]
            }
        }
        return this
    }
}

export default {rootText,pointerTarget}