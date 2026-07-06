varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float resultColor = rand(floor(vUv * 20.0) / 20.0);

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}