varying vec2 vUv;
void main() {
  float resultColor = vUv.y;
  gl_FragColor = vec4(vec3(resultColor), 1.0);
}