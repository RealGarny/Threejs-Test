varying vec2 vUv;
void main() {
  float resultColor =
      step(0.9, 1.0 - mod(vUv.y * 10.0, 1.0));      // horizontal axis
  resultColor *= step(0.9, mod(vUv.x * 10.0, 1.0)); // vertical axis
  gl_FragColor = vec4(vec3(resultColor), 1.0);
}