varying vec2 vUv;

void main() {
  float resultColor = abs(distance(vUv, vec2(0.5)) - 0.25);

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}