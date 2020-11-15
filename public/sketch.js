let socket
let color = '#000'
let strokeWidth = 4
let cv

function setup() {
    cv = createCanvas(windowWidth / 2.5, windowHeight / 2)
    centerCanvas()
    cv.background(255, 255, 255)

    socket = io.connect('http://localhost:3000')

    socket.on('mouse', data => {
        stroke(data.color)
        strokeWeight(data.strokeWidth)
        line(data.x, data.y, data.px, data.py)
    })

    const color_picker = select('#pickcolor')
    const color_btn = select('#color-btn')
    const color_holder = select('#color-holder')

    const stroke_width_picker = select('#stroke-width-picker')
    const stroke_btn = select('#stroke-btn')

    color_btn.mousePressed(() => {
        if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color_picker.value())) {
            color = color_picker.value()
            color_holder.style('background-color', color)
        } else {
            console.log('Enter a valid hex value')
        }
    })

    stroke_btn.mousePressed(() => {
        const width = parseInt(stroke_width_picker.value())
        if (width > 0) strokeWidth = width
    })
}

function windowResized() {
    centerCanvas()
    cv.resizeCanvas(windowWidth / 2, windowHeight / 2, false)
}


function centerCanvas() {
    const x = (windowWidth - width) / 2
    const y = (windowHeight - height) / 2
    cv.position(x, y)
}


function mouseDragged() {
    stroke(color)
    strokeWeight(strokeWidth)
    line(mouseX, mouseY, pmouseX, pmouseY)

    sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}

function sendmouse(x, y, pX, pY) {
    const data = {
        x: x,
        y: y,
        px: pX,
        py: pY,
        color: color,
        strokeWidth: strokeWidth,
    }

    socket.emit('mouse', data)
}