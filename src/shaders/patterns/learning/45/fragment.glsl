#define PI 3.14

varying vec2 vUv;

void main() {
  float sinusoid = atan(vUv.x - 0.5, vUv.y - 0.5);
  sinusoid /= PI * 2.0;
  sinusoid += 0.5;
  sinusoid = sin(sinusoid * 100.0) * 0.02;
  float radius = 0.25 + sinusoid;
  float circle = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

  gl_FragColor = vec4(vec3(circle), 1.0);
}