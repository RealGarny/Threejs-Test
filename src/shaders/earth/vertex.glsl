varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = modelPosition.xyz;
  vUv = uv;
}