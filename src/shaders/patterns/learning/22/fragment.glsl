varying vec2 vUv;
void main() {
  float flooredGradientX = floor((1.0 - vUv.x) * 10.0) / 10.0;
  float flooredGradientY = floor((vUv.y) * 10.0) / 10.0;
  float resultColor = flooredGradientX * flooredGradientY;

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}