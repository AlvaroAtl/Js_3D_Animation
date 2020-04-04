// Setup variables
let container;
let camera;
let renderer;
let scene;
let car;

function init() {
    container = document.querySelector('.scene');

    // Create scene
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    // Camera Setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 32);

    // Lighting
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 350);
    scene.add(directionalLight);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Load model
    let loader = new THREE.GLTFLoader();
    loader.load('../3d/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        car = gltf.scene.children[0];
        animate();
    })
}

function animate() {
    requestAnimationFrame(animate);
    car.rotation.z += 0.005;
    renderer.render(scene, camera);
}

init();

function onWindowResize() {
    camera.aspect = container.clientHeight / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth / container.clientHeight);
}

window.addEventListener("resize", onWindowResize);