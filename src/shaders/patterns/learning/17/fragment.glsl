varying vec2 vUv;
void main() {
  float resultColor = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  gl_FragColor = vec4(vec3(resultColor), 1.0);
}