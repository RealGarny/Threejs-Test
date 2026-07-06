varying vec2 vUv;
void main() {
  float resultColor = floor((1.0 - vUv.x) * 10.0) / 10.0;

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}