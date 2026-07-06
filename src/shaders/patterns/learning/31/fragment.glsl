varying vec2 vUv;

void main() {
  float colorX =
      0.2 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5));
  float colorY =
      0.2 / distance(vec2((vUv.x - 0.5) * 5.0 + 0.5, vUv.y), vec2(0.5));

  float resultColor = colorX * colorY;

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}