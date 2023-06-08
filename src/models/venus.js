import * as THREE from "three";
import venusTexture from "../../images/venus.jpg";
import venusAtmosphereTexture from "../../images/venus_atmosphere.jpg";

const createVenus = () => {
  const texture = new THREE.TextureLoader().load(venusTexture);
  const atmosphereTexture = new THREE.TextureLoader().load(
    venusAtmosphereTexture
  );
  const geometry = new THREE.SphereGeometry(2.5, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    bumpMap: texture,
    map: atmosphereTexture,
    bumpScale: 0.1,
  });
  const venus = new THREE.Mesh(geometry, material);
  return venus;
};

export default createVenus;
