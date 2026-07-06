varying vec2 vUv;
void main() {
  float resultColor = 1.0 - vUv.x;
  vec4 color = vec4(vec3(resultColor), 1.0);
  gl_FragColor = color;
}