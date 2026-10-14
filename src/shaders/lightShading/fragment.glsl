uniform vec3 uColor;

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

  // Light
  vec3 light = vec3(0.0);
  light += ambientLight(vec3(1.0), .005);
  light += directionalLight(vec3(0.1, 0.1, 1.0), // Light color
                            1.0,                 // Light intensity,
                            normal,              // Normal
                            vec3(0.0, 0.0, 3.0), // Light position
                            viewDirection,       // View direction
                            20.0                 // Specular power

  );
  light += pointLight(vec3(1.0, 0.1, 0.1), // Light color
                      1.0,                 // Light intensity,
                      normal,              // Normal
                      vec3(0.0, 2.5, 0.0), // Light position
                      vPosition,           // Fragment position
                      viewDirection,       // View direction
                      20.0,                // Specular power
                      0.3);

  light += pointLight(vec3(0.1, 1.0, 0.5), // Light color
                      1.0,                 // Light intensity,
                      normal,              // Normal
                      vec3(2.0, 2.0, 2.0), // Light position
                      vPosition,           // Fragment position
                      viewDirection,       // View direction
                      20.0,                // Specular power
                      0.3);

  color *= light;

  gl_FragColor = vec4(color, 1.0);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}