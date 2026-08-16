#define PI 3.14

varying vec2 vUv;

// class perlin 2d noise

float cnoise(vec2 uv) {}

void main() {
  float circle =
      1.0 - smoothstep(0.012, 0.050, abs(distance(vUv, vec2(0.5)) - 0.25));

  gl_FragColor = vec4(vec3(circle), 1.0);
}