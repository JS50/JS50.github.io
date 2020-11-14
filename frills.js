const initialize = () => {
    window.canvas = new fabric.Canvas('jersey-print');

    resizeCanvas();

    canvas.setBackgroundImage('jerseycanvas.png', canvas.renderAll.bind(canvas), {
        originX: 'left',
        originY: 'top',
        left: -100,
        scaleX: '.4',
        scaleY: '.4'
    });

    window.jerseyName = new fabric.Text("Heinsch", {
        fill: '#ffffff',
        stroke: '#ff1318',
        strokeWidth: 1,
        fontSize: 32,
        angle: 5,
        fontFamily: 'Impact'
    });

    jerseyName.customCenter = {x: 486, y: 200};

    window.jerseyNumber = new fabric.Text("711", {
        fill: '#ffffff',
        stroke: '#ff1318',
        strokeWidth: 1,
        fontSize: 80,
        angle: 5,
        fontFamily: 'Impact'
    });

    jerseyNumber.customCenter = {x: 480, y: 263};

    positionElement(jerseyName);
    positionElement(jerseyNumber);

    canvas.setZoom(1);
    canvas.add(jerseyName);
    canvas.add(jerseyNumber);

    canvas.on('mouse:down', function(options) {
        console.log(options.e.clientX, options.e.clientY);
        console.log(jerseyName);
    });

    let canvasContainer = document.getElementsByClassName('canvas-container')[0];
    if (canvasContainer && 1200 - window.innerWidth > 0) {
        canvasContainer.style.marginLeft = '-' + (1200 - window.innerWidth).toString() + 'px';
    }

    document.getElementById('lastName').addEventListener('input', e => changeText(e, jerseyName));
    document.getElementById('changeNameWidth').addEventListener('input', (e) => changeWidth(e.target.value, jerseyName));
    document.getElementById('changeNameSize').addEventListener('input', (e) => changeFontSize(e.target.value, jerseyName));
    document.getElementById('changeNameStrokeWidth').addEventListener('input', (e) => changeStroke1Width(e.target.value, jerseyName));
    document.getElementById('nameFill').addEventListener('input', (e) => changeFill(e, jerseyName));
    document.getElementById('nameStrokeFill').addEventListener('input', (e) => changeStroke1Color(e, jerseyName));

    document.getElementById('number').addEventListener('input', e => changeText(e, jerseyNumber));
    document.getElementById('changeNumberWidth').addEventListener('input', (e) => changeWidth(e.target.value, jerseyNumber));
    document.getElementById('changeNumberSize').addEventListener('input', (e) => changeFontSize(e.target.value, jerseyNumber));
    document.getElementById('changeNumberStrokeWidth').addEventListener('input', (e) => changeStroke1Width(e.target.value, jerseyNumber));
    document.getElementById('numberFill').addEventListener('input', (e) => changeFill(e, jerseyNumber));
    document.getElementById('numberStrokeFill').addEventListener('input', (e) => changeStroke1Color(e, jerseyNumber));

};

const setCanvasProperties = (elements) => {
    elements.forEach(element => {
        element.style.position = 'absolute';
        element.style.top = '0';
        element.style.left = '0';
    })
}

const resizeCanvas = () => {
    const outerCanvasContainer = document.getElementsByClassName('bg-image')[0];
    const containerWidth   = outerCanvasContainer.clientWidth;
    const containerHeight  = outerCanvasContainer.clientHeight;

    const scale = containerWidth / canvas.getWidth();
    const zoom  = canvas.getZoom() * scale;

    canvas.setDimensions({height: containerHeight, width: containerHeight/9*16});
    canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
}

window.onresize = () => {
    let canvasContainer = document.getElementsByClassName('canvas-container')[0];
    if (canvasContainer && 1200 - window.innerWidth > 0) {
        canvasContainer.style.marginLeft = '-' + (1200 - window.innerWidth).toString() + 'px';
    }
}

const changeText = (e, element) => {
    const name = e.target.value;
    element.setText(name);
    positionElement(element);
}

const changeWidth = (val, element) => {
    element.setScaleX(val);
    positionElement(element);
}

const changeFontSize = (val, element) => {
    element.setFontSize(val);
    positionElement(element);
}

const changeFill = (e, element) => {
    element.setFill(e.target.value);
    positionElement(element);
}

const changeStroke1Color = (e, element) => {
    element.setStroke(e.target.value);
    positionElement(element);
}

const changeStroke1Width = (val, element) => {
    console.log(val);
    element.setStrokeWidth(val);
    positionElement(element);
}

const positionElement = (element) => {
    element.set({
        left: element.customCenter.x - element.width * element.scaleX / 2,
        top: element.customCenter.y - element.height / 2,
    });
    canvas.renderAll();
}

