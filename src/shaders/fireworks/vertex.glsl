// MAX_FIREWORKS comes from defines

uniform vec2 uResolution;
uniform float uTime;
uniform float uDuration;

uniform vec3 uOrigin[MAX_FIREWORKS];
uniform vec3 uColor[MAX_FIREWORKS];
uniform float uStartTime[MAX_FIREWORKS];
uniform float uRadius[MAX_FIREWORKS];
uniform float uSize[MAX_FIREWORKS];
uniform float uTextureIndex[MAX_FIREWORKS];

in float aSize;
in float aTimeMultiplier;
in float aFirework;

out vec3 vColor;
out float vTextureIndex;

float remap(float value, float originMin, float originMax, float destinationMin,
            float destinationMax) {
  return destinationMin + (value - originMin) *
                              (destinationMax - destinationMin) /
                              (originMax - originMin);
}

float remapc(float value, float originMin, float originMax,
             float destinationMin, float destinationMax) {
  float remapped =
      remap(value, originMin, originMax, destinationMin, destinationMax);
  return clamp(remapped, min(destinationMin, destinationMax),
               max(destinationMin, destinationMax));
}

float easeOutCubic(float x) { return 1.0 - pow(1.0 - x, 3.0); }

void main() {
  int index = int(aFirework);

  float progress = (uTime - uStartTime[index]) / uDuration * aTimeMultiplier;

  vColor = uColor[index];
  vTextureIndex = uTextureIndex[index];

  if (progress < 0.0 || progress > 1.0) {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    return;
  }

  vec3 newPosition = position * uRadius[index];

  newPosition *= easeOutCubic(remapc(progress, 0.0, 0.1, 0.0, 1.0));

  newPosition.y -= easeOutCubic(remapc(progress, 0.1, 1.0, 0.0, 1.0)) * 0.2;

  newPosition += uOrigin[index];

  // Particle position depending on the progress
  float sizeProgress = min(remap(progress, 0.0, 0.125, 0.0, 1.0),
                           remap(progress, 0.125, 1.0, 1.0, 0.0));
  sizeProgress = clamp(sizeProgress, 0.0, 1.0);

  // twinkling
  float twinklingProgress = remapc(progress, 0.2, 0.8, 0.0, 1.0);
  float sizeTwinkling =
      1.0 - (sin(progress * 30.0) * 0.5 + 0.5) * twinklingProgress;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  gl_PointSize =
      uSize[index] * uResolution.y * aSize * sizeProgress * sizeTwinkling;
  gl_PointSize *= 1.0 / -viewPosition.z;

  if (gl_PointSize < 1.0) {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
    gl_PointSize = 0.0;
  }
}
