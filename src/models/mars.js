import * as THREE from "three";
import marsTexture from "../../images/mars.jpg";

const createMars = () => {
  const texture = new THREE.TextureLoader().load(marsTexture);
  const geometry = new THREE.SphereGeometry(4.5, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    bumpMap: texture,
    map: texture,
    bumpScale: 0.1,
  });
  const mars = new THREE.Mesh(geometry, material);
  return mars;
};

export default createMars;
