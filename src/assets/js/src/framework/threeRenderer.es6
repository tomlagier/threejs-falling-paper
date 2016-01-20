/**
 * Contains renderer options
 */

/* global THREE, _*/
import ThreeHub from '../framework/threeHub.es6';

export default class ThreeRenderer {
  constructor(options = {
    antialias: true,
    autoClear: false,
    sortObjects: false,
    alpha: false,
    gammaInput: true,
    gammaOutput: true,
    precision: 'highp',
    clearAlpha: 0
  }) {

    this.WebGLRenderer = new THREE.WebGLRenderer(options);
    this.WebGLRenderer.shadowMap.enabled = true;
    // this.WebGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.WebGLRenderer.setSize(window.innerWidth, window.innerHeight);
    this.WebGLRenderer.setClearColor(0x000000, 1);
    this.WebGLRenderer.setPixelRatio(window.devicePixelRatio);

    _.extend(this.WebGLRenderer, options);

    this.callbacks = {};
  }

  setup() {
    ThreeHub.$el.append(this.WebGLRenderer.domElement);
  }

  addRenderCallback(name, func) {
    this.callbacks[name] = func;
  }

  removeRenderCallback(name) {
    delete this.callbacks[name];
  }

  renderFrame(scene, camera, ...args) {
    _.each(this.callbacks, callback => callback());
    this.WebGLRenderer.render(scene, camera, ...args);
  }
}
