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

    window.jerseyName = new fabric.IText("Heinsch", {
        fill: '#ffffff',
        stroke: '#ff1318',
        strokeWidth: 4,
        fontSize: 32,
        angle: 5,
        fontFamily: 'Impact',
        paintFirst: 'stroke',
        borderColor: '#07c900',
        borderWidth: 12,
        cornerStyle: 'circle',
        cornerColor: '#07c900',
    });

    jerseyName.customCenter = {x: 486, y: 200};

    jerseyName.setControlsVisibility({
        mtr: false
    });

    window.jerseyNumber = new fabric.IText("711", {
        fill: '#ffffff',
        stroke: '#ff1318',
        strokeWidth: 4,
        fontSize: 80,
        angle: 5,
        fontFamily: 'Impact',
        paintFirst: 'stroke',
        textAlign: 'center',
        borderColor: '#07c900',
        borderWidth: 12,
        cornerStyle: 'circle',
        cornerColor: '#07c900',
    });

    jerseyNumber.customCenter = {x: 480, y: 263};

    jerseyNumber.setControlsVisibility({
        mtr: false
    });

    positionElement(jerseyName);
    positionElement(jerseyNumber);

    canvas.setZoom(1);
    canvas.add(jerseyName).setActiveObject(jerseyName);
    canvas.add(jerseyNumber);

    canvas.on('mouse:down', function(options) {
        console.log(options.e.clientX, options.e.clientY);
        console.log(jerseyName);
    });

    let canvasContainer = document.getElementsByClassName('canvas-container')[0];
    if (canvasContainer && 1200 - window.innerWidth > 0) {
        canvasContainer.style.marginLeft = '-' + (1200 - window.innerWidth).toString() + 'px';
    }spacing

    document.getElementById('spacing').addEventListener('input', (e) => alterObject('charSpacing', e.target.value));
    document.getElementById('strokeWidth').addEventListener('input', (e) => alterObject('strokeWidth', e.target.value));
    document.getElementById('textFill').addEventListener('input', (e) => alterObject('fill', e.target.value));
    document.getElementById('strokeFill').addEventListener('input', (e) => alterObject('stroke', e.target.value));
    document.getElementById('font').addEventListener('change', (e) => changeFont(e));
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

const changeFont = (e) => {
    const font = e.target.value;
    let myfont = new FontFaceObserver(font)
    myfont.load()
        .then(function() {
            canvas.getActiveObject().set("fontFamily", font);
            canvas.renderAll();
        }).catch(function(e) {
        console.log(e)
    });
}

const alterObject = (attribute, val) => {
    if (canvas.getActiveObject()) {
        canvas.getActiveObject().set(attribute, val);
        canvas.renderAll();
    }
}

const positionElement = (element) => {
    element.set({
        left: element.customCenter.x - element.width * element.scaleX / 2,
        top: element.customCenter.y - element.height / 2,
    });
    canvas.renderAll();
}

