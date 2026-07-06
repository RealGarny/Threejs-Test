varying vec2 vUv;
void main() {
  float resultColor = abs(vUv.x - 0.5);
  gl_FragColor = vec4(vec3(resultColor), 1.0);
}