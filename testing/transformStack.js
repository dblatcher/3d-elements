
function pushTransform(element, tranformation) {

    if (!element.style.transform) {
        element.style.transform = ""
    }

    element.style.transform += ' ' + tranformation
    return element.style.transform.split(' ')
}

function popTransform(element) {
    var list = element.style.transform.split(' ');
    list.pop()
    element.style.transform = list.join(' ')
    return list
}

export {popTransform, pushTransform}