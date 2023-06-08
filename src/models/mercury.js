import * as THREE from "three";
import mercuryTexture from "../../images/mercury.jpg";

const createMercury = () => {
  const texture = new THREE.TextureLoader().load(mercuryTexture);
  const geometry = new THREE.SphereGeometry(2, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.1,
  });
  const mercury = new THREE.Mesh(geometry, material);
  return mercury;
};

export default createMercury;
