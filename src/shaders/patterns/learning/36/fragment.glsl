varying vec2 vUv;

void main() {
  float resultColor = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}