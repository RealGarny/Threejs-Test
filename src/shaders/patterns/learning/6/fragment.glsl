varying vec2 vUv;
void main() {
  float fraction = vUv.y * 10.0;
  gl_FragColor = vec4(vec3(fraction), 1.0);
}