varying vec2 vUv;

void main() {
  float resultColor = step(0.3, distance(vUv, vec2(0.5))) - 0.3;

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}