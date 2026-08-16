uniform sampler2D uPerlinNoise;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec2 smokeUv = vUv * vec2(0.5, 0.3);
    smokeUv.y -= uTime * 0.03;

    float smokeAlpha = texture(uPerlinNoise, smokeUv).r;
    smokeAlpha = smoothstep(0.4, 1.0, smokeAlpha);

    smokeAlpha *= clamp(min(1.0 - vUv.x, vUv.x) * 9.0, 0.0, 1.0);
    smokeAlpha *= smoothstep(1.0, 0.4, vUv.y);
    smokeAlpha *= clamp(vUv.y * 4.0, 0.0, 1.0);

    gl_FragColor = vec4(0.6, 0.3, 0.2, smokeAlpha);
}