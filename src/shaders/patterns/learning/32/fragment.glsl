#define PI 3.14

varying vec2 vUv;

vec2 rotateUV(vec2 uv, float rotation, vec2 mid) {
  return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main() {
  vec2 rotatedUv = rotateUV(vUv, PI * 0.25, vec2(0.5));
  float colorX =
      0.2 /
      distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5));
  float colorY =
      0.2 /
      distance(vec2((rotatedUv.x - 0.5) * 5.0 + 0.5, rotatedUv.y), vec2(0.5));

  float resultColor = colorX * colorY;

  gl_FragColor = vec4(vec3(resultColor), 1.0);
}