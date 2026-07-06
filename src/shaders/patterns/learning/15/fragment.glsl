varying vec2 vUv;
void main() {
  float horizontalLine =
      step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));         // vertical exclusion
  horizontalLine *= step(0.4, mod(vUv.x * 10.0, 1.0)); // horizontal line length

  float verticalLine =
      step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));       // vertical exclusion
  verticalLine *= step(0.4, mod(vUv.y * 10.0, 1.0)); // vertical line length

  gl_FragColor = vec4(vec3(horizontalLine + verticalLine), 1.0);
}