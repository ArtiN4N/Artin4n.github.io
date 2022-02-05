

let current = "Star";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // FOV, screen ratio, near clip, far clip

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.y = 100;
camera.position.z = 100;

camera.rotation.x = -Math.PI / 4;

controls = new THREE.OrbitControls( camera, renderer.domElement );

geometry = new THREE.SphereGeometry();
geometry2 = new THREE.SphereGeometry(2, 10, 10);
geometry3 = new THREE.SphereGeometry(2, 5, 5);
geometry4 = new THREE.SphereGeometry(2, 5, 5);
geometry5 = new THREE.SphereGeometry(2, 8, 6);
material = new THREE.MeshBasicMaterial({color: 0x533A71, wireframe: true}); // Hex color
material2 = new THREE.MeshBasicMaterial({color: 0x6184D8, wireframe: true}); // Hex color
material3 = new THREE.MeshBasicMaterial({color: 0x50C5B7, wireframe: true}); // Hex color

material4 = new THREE.MeshToonMaterial({color: 0x9CEC5B, wireframe: true}); // Hex color

material5 = new THREE.MeshPhongMaterial({color: 0x0095DD, wireframe: false}); // Hex color



sphereMAIN = new THREE.Mesh(geometry, material);
sphere2 = new THREE.Mesh(geometry2, material2);
sphere3 = new THREE.Mesh(geometry3, material3);
sphere4 = new THREE.Mesh(geometry4, material4);
sphere5 = new THREE.Mesh(geometry5, material5);



sphereMAIN.scale.x = 30;
sphereMAIN.scale.y = 30;
sphereMAIN.scale.z = 30;


sphere2.scale.x = 5;
sphere2.scale.y = 5;
sphere2.scale.z = 5;

scene.add(sphereMAIN);
scene.add(sphere2);
scene.add(sphere3);
//scene.add(sphere4);
//scene.add(sphere5);

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(-10, 15, 50);
scene.add(light);



time = 0;

function rLoop() { // Render loop
    requestAnimationFrame(rLoop);

    sphere2.position.x = -Math.cos(time * 0.5) * 61;
    //sphere2.position.y = Math.cos(time * 0.5) * 77 + Math.sin(time * 0.5) * 93;
    sphere2.position.z = -Math.sin(time * 0.5) * 85;

    sphere2.rotation.x = time / 5;
    sphere2.rotation.y = time / 2;
    sphere2.rotation.z = time / 4;

    sphere3.position.x = -Math.cos(time * 0.5) * 61 + Math.sin(time * 1) * 20;
    sphere3.position.y = -Math.cos(time * 1) * 30;
    sphere3.position.z = -Math.sin(time * 0.5) * 85;

    sphere3.rotation.x = time / 2;
    sphere3.rotation.y = time / 4;
    sphere3.rotation.z = time / 5;

    sphereMAIN.rotation.y = time * 0.1;

    var red = Math.round(Math.sin(0.20*time+0) * 115 + 140);
    var grn = Math.round(Math.sin(0.20*time+1) * 115 + 140);
    var blu = Math.round(Math.sin(0.20*time+2) * 115 + 140);

    sphereMAIN.material.color.set(new THREE.Color("rgb("+blu+", "+red+", "+grn+")"));

    sphere2.material.color.set(new THREE.Color("rgb("+red+", "+grn+", "+blu+")"));

    sphere3.material.color.set(new THREE.Color("rgb("+grn+", "+blu+", "+red+")"));

    //sphere2.setColor();

    //camera.rotation.z = -Math.sin(time);

    if (current == "Planet") {
        controls.target.set( -61 * Math.cos(time * 0.5), 50, -85 * Math.sin(time * 0.5) + 50);

        camera.rotation.x = -Math.PI / 4;        
        

        camera.position.x = -61 * Math.cos(time * 0.5);
        camera.position.y = 0 + 50;
        camera.position.z = -85 * Math.sin(time * 0.5) + 50;
    }
    if (current == "Moon") {
        controls.target.set(-Math.cos(time * 0.5) * 61 + Math.sin(time * 1) * 20, -Math.cos(time * 1) * 30 + 50, -Math.sin(time * 0.5) * 85 + 50);

        camera.rotation.x = -Math.PI / 4;        
        

        camera.position.x = -Math.cos(time * 0.5) * 61 + Math.sin(time * 1) * 20;
        camera.position.y = -Math.cos(time * 1) * 30 + 50;
        camera.position.z = -Math.sin(time * 0.5) * 85 + 50;
    }

    renderer.render(scene, camera);

    time += 0.05;

}

rLoop(); // No error testing, lol


var menu = document.getElementById("focus");
menu.addEventListener("change", changePerp);

function changePerp(event) {
    if (menu.value == "Star") {
        camera.position.x = 0;
        camera.position.y = 100;
        camera.position.z = 100;
        controls.target.set( 0, 0, 0 );
        camera.rotation.x = -Math.PI / 4;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    } else if (menu.value == "Planet") {
        camera.position.x = -61 * Math.cos(time * 0.5);
        camera.position.y = 0 + 50;
        camera.position.z = -85 * Math.sin(time * 0.5) + 50;

        camera.rotation.x = -Math.PI / 4;
        camera.rotation.y = 0;
        camera.rotation.z = 0;

        controls.target.set( -61 * Math.cos(time * 0.5), 0 + 50, -85 * Math.sin(time * 0.5) + 50);
    } else if (menu.value == "Moon") {
        camera.position.x = -Math.cos(time * 0.5) * 61 + Math.sin(time * 1) * 20;
        camera.position.y = -Math.cos(time * 1) * 30 + 50;
        camera.position.z = -Math.sin(time * 0.5) * 85 + 50;

        camera.rotation.x = -Math.PI / 4;
        camera.rotation.y = 0;
        camera.rotation.z = 0;

        controls.target.set(-Math.cos(time * 0.5) * 61 + Math.sin(time * 1) * 20, -Math.cos(time * 1) * 30 + 50, -Math.sin(time * 0.5) * 85 + 50);
    }
    current = menu.value;
}
