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
    this.url = ['assets/models/falling-paper.json'];
    this.createGroups();
    this.load();
  }
  
  onLoad(object) {
    let material = new THREE.MeshLambertMaterial( { 
      color: 0x00ff00, 
      morphTargets: true,
      side: THREE.DoubleSide 
    } );
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
    
    let tableGeo = new THREE.PlaneGeometry(100, 100, 2);
    let tableMat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0x000000,
      side: THREE.DoubleSide
    })
    this.table = new THREE.Mesh(tableGeo, tableMat);
    this.table.castShadow = true;
    this.table.receiveShadow = true;
    this.table.rotateX(-Math.PI/2);
    this.table.position.set(0, -1, 0);
    
    ThreeHub.scene.add(this.table);
    
  }
  
  createGroups(){
    
  }
  
  setup() {}
}