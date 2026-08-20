uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec3 normal = normalize(vNormal);

  if (!gl_FrontFacing)
    normal *= -1.0;

  // stripes
  float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0);
  stripes = pow(stripes, 3.0);

  // fresnel
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) + 1.0;
  fresnel = pow(fresnel, 2.0);

  // falloff
  float falloff = smoothstep(0.8, 0.0, fresnel);

  // hologram
  float hologram = fresnel * stripes;
  hologram += fresnel * 1.25; // amplify the fresnel effect
  hologram *= falloff;        // smoothing the edges of the final effect

  gl_FragColor = vec4(vec3(1.0), hologram);
#include <colorspace_fragment>
#include <tonemapping_fragment>
}