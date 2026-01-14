let scene, camera, renderer, vrm;
let speaking = false;

init();
loadVRM();
setupSpeech();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.4, 2.2);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  animate();
}

function loadVRM() {
  const loader = new THREE.VRMLoader();

  loader.load(
    "https://cdn.jsdelivr.net/gh/pixiv/three-vrm@2.0.0/examples/models/vrm/AliciaSolid.vrm",
    (vrmLoaded) => {
      vrm = vrmLoaded;
      scene.add(vrm.scene);
      vrm.scene.rotation.y = Math.PI;
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  if (vrm && speaking) {
    const v = Math.random() * 0.6;
    vrm.expressionManager.setValue("aa", v);
  } else if (vrm) {
    vrm.expressionManager.setValue("aa", 0);
  }

  renderer.render(scene, camera);
}
