varying vec2 vUv;

void main() {
  float resultColor = atan(vUv.x, vUv.y);

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}