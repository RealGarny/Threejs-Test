uniform sampler2DArray uTextures;

in vec3 vColor;
in float vTextureIndex;

out vec4 FragColor;

void main() {
  vec3 texCoord = vec3(gl_PointCoord, vTextureIndex);
  float textureAlpha = texture(uTextures, texCoord).r;

  FragColor = vec4(vColor, textureAlpha);
}
