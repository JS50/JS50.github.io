import * as THREE from './threejs/three.module.js';
import {OBJLoader2} from './threejs/OBJLoader2.js';
import {MTLLoader} from './threejs/MTLLoader.js';
import {MtlObjBridge} from './threejs/MtlObjBridge.js';
/*
Shoutout to Renaud Rohlinger for his awesome
blog post about the setup of a three js scene
with scroll based animations!
https://codeburst.io/scroll-based-animate-timeline-with-easing-functions-on-a-webgl-scene-ef7c3f5a8d9b
*/

let canvas = document.querySelector('.techDemo');
let textWrapper = document.querySelector('.textWrapper');
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
let camera = new THREE.PerspectiveCamera();
let ambientLight;
let directionalLight;
let helmet = null;

//animations
let timelineHelmetMovement = null;
let timelineHelmetRotation = null;
let timelineText = null;
let timelineAmbientLight = null;
let timelineDirectionalLight = null;
let timelineBackground = null;

//scroll percentage
let scrollY = 0;
let _event = {
    y: 0,
    deltaY: 0
};
let scrollPercentage = 0;
let divContainer = document.querySelector('.content')
let maxHeight = (divContainer.clientHeight || divContainer.offsetHeight) - window.innerHeight

const initThree = async () => {
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000);
    renderer.setClearAlpha(0);
    camera.position.y = 10;
    camera.position.z = 100;
    resize();
    canvas.appendChild(renderer.domElement);
    await loadHelmet();
    initLights();
}

const initLights = () => {
    ambientLight = new THREE.HemisphereLight(0x000000, 0xFFFFFF, 1);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight( 0x981212, 0 );
    directionalLight.target = helmet;
    scene.add( directionalLight );
}

const loadHelmet = () => {
    //LoadingManagaer is needed so a half loaded helmet won't be displayed
    const loadingManager = new THREE.LoadingManager( function () {
        scene.add(helmet);
    }, (url, itemsLoaded, itemsTotal) => console.log('Loaded objects: ' + itemsTotal + '/' + itemsLoaded));

    return loadHelmetMTL(loadingManager);
}

const loadHelmetModel = (mtlParseResult, loadingManager, resolve, reject) => {
    const objLoader = new OBJLoader2(loadingManager);
    const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    objLoader.addMaterials(materials);
    objLoader.load(
        'threejs/helmet/6D ATR-2 - Scott Prospect1.obj',
        (h) => {
            h = setInitialHelmetPosition(h);
            helmet = h;
            resolve();
        },
        (e) => {console.log('Helmet Loading Progress:', e.loaded/e.total)},
        reject
    );
}

const loadHelmetMTL = (loadingManager) => {
    const mtlLoader = new MTLLoader(loadingManager);
    return new Promise((resolve, reject) => {
        mtlLoader.load(
            'threejs/helmet/6D ATR-2 - Scott Prospect1.mtl',
            (mtlParseResult) => {
                loadHelmetModel(mtlParseResult, loadingManager, resolve, reject)
            },
            (e) => {console.log('Material Loading Process:', e.loaded/e.total)},
            reject
        );
    })
}

const setInitialHelmetPosition = (h) => {
    h.scale.x = 50;
    h.scale.y = 50;
    h.scale.z = 50;

    h.position.x = -40;
    h.position.y = -5;
    h.position.z = -15;

    h.rotation.y = 180;
    return h;
}

const initTimeline = () => {
    //TODO Refactoring
    timelineHelmetMovement = anime.timeline({
        autoplay: false,
        duration: 4500,
        easing: 'easeOutSine'
    });

    timelineHelmetMovement.add({
        targets: helmet.position,
        x: 50,
        y: -7,
        z: -15,
        duration: 2250,
        update: camera.updateProjectionMatrix()
    })
    timelineHelmetMovement.add({
        targets: helmet.position,
        x: -60,
        y: -10,
        z: 32,
        duration: 4500,
        update: camera.updateProjectionMatrix()
    })

    timelineHelmetRotation = anime.timeline({
        autoplay: false,
        duration: 4500,
        easing: 'easeOutSine'
    });
    timelineHelmetRotation.add({
        targets: helmet.rotation,
        y: 177.49,
        z: .1,
        duration: 2250,
        update: camera.updateProjectionMatrix()
    })
    timelineHelmetRotation.add({
        targets: helmet.rotation,
        y: 171.21,
        z: 0,
        x: -0.1,
        duration: 4500,
        update: camera.updateProjectionMatrix()
    })

    timelineText = anime.timeline({
        autoplay: false,
        duration: 4500,
        easing: 'easeOutSine'
    });
    timelineText.add({
        targets: textWrapper,
        translateY: '-100vh',
        duration: 2250,
        update: camera.updateProjectionMatrix()
    })
    timelineText.add({
        targets: textWrapper,
        translateY: '-240vh',
        duration: 4500,
        update: camera.updateProjectionMatrix()
    });

    timelineDirectionalLight = anime.timeline({
        autoplay: false,
        duration: 4500,
        easing: 'easeOutSine'
    });
    timelineDirectionalLight.add({
        targets: directionalLight,
        intensity: '0',
        duration: 2250,
        update: camera.updateProjectionMatrix()
    });
    timelineDirectionalLight.add({
        targets: directionalLight,
        intensity: '.25',
        duration: 4500,
        update: camera.updateProjectionMatrix()
    });

    timelineAmbientLight = anime.timeline({
        autoplay: false,
        duration: 4500,
        easing: 'easeOutSine'
    });
    timelineAmbientLight.add({
        targets: ambientLight,
        intensity: '1',
        duration: 2250,
        update: camera.updateProjectionMatrix()
    });
    timelineAmbientLight.add({
        targets: ambientLight,
        intensity: '0',
        duration: 4500,
        update: camera.updateProjectionMatrix()
    });

    timelineBackground = anime.timeline({
        autoplay: false,
        duration: 4500,
        easing: 'easeOutSine'
    });
    timelineBackground.add({
        targets: canvas,
        background: 'rgb(0,0,0)',
        delay: 2250,
        duration: 2250,
        update: camera.updateProjectionMatrix()
    });
}
function animate() {
    // render the 3D scene
    render();
    // relaunch the 'timer'
    requestAnimationFrame( animate );
}

function render() {
    // easing with treshold on 0.08 (should be between .14 & .2 for smooth animations)
    scrollPercentage = lerp(scrollPercentage, scrollY, .08);

    // helmet.rotation.y = percentage * (.45 / maxHeight);
    //TODO refactoring
    timelineHelmetMovement.seek(scrollPercentage * (4500 / maxHeight))
    timelineHelmetRotation.seek(scrollPercentage * (4500 / maxHeight))
    timelineText.seek(scrollPercentage * (4500 / maxHeight))
    timelineAmbientLight.seek(scrollPercentage * (4500 / maxHeight))
    timelineDirectionalLight.seek(scrollPercentage * (4500 / maxHeight))
    timelineBackground.seek(scrollPercentage * (4500 / maxHeight))
    renderer.render( scene, camera );
}

// linear interpolation function
const lerp = (a, b, t) => {
    return ((1 - t) * a + t * b);
}

const init = async () => {
    await initThree();
    initTimeline();
    window.addEventListener('resize', resize, { passive: true });
    divContainer.addEventListener('wheel', onWheel, { passive: false });
    animate();
}

const resize = () => {
    // cointainer height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
    maxHeight = (divContainer.clientHeight || divContainer.offsetHeight) - window.innerHeight
    renderer.width = canvas.clientWidth;
    renderer.height = canvas.clientHeight;
    renderer.setSize(renderer.width, renderer.height);
    camera.aspect = renderer.width / renderer.height;
    camera.updateProjectionMatrix();
}

function onWheel (e) {
    // for embedded demo
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();

    let evt = _event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // reduce by half the delta amount otherwise it scroll too fast
    evt.deltaY *= 0.5;

    scroll(e);
}

const scroll = () => {
    let evt = _event;
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

init();