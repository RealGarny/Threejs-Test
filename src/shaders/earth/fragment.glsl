uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmposphereNightColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {

  vec3 normal = normalize(vNormal);
  vec3 viewDirection = normalize(vPosition - cameraPosition);

  float sunOrientation = dot(uSunDirection, normal);

  float dayMix = smoothstep(-0.025, 0.5, sunOrientation);

  vec3 dayColor = texture(uDayTexture, vUv).rgb;
  vec3 nightColor = texture(uNightTexture, vUv).rgb;

  vec3 color = mix(nightColor, dayColor, dayMix);

  // clouds
  vec2 specularCloudsColor = texture(uSpecularCloudsTexture, vUv).rg;

  float cloudsMix = smoothstep(0.2, 1.0, specularCloudsColor.g);

  color = mix(color, vec3(1.0), cloudsMix * dayMix);

  // fresnel
  float fresnel = 1.0 + dot(viewDirection, normal);
  fresnel = pow(fresnel, 2.0);

  //  atmosphere
  float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
  vec3 atmosphereColor =
      mix(uAtmposphereNightColor, uAtmosphereDayColor, atmosphereDayMix);
  atmosphereColor *= fresnel;

  color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

  // specular
  vec3 reflection = reflect(-uSunDirection, normal);
  float specular = -dot(reflection, viewDirection);
  specular = max(specular, 0.0);
  specular = pow(specular, 32.0);

  specular *= specularCloudsColor.r;

  vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);

  color += specular * specularColor;

  gl_FragColor = vec4(color, 1.0);

#include <colorspace_fragment>
}