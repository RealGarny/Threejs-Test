varying vec2 vUv;

void main() {
  float resultColor = length(vUv);

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}