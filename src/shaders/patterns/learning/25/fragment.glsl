varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 gridUv =
      vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x) * 10.0) / 10.0);

  float resultColor = rand(gridUv);

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}