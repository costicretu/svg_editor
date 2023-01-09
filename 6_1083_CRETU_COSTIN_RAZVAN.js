var editor = document.getElementById('editor')
var elements = document.getElementById('elements')
var selectRectangle = document.getElementById('selectRectangle')
var selectEllipse = document.getElementById('selectEllipse')
var selectLine = document.getElementById('selectLine')
var MOUSE_LEFT = 0, MOUSE_RIGHT = 2 //variabile pentru detectarea click-ului de stanga si dreapta 
var x1 = 0, y1 = 0 // variabile coordonate pentru mouse down x1 si y1
var selectedElement = null // variabila selectare element presetata pe null 
var figure // variabila pentru setarea elementului ce va fi desenenat 
document.getElementById('styling').style.display = 'none' //ascundere zona stilizare cand nu este selectat niciun element 
document.getElementById('operations').style.display = 'none' //ascundere zona operatiuni export editor svg 
function setLine() { // afisare elemente stilizare si distingere a selectarii butonului pentru desenarea liniei
    figure = 'line' 
    document.getElementById('styling').style.display = 'block'
    document.getElementById('background_color').style.display = 'none'
    document.getElementById('background').style.display = 'none'
    document.getElementById('btnLine').style.opacity = '1'
    document.getElementById('btnEllipse').style.opacity = '0.6'
    document.getElementById('btnRectangle').style.opacity = '0.6'
}
function setCoordinatesLine(object, x1, y1, x2, y2) { //setare coordonate linie initiale
    object.setAttributeNS(null, 'x1', x1)
    object.setAttributeNS(null, 'y1', y1)
    object.setAttributeNS(null, 'x2', x2)
    object.setAttributeNS(null, 'y2', y2)
}
function setEllipse() { // afisare elemente stilizare si distingere a selectarii butonului pentru desenarea elipsei
    figure = 'ellipse'
    document.getElementById('styling').style.display = 'block'
    document.getElementById('background_color').style.display = 'inline-block'
    document.getElementById('background').style.display = 'inline-block'
    document.getElementById('btnLine').style.opacity = '0.6'
    document.getElementById('btnEllipse').style.opacity = '1'
    document.getElementById('btnRectangle').style.opacity = '0.6'
}
function setCoordinatesEllipse(object, x1, y1, x2, y2) { // setare coordonate elipsa initiale
    object.setAttributeNS(null, 'cx', (x1 + x2) / 2)
    object.setAttributeNS(null, 'cy', (y1 + y2) / 2)
    object.setAttributeNS(null, 'rx', (Math.max(x1, x2) - Math.min(x1, x2)) / 2)
    object.setAttributeNS(null, 'ry', (Math.max(y1, y2) - Math.min(y1, y2)) / 2)
}
function setRectangle() { // afisare elemente stilizare si distingere a selectarii butonului pentru desenarea dreptunghiului
    figure = 'rectangle'
    document.getElementById('styling').style.display = 'block'
    document.getElementById('background_color').style.display = 'inline-block'
    document.getElementById('background').style.display = 'inline-block'
    document.getElementById('btnLine').style.opacity = '0.6'
    document.getElementById('btnEllipse').style.opacity = '0.6'
    document.getElementById('btnRectangle').style.opacity = '1'
}
function setCoordinatesRectangle(object, x1, y1, x2, y2) { // setare coordonate dreptunghi initiale
    object.setAttributeNS(null, 'x', Math.min(x1, x2))
    object.setAttributeNS(null, 'y', Math.min(y1, y2))
    object.setAttributeNS(null, 'width', Math.max(x1, x2) - Math.min(x1, x2))
    object.setAttributeNS(null, 'height', Math.max(y1, y2) - Math.min(y1, y2))
}
editor.onmousedown = function (e) { //ce se intampla atunci cand dorim sa desenam 
    if (e.button == MOUSE_LEFT) { //daca am apasat click stanga
        x1 = e.pageX - this.getBoundingClientRect().left //scadem din valoarea intreaga a paginii web iar getBoundingClientRect inseamna de unde incepe partea de desenare a elementului (stanga sus)
        y1 = e.pageY - this.getBoundingClientRect().top //aceasta diferenta are loc pentru a afla coordonatele unde dorim sa desenam
        if (figure == 'line') { //daca am selectat desenarea liniei
            setCoordinatesLine(selectLine, x1, y1, x1, y1) //actualizam coordonatele liniei
            selectLine.style.display = 'block' //afisam optiuni stilizare linie
            var stroke_color = document.getElementById('stroke_color').value //pentru schimbarea culorii liniei
            selectLine.style.stroke = stroke_color //pentru schimbarea grosimii liniei
            selectLine.style.strokeWidth = stroke_width 
        }
        if (figure == 'ellipse') { //daca am selectat desenenarea elipsei
            setCoordinatesEllipse(selectEllipse, x1, y1, x1, y1) //actualizam coordonatele elipsei
            selectEllipse.style.display = 'block' //afisam optiuni stilizare elipsa
            var background_color = document.getElementById('background_color').value //pentru schimbarea culorii de fundal a elipsei
            selectEllipse.style.fill = background_color
            var stroke_color = document.getElementById('stroke_color').value //pentru schimbarea culorii liniei elipsei
            selectEllipse.style.stroke = stroke_color
            var stroke_width = document.getElementById('stroke_width').value //pentru schimbarea grosimii liniei elipsei
            selectEllipse.style.strokeWidth = stroke_width
        }
        if (figure == 'rectangle') { //daca am selectat desenenarea dreptunghiului 
            setCoordinatesRectangle(selectRectangle, x1, y1, x1, y1) //actualizam coordonatele dreptunghiului
            selectRectangle.style.display = 'block' ///afisam optiuni stilizare dreptunghi
            var background_color = document.getElementById('background_color').value //pentru schimbarea culorii de fundal a dreptunghiului
            selectRectangle.style.fill = background_color
            var stroke_color = document.getElementById('stroke_color').value  //pentru schimbarea culorii liniei dreptunghiului
            selectRectangle.style.stroke = stroke_color
            var stroke_width = document.getElementById('stroke_width').value //pentru schimbarea grosimii liniei dreptunghiului
            selectRectangle.style.strokeWidth = stroke_width
        }
    }
}
editor.onmousemove = function (e) { //adaptam coordonatele unde dorim sa desenam atunci cand miscam mouse-ul intr-o anumita pozitie
    x2 = e.pageX - this.getBoundingClientRect().left
    y2 = e.pageY - this.getBoundingClientRect().top
    setCoordinatesLine(selectLine, x1, y1, x2, y2)
    setCoordinatesEllipse(selectEllipse, x1, y1, x2, y2)
    setCoordinatesRectangle(selectRectangle, x1, y1, x2, y2)
}
function changeStrokeColorNE() { //schimbarea culorii liniei noului element ce dorim sa il desenam sau a elementului selectat
    var stroke_color = document.getElementById('stroke_color').value
    newelement.setAttribute('stroke', stroke_color)
}
function changeStrokeWidthNE() { //schimbarea grosimii liniei noului element ce dorim sa il desenam sau a elementului selectat
    var stroke_width = document.getElementById('stroke_width').value
    newelement.style.strokeWidth = stroke_width
}
function changeBackgroundColorNE() { //schimbarea culorii fundalului noului element ce dorim sa il desenam sau a elementului selectat
    var background_color = document.getElementById('background_color').value
    newelement.setAttribute('fill', background_color)
}
editor.onmouseup = function (e) { //pentru a putea desena mai multe elemente am setat optiunile respective
    if (e.button == MOUSE_LEFT) {
        x2 = e.pageX - this.getBoundingClientRect().left
        y2 = e.pageY - this.getBoundingClientRect().top
        selectLine.style.display = 'none'
        selectEllipse.style.display = 'none'
        selectRectangle.style.display = 'none'
        if (figure == 'line') {
            newelement = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            setCoordinatesLine(newelement, x1, y1, x2, y2)
            changeStrokeColorNE()
            changeStrokeWidthNE()
        }
        if (figure == 'ellipse') {
            newelement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
            setCoordinatesEllipse(newelement, x1, y1, x2, y2)
            changeBackgroundColorNE()
            changeStrokeColorNE()
            changeStrokeWidthNE()
        }
        if (figure == 'rectangle') {
            newelement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            setCoordinatesRectangle(newelement, x1, y1, x2, y2)
            changeBackgroundColorNE()
            changeStrokeColorNE()
            changeStrokeWidthNE()
        }
        newelement.onmousedown = function (e) { //atunci cand vrem sa selectam un element pentru a il sterge sau modifica
            if (e.button == MOUSE_RIGHT) { //daca am apasat click dreapta 
                var childElements = document.querySelectorAll('#elements *') //
                childElements.forEach(el => el.classList.remove('selected')) //stergem clasa selectare pentru a putea distinge ce element am selectat
                e.target.classList.add('selected')
                selectedElement = e.target
                var background_color = document.getElementById('background_color').value //schimbarea culorii de fundal a elementului selectat
                selectedElement.setAttribute('fill', background_color)
                var stroke_color = document.getElementById('stroke_color').value //schimbarea culorii liniei a elementului selectat
                selectedElement.setAttribute('stroke', stroke_color)
                var stroke_width = document.getElementById('stroke_width').value //schimbarea grosimii liniei elementului selectat
                selectedElement.style.strokeWidth = stroke_width
            }
        }
        elements.appendChild(newelement)
        document.getElementById('operations').style.display = 'block'
    }
}
editor.oncontextmenu = function () { return false } //pentru a scapa de context menu implicit in scopul selectarii elementului
document.onkeydown = function (e) {
    if (e.keyCode == 46 && selectedElement) { //pentru a sterge elementul selectat trebuie sa apasam tasta delete 
        selectedElement.remove();
    }
    if (e.keyCode == 27) { // pentru a nu mai desena nimic se vor ascunde optiunile de stilizare a elementului 
        figure = null;
        document.getElementById('btnLine').style.opacity = '1'
        document.getElementById('btnEllipse').style.opacity = '1'
        document.getElementById('btnRectangle').style.opacity = '1'
        document.getElementById('styling').style.display = 'none'
    }
}
function saveImage() { //salvare svg in format png
    var canvas = document.createElement('canvas') //se utilizeaza elementul canvas
    var base64 = btoa(decodeURIComponent(encodeURI(editor.outerHTML))) //codificarea continutului editorului svg de tip binar intr-un format de tip ascii
    var w = Number(editor.getAttribute('width')) //preluare latime editor svg
    var h = Number(editor.getAttribute('height')) //preluare lungime editor svg
    var img = document.createElement('img') //creare imagine ce va fi desenata pe canvas
    img.src = 'data:image/svg+xml;base64,' + base64 //setare sursa imagine 
    img.onload = () => { //dupa ce s-a incarcat imaginea
        canvas.setAttribute('width', w) //setare latime canvas cu latimea editorului svg 
        canvas.setAttribute('height', h) //setare lungime canvas cu latimea editorului svg
        var context = canvas.getContext('2d') //creare context pentru a desena imaginea pe canvas
        context.drawImage(img, 0, 0, w, h)
        var link = document.createElement('a') //creare link pentru a putea descarca imaginea
        link.download = 'svg.png' //nume implicit svg in format png 
        link.href = canvas.toDataURL('image/png') // referinta legatura prin sursa canvas-ului de tip imagine
        link.click() //setare mouse event de tip click pe legatura
    }
}
function saveSVG() {
    var base64 = btoa(decodeURIComponent(encodeURI(editor.outerHTML))) //codificarea continutului editorului svg de tip binar intr-un format de tip ascii
    var link = document.createElement('a') //creare link pentru a putea descarca svg
    link.download = 'svg.svg'; //nume implicit svg in format svg 
    link.href = 'data:image/svg+xml;base64,' + base64; // referinta legatura sursa format base64
    link.click() //setare mouse event de tip click pe legatura
}