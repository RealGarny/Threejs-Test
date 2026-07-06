varying vec2 vUv;
void main() {
  float resultColor = mod(vUv.y * 10.0, 1.0);
  gl_FragColor = vec4(vec3(resultColor), 1.0);
}