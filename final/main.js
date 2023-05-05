//import three.js and required loaders
import * as THREE from 'three';
import * as TWEEN from "@tweenjs/tween.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

//set up scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFAEBD7); 
const camera = new THREE.PerspectiveCamera( 63, window.innerWidth / window.innerHeight, 0.001, 1000 );
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

//tween groups
const TWEEN_POSITION_GROUP = new TWEEN.Group();
const TWEEN_ROTATION_GROUP = new TWEEN.Group();

function init() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//load model
	loader.load('content/babylon.gltf', function (gltf) {
		scene.add( gltf.scene );
		gltf.animations; 
		gltf.scene; 
		gltf.scenes; 
		gltf.cameras;
		gltf.asset;
	}, undefined, function (error) {
		console.error(error);
	});
	
	//load hdri for lighting
	new RGBELoader()
	.load('content/hdri.hdr', function (texture) {
		texture.mapping = THREE.EquirectangularReflectionMapping;
		scene.environment = texture;
	} );

	camera.position.set(0.05, 0.05, 0.1)
	camera.rotation.set(0, 0, 0)
}

//camera position keyframes
const cameraKeyframes = [
    {
        position: new THREE.Vector3(0.05, 0.05, 0.1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    {
        position: new THREE.Vector3(-0.12, 0.025, 0.05),
        rotation: new THREE.Euler(-0, -0.5, 0)
    },
    {
        position: new THREE.Vector3(0, 0.05, 0),
        rotation: new THREE.Euler(-.01, -0.7, 0)
    },
    {
        position: new THREE.Vector3(0.05, 0.05, -0.23),
        rotation: new THREE.Euler(0.1,-1,0.1)
    }
];

let currentKeyframe = 0;

//text fading function
function updateTextOpacity() {
    const texts = ['text1', 'text2', 'text3', 'text4'];

    for (let i = 0; i < texts.length; i++) {
        const textElement = document.getElementById(texts[i]);

        if (i === currentKeyframe) {
            setTimeout(() => {
                textElement.classList.add('visible');
            }, 750);
        } else {
            textElement.classList.remove('visible');
        }
    }
}

//keyframing function
function goToKeyframe(keyframeIndex) {
    currentKeyframe = keyframeIndex;

    const currentPosition = camera.position.clone();
	const currentRotation = new THREE.Euler().copy(camera.rotation);
    const targetPosition = cameraKeyframes[currentKeyframe].position;
    const targetRotation = cameraKeyframes[currentKeyframe].rotation;

    new TWEEN.Tween(currentPosition)
        .to(targetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            camera.position.copy(currentPosition);
        })
        .start();

	new TWEEN.Tween(currentRotation)
		.to(targetRotation, 1000)
		.easing(TWEEN.Easing.Quadratic.Out)
		.onUpdate(() => {
			camera.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);
		})
		.start();
	
	updateTextOpacity();
}

//click event listeners
window.addEventListener('mousedown', function (event) {
    if (event.button === 0) { 
        if (currentKeyframe < cameraKeyframes.length - 1) {
            goToKeyframe(currentKeyframe + 1);
        }
    } else if (event.button === 2) { 
        if (currentKeyframe > 0) {
            goToKeyframe(currentKeyframe - 1);
        }
    }
});

//responsive function
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}

init();
animate();

//disable right clicking
window.addEventListener('contextmenu', function (event) {
    event.preventDefault();
}, false);
