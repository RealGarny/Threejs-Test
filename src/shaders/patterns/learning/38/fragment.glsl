varying vec2 vUv;

void main() {
  vec2 wavedUV =
      vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1);
  float resultColor =
      1.0 - step(0.01, abs(distance(wavedUV, vec2(0.5)) - 0.25));

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}