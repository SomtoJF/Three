import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const createSaturn = async () => {
  let saturn = null;
  const loader = new GLTFLoader();
  await loader.load(
    "../../models/saturn.glb",
    function (gltf) {
      saturn = gltf.scene;
      saturn.position.set(220, 0, 0);
      saturn.rotation.y = 180;
      saturn.scale.y = 0.1;
      saturn.scale.z = 0.1;
      saturn.scale.x = 0.1;
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  return saturn;
};

export default createSaturn;
