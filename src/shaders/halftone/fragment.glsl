uniform vec3 uColor;
uniform vec2 uResolution;

varying vec3 vNormal;
varying vec3 vPosition;

vec3 ambientLight(vec3 lightColor, float lightIntensity) {
  return lightColor * lightIntensity;
}

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal,
                      vec3 lightPosition, vec3 viewDirection,
                      float specularPower) {
  vec3 lightDirection = normalize(lightPosition);
  vec3 lightReflection = reflect(-lightDirection, normal);

  float shading = max(0.0, dot(normal, lightDirection));
  float specular = max(0.0, -dot(lightReflection, viewDirection));
  specular = pow(specular, specularPower);

  return lightColor * lightIntensity * (shading + specular);
}

vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal,
                vec3 lightPosition, vec3 fragmentPosition, vec3 viewDirection,
                float specularPower, float lightDecay) {
  vec3 lightDelta = lightPosition - fragmentPosition;
  float lightDistance = length(lightDelta);
  vec3 lightDirection = normalize(lightDelta);
  vec3 lightReflection = reflect(-lightDirection, normal);

  float decay = 1.0 - lightDistance * lightDecay;
  decay = max(0.0, decay);

  float shading = max(0.0, dot(normal, lightDirection));

  float specular = max(0.0, -dot(lightReflection, viewDirection));
  specular = pow(specular, specularPower);

  return lightColor * lightIntensity * decay * (shading + specular);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDirection = normalize(vPosition - cameraPosition);

  vec3 color = uColor;

  vec3 light = vec3(0.0);
  vec3 lightDirection = vec3(1.0, 1.0, 0.0);

  light += ambientLight(vec3(1.0), 0.2);
  light += directionalLight(vec3(1.0), 1.0, normal, lightDirection,
                            viewDirection, 1.0);
  light = min(light, 1.0);

  color *= light;

  // halftone

  float repetition = 100.0;

  vec2 uv = gl_FragCoord.xy / uResolution.y;
  uv *= repetition;
  uv = mod(uv, 1.0);

  float point = distance(uv, vec2(0.5));
  point = 1.0 - step(1.0 - light.x / 0.4, point);

  color = mix(color, color - 0.1, point);

  // halftone

  float point2 = distance(uv, vec2(0.5));
  point2 = 1.0 - step(light.x - 0.2 / 0.4, point2);

  color = mix(color, color + 0.1, point2);

  gl_FragColor = vec4(vec3(color), 1.0);

#include <colorspace_fragment>
}