/**
 * Child class for falling paper creation
 */

/* globals THREE */

import ThreeGeometryFile from '../../framework/threeGeometryFile.es6';
import ThreeGroup from '../../framework/threeGroup.es6';
import ThreeHub from '../../framework/threeHub.es6';

export default class ThreeFallingPaper extends ThreeGeometryFile {
  constructor() {
    super();
    this.url = ['assets/models/cube.json'];
    this.createGroups();
    this.load();
  }
  
  onLoad(object, mat) {
    let material = mat[0];
    material.shininess = 1;
    material.reflectivity = 0.25;
    material.side = THREE.DoubleSide;
    material.morphTargets = true;
    this.paper = new THREE.Mesh(object, material);
    this.paper.castShadow = true;
    this.paper.receiveShadow = true;
    ThreeHub.scene.add(this.paper);
    
    this.mixer = new THREE.AnimationMixer(this.paper);
    let clip = THREE.AnimationClip.CreateFromMorphTargetSequence('fallingPaper', this.paper.geometry.morphTargets, 60);
    let action = new THREE.AnimationAction(clip, 0, 1, 1, THREE.LoopOnce);
    this.mixer.addAction(action);
    
    ThreeHub.scene.renderer.addRenderCallback('animation.paper', () => {
      this.mixer.update(ThreeHub.clock.getDelta());
    })
    
    let tableGeo = new THREE.PlaneGeometry(100, 100, 100);
    let tableMat = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      side: THREE.DoubleSide
    })
    this.table = new THREE.Mesh(tableGeo, tableMat);
    this.table.receiveShadow = true;
    this.table.rotateX(-Math.PI/2);
    this.table.position.set(0, -2, 0);
    
    ThreeHub.scene.add(this.table);
    
    // let cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    let cubeMat = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide
    })
    
    // let cube = new THREE.Mesh(cubeGeo, cubeMat);
    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // cube.position.set(0, 1, 0);
    
    // ThreeHub.scene.add(cube);
    
    // let planeGeo = new THREE.BoxGeometry(1.5, 1.5, 0.001);
    // // let planeGeo = new THREE.PlaneGeometry(1.5, 1.5, 20);
    
    // let plane = new THREE.Mesh(planeGeo, cubeMat);
    // plane.castShadow = true;
    // plane.receiveShadow = true;
    // plane.position.set(0, 2, 0);
    // plane.rotateX(-Math.PI/2);
    
    // ThreeHub.scene.add(plane);
    
  }
  
  createGroups(){
    
  }
  
  setup() {}
}