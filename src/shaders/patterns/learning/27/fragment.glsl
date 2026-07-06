varying vec2 vUv;

void main() {
  float resultColor = distance(vUv, vec2(0.5));

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}