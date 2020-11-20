import * as THREE from './threejs/three.module.js';
import {OBJLoader2} from './threejs/OBJLoader2.js';
import {MTLLoader} from './threejs/MTLLoader.js';
import {MtlObjBridge} from './threejs/MtlObjBridge.js';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
var camera = new THREE.PerspectiveCamera();
var cube = null
let helmet = null;
var container = document.querySelector('.techDemo');
var startTime	= Date.now();
var scrollY = 0;
var _event = {
    y: 0,
    deltaY: 0
};
var timeline = null
var percentage = 0

var divContainer = document.querySelector('.container')
var maxHeight = (divContainer.clientHeight || divContainer.offsetHeight) - window.innerHeight

const initThree = async () => {
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000);
    renderer.setClearAlpha(0);
    camera.position.y = 10;
    camera.position.z = 100;
    resize()
    container.appendChild(renderer.domElement);
    const skyColor = 0x000000;
    const groundColor = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
    //addCube()
    await loadHelmet();
}

// function addCube () {
//     cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), new THREE.MeshNormalMaterial() );
//     cube.position.y = 5
//     cube.position.z = -100
//     scene.add(cube);
// }

const loadHelmet = () => {
    const mtlLoader = new MTLLoader();
    return new Promise((resolve, reject) => {
        mtlLoader.load('threejs/helmet/6D ATR-2 - Scott Prospect1.mtl', (mtlParseResult) => {
            const objLoader = new OBJLoader2();
            const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
            objLoader.addMaterials(materials);
            objLoader.load('threejs/helmet/6D ATR-2 - Scott Prospect1.obj', (h) => {
                helmet = h;
                helmet.scale.x = 50;
                helmet.scale.y = 50;
                helmet.scale.z = 50;

                helmet.position.z = -15;
                helmet.position.x = -40;
                helmet.position.y = -5;

                helmet.rotation.y = 180;
                scene.add(helmet);
                resolve();
            }, (e) => {console.log('helmetprogress:', e.loaded/e.total)}, reject);
        }, (e) => {console.log('mtlprogress:', e.loaded/e.total)}, reject);
    })
}

function initTimeline() {
    timeline = anime.timeline({
        autoplay: false,
        duration: 4500,
        easing: 'easeOutSine'
    });
    timeline.add({
        targets: helmet.position,
        x: 100,
        y: 25,
        z: -50,
        duration: 2250,
        update: camera.updateProjectionMatrix()
    })
    timeline.add({
        targets: helmet.position,
        x: 0,
        y: 0,
        z: 50,
        duration: 2250,
        update: camera.updateProjectionMatrix()
    })
    // var value = new THREE.Color(0xFFFCFC)
    // var initial = new THREE.Color(0x161216)
    // timeline.add({
    //     targets: initial,
    //     r: [initial.r, value.r],
    //     g: [initial.g, value.g],
    //     b: [initial.b, value.b],
    //     duration: 4500,
    //     update: () => {
    //         renderer.setClearColor(initial);
    //     }
    // }, 0);
}
function animate() {
    // render the 3D scene
    render();
    // relaunch the 'timer'
    requestAnimationFrame( animate );
}

function render() {
    var dtime	= Date.now() - startTime;
    // easing with treshold on 0.08 (should be between .14 & .2 for smooth animations)
    percentage = lerp(percentage, scrollY, .08);
    timeline.seek(percentage * (4500 / maxHeight))
    renderer.render( scene, camera );
}
// linear interpolation function
function lerp(a, b, t) {
    return ((1 - t) * a + t * b);
}

const init = async () => {
    await initThree();
    initTimeline();
    window.addEventListener('resize', resize, { passive: true
    })
    divContainer.addEventListener('wheel', onWheel, { passive: false });
    animate()
}

function resize () {
    // cointainer height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
    maxHeight = (divContainer.clientHeight || divContainer.offsetHeight) - window.innerHeight
    renderer.width = container.clientWidth;
    renderer.height = container.clientHeight;
    renderer.setSize(renderer.width, renderer.height);
    camera.aspect = renderer.width / renderer.height;
    camera.updateProjectionMatrix();
}

function onWheel (e) {
    // for embedded demo
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();

    var evt = _event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // reduce by half the delta amount otherwise it scroll too fast
    evt.deltaY *= 0.5;

    scroll(e);
};

function scroll (e) {
    var evt = _event;
    // limit scroll top
    if ((evt.y + evt.deltaY) > 0 ) {
        evt.y = 0;
        // limit scroll bottom
    } else if ((-(evt.y + evt.deltaY)) >= maxHeight) {
        evt.y = -maxHeight;
    } else {
        evt.y += evt.deltaY;
    }
    scrollY = -evt.y
}

init()