var editor = document.getElementById('editor')
var elements = document.getElementById('elements')
var selectRectangle = document.getElementById('selectRectangle')
var selectEllipse = document.getElementById('selectEllipse')
var selectLine = document.getElementById('selectLine')
var MOUSE_LEFT = 0, MOUSE_RIGHT = 2
var x1 = 0, y1 = 0
var selectedElement = null
var figure
function setLine() { figure = 'line' }
function setCoordinatesLine(object, x1, y1, x2, y2) {
    object.setAttributeNS(null, 'x1', x1)
    object.setAttributeNS(null, 'y1', y1)
    object.setAttributeNS(null, 'x2', x2)
    object.setAttributeNS(null, 'y2', y2)
}
function setEllipse() { figure = 'ellipse' }
function setCoordinatesEllipse(object, x1, y1, x2, y2) {
    object.setAttributeNS(null, 'cx', (x1 + x2) / 2)
    object.setAttributeNS(null, 'cy', (y1 + y2) / 2)
    object.setAttributeNS(null, 'rx', (Math.max(x1, x2) - Math.min(x1, x2)) / 2)
    object.setAttributeNS(null, 'ry', (Math.max(y1, y2) - Math.min(y1, y2)) / 2)
}
function setRectangle() { figure = 'rectangle' }
function setCoordinatesRectangle(object, x1, y1, x2, y2) {
    object.setAttributeNS(null, 'x', Math.min(x1, x2))
    object.setAttributeNS(null, 'y', Math.min(y1, y2))
    object.setAttributeNS(null, 'width', Math.max(x1, x2) - Math.min(x1, x2))
    object.setAttributeNS(null, 'height', Math.max(y1, y2) - Math.min(y1, y2))
}
editor.onmousedown = function (e) {
    if (e.button == MOUSE_LEFT) {
        x1 = e.pageX - this.getBoundingClientRect().left
        y1 = e.pageY - this.getBoundingClientRect().top
        if (figure == 'line') {
            setCoordinatesLine(selectLine, x1, y1, x1, y1)
            selectLine.style.display = 'block'
            var stroke_color = document.getElementById('stroke_color').value
            selectLine.style.stroke = stroke_color
            selectLine.style.strokeWidth = stroke_width
        }
        if (figure == 'ellipse') {
            setCoordinatesEllipse(selectEllipse, x1, y1, x1, y1)
            selectEllipse.style.display = 'block'
            var background_color = document.getElementById('background_color').value
            selectEllipse.style.fill = background_color
            var stroke_color = document.getElementById('stroke_color').value
            selectEllipse.style.stroke = stroke_color
            var stroke_width = document.getElementById('stroke_width').value
            selectEllipse.style.strokeWidth = stroke_width
        }
        if (figure == 'rectangle') {
            setCoordinatesRectangle(selectRectangle, x1, y1, x1, y1)
            selectRectangle.style.display = 'block'
            var background_color = document.getElementById('background_color').value
            selectRectangle.style.fill = background_color
            var stroke_color = document.getElementById('stroke_color').value
            selectRectangle.style.stroke = stroke_color
            var stroke_width = document.getElementById('stroke_width').value
            selectRectangle.style.strokeWidth = stroke_width
        }
    }
}
editor.onmousemove = function (e) {
    x2 = e.pageX - this.getBoundingClientRect().left
    y2 = e.pageY - this.getBoundingClientRect().top
    setCoordinatesLine(selectLine, x1, y1, x2, y2)
    setCoordinatesEllipse(selectEllipse, x1, y1, x2, y2)
    setCoordinatesRectangle(selectRectangle, x1, y1, x2, y2)
}
editor.onmouseup = function (e) {
    if (e.button == MOUSE_LEFT) {
        x2 = e.pageX - this.getBoundingClientRect().left
        y2 = e.pageY - this.getBoundingClientRect().top
        selectLine.style.display = 'none'
        selectEllipse.style.display = 'none'
        selectRectangle.style.display = 'none'
        if (figure == 'rectangle') {
            newelement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            setCoordinatesRectangle(newelement, x1, y1, x2, y2)
            var background_color = document.getElementById('background_color').value
            newelement.setAttribute('fill', background_color)
            var stroke_color = document.getElementById('stroke_color').value
            newelement.setAttribute('stroke', stroke_color)
            var stroke_width = document.getElementById('stroke_width').value
            newelement.style.strokeWidth = stroke_width
        }
        if (figure == 'ellipse') {
            newelement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
            setCoordinatesEllipse(newelement, x1, y1, x2, y2)
            var background_color = document.getElementById('background_color').value
            newelement.setAttribute('fill', background_color)
            var stroke_color = document.getElementById('stroke_color').value
            newelement.setAttribute('stroke', stroke_color)
            var stroke_width = document.getElementById('stroke_width').value
            newelement.style.strokeWidth = stroke_width
        }
        if (figure == 'line') {
            newelement = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            setCoordinatesLine(newelement, x1, y1, x2, y2)
            var stroke_color = document.getElementById('stroke_color').value
            newelement.setAttribute('stroke', stroke_color)
            var stroke_width = document.getElementById('stroke_width').value
            newelement.style.strokeWidth = stroke_width
        }
        newelement.onmousedown = function (e) {
            if (e.button == MOUSE_RIGHT) {
                var childElements = document.querySelectorAll('#elements *')
                childElements.forEach(el => el.classList.remove('selected'))
                e.target.classList.add('selected')
                selectedElement = e.target
                var background_color = document.getElementById('background_color').value
                selectedElement.setAttribute('fill', background_color)
                var stroke_color = document.getElementById('stroke_color').value
                selectedElement.setAttribute('stroke', stroke_color)
                var stroke_width = document.getElementById('stroke_width').value
                selectedElement.style.strokeWidth = stroke_width
            }
        }
        elements.appendChild(newelement)
    }
}
editor.oncontextmenu = function () { return false }
document.onkeydown = function (e) {
    if (e.keyCode == 46 && selectedElement)
        selectedElement.remove();
}
function saveImage() {
    const canvas = document.createElement('canvas')
    const base64doc = btoa(unescape(encodeURIComponent(editor.outerHTML)))
    const w = parseInt(editor.getAttribute('width'))
    const h = parseInt(editor.getAttribute('height'))
    const img_to_download = document.createElement('img')
    img_to_download.src = 'data:image/svg+xml;base64,' +base64doc
    console.log(w,h)
    img_to_download.onload=function(){
        console.log('img loaded')
        canvas.setAttribute('width', w)
        canvas.setAttribute('height', h)
        const context = canvas.getContext('2d')
        context.drawImage(img_to_download,0,0,w,h)
        const dataURL = canvas.toDataURL('image/png')
        if(window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob(), 'download.png')
        } else {
            const a = document.createElement('a')
            const my_evt = new MouseEvent('click')
            a.download = 'download.png'
            a.href = dataURL
            a.dispatchEvent(my_evt)
        }
    }
}